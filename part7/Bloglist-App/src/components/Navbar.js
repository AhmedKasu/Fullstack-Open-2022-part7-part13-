import { NavLink, useMatch } from 'react-router-dom';

import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = ({ loggedUser, handleLogOut }) => {
  const loginMatch = useMatch('/login');
  const loginPage = loginMatch ? loginMatch.pathname : null;

  const signupMatch = useMatch('/signup');
  const signupPage = signupMatch ? signupMatch.pathname : null;

  if (!loginPage && !signupPage)
    return (
      <Navbar className='Navbar' variant='dark' expand='lg' sticky='top'>
        <Container>
          <Navbar.Brand href='#home'>Blog-App</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <NavLink className='nav-link' aria-current='page' to='/'>
                Home
              </NavLink>
              <NavLink className='nav-link ' aria-current='page' to='/blogs'>
                Blogs
              </NavLink>
              <NavLink className='nav-link ' aria-current='page' to='/users'>
                Users
              </NavLink>
            </Nav>
            {loggedUser.length > 0 ? (
              <em
                className='navbar-text'
                style={{ paddingRight: 10, fontStyle: 'italic' }}>
                {loggedUser[0].name} logged in
              </em>
            ) : null}
            <Button id='logout' variant='outline-danger' onClick={handleLogOut}>
              logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NavigationBar;
