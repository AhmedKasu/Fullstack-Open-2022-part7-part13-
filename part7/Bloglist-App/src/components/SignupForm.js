import useField from '../hooks';
import { useDispatch } from 'react-redux';
import { handleNotification } from '../reducers/notificationReducer';
import usersService from '../services/users';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const username = useField('text', 'Enter Username');
  const name = useField('text', 'Enter Name');
  const password = useField('password', 'Enter Password');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    const userObj = {
      username: username.setters.value,
      name: name.setters.value,
      password: password.setters.value,
    };

    try {
      await usersService.createUser(userObj);
      navigate('/login');
    } catch (error) {
      dispatch(
        handleNotification({
          type: 'error',
          message: error.response.data.error,
        })
      );
      return;
    }
    dispatch(
      handleNotification({
        type: 'success',
        message: `User ${userObj.username} successful created`,
      })
    );
  };

  const buttonStyles =
    username.setters.value !== '' &&
    name.setters.value !== '' &&
    password.setters.value !== ''
      ? null
      : true;

  return (
    <div className='Signup'>
      <div className='FormHeaderDiv'>
        <h2>Signup</h2>
      </div>
      <div className='SignupForm'>
        <Form onSubmit={handleSignup}>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control {...name.setters} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>User name</Form.Label>
            <Form.Control {...username.setters} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control {...password.setters} />
          </Form.Group>

          <p className='FormHeader-SignupLink'>
            allready have an account? <Link to='/login'>login</Link>
          </p>

          <Button variant='primary' type='submit' disabled={buttonStyles}>
            Signup
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
