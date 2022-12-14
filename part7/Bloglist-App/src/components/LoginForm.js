import { useNavigate, Link } from 'react-router-dom';
import useField from '../hooks/index';

import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import { setLoggedUser } from '../reducers/usersReducer';
import { handleNotification } from '../reducers/notificationReducer';

import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  const username = useField('text', 'Enter Username');
  const password = useField('password', 'Enter Password');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {
      username: username.setters.value,
      password: password.setters.value,
    };
    try {
      const user = await loginService.login(credentials);
      dispatch(setLoggedUser(user));
      navigate('/');
    } catch (error) {
      dispatch(
        handleNotification({
          type: 'error',
          message: error.response.data.error,
        })
      );
    }
  };

  const buttonStyles =
    username.setters.value !== '' && password.setters.value !== ''
      ? null
      : true;

  return (
    <div className='LoginForm'>
      <div className='FormHeaderDiv'>
        <h2>Login</h2>
      </div>
      <div className='FormContent'>
        <Form onSubmit={handleLogin}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>User name</Form.Label>
            <Form.Control {...username.setters} />

            <Form.Text className='text-muted'>
              We ll never share your details with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control {...password.setters} />
          </Form.Group>
          <p className='FormHeader-SignupLink'>
            have an account? <Link to='/signup'>sign up</Link>
          </p>
          <div>
            <Button variant='primary' type='submit' disabled={buttonStyles}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
