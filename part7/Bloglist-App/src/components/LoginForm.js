import { useState } from 'react';

import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import { setLoggedUser } from '../reducers/usersReducer';
import { handleNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(credentials);
      dispatch(setLoggedUser(user));

      setCredentials({ username: '', password: '' });
    } catch (error) {
      dispatch(
        handleNotification({
          type: 'error',
          message: error.response.data.error,
        })
      );
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        {' '}
        username
        <input
          type='text'
          value={credentials.username}
          name='Username'
          id='username'
          onChange={({ target }) =>
            setCredentials({ ...credentials, username: target.value })
          }
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={credentials.password}
          name='Password'
          id='password'
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
      </div>
      <button id='submit' type='submit'>
        login
      </button>
    </form>
  );
};

export default LoginForm;
