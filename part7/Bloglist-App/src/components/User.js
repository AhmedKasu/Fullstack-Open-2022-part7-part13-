import { Card, ListGroup } from 'react-bootstrap';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div className='User'>
      <Card border='light' className='Card'>
        <Card.Header as='h4'>{user.name} </Card.Header>
        <Card.Body>
          <div style={{ paddingTop: 25 }}>
            <div>
              <Card.Subtitle as='h6'>Blogs added</Card.Subtitle>
            </div>
            <div style={{ paddingTop: 5 }}>
              <ListGroup as='ol' variant='flush' numbered>
                {user.blogs.length < 1 ? (
                  <ListGroup.Item className='ListGroupItem'>
                    {' '}
                    No blogs added!
                  </ListGroup.Item>
                ) : (
                  user.blogs.map((b) => (
                    <ListGroup.Item
                      key={user.blogs.indexOf(b) + 1}
                      as='li'
                      className='ListGroupItem'>
                      {b.title}
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default User;
