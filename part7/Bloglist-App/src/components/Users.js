import { ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  return (
    <div className='Users'>
      <h2 className='UsersHeader'>Users</h2>
      <div className='UsersListGroup'>
        <ListGroup as='ol' variant='flush'>
          {users.map((user) => (
            <ListGroup.Item
              as='li'
              className='d-flex justify-content-between align-items-start ListGroupItem'
              key={user.id}>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>
                  <Link
                    style={{
                      color: '#0091ae',
                      fontFamily: 'inherit',
                      textDecoration: 'auto',
                    }}
                    to={`/users/${user.id}`}>
                    {' '}
                    {user.name}
                  </Link>
                </div>
              </div>
              <div style={{ paddingRight: 20 }} className='fw'>
                blogs created
              </div>
              <Badge bg='info' pill>
                {user.blogs.length}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default Users;
