import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useField from '../hooks/index';
import { handleNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogsReducer';

import { useDispatch } from 'react-redux';

import {
  Card,
  Button,
  InputGroup,
  Form,
  ListGroup,
  Modal,
} from 'react-bootstrap';

const Blog = ({ blog, loggedUser }) => {
  const newComment = useField('text');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLikes = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likeBlog(likedBlog));
    dispatch(
      handleNotification({
        type: 'success',
        message: `you liked ${blog.title}`,
      })
    );
  };

  const handleComments = (event) => {
    event.preventDefault();
    dispatch(commentBlog({ newComment: newComment.setters.value, blog }));
    dispatch(
      handleNotification({
        type: 'success',
        message: `You commented on ${blog.title} !`,
      })
    );
    newComment.resetter.reset();
  };

  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog.id));
    navigate('/blogs');
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const buttonStyles = newComment.setters.value.length > 3 ? null : true;

  if (!blog) {
    return null;
  }
  return (
    <div className='Blog'>
      <Card border='light' className='Card'>
        <Card.Header as='h5'>
          {blog.title} {blog.author}
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            <a
              className='BlogLinks'
              style={{ textDecoration: 'underline' }}
              href={blog.url}>
              {blog.url}
            </a>
          </Card.Text>
          <Card.Text> Added by {blog.user.name}</Card.Text>
          {blog.likes} likes {'  '}
          <Button variant='outline-success' onClick={handleLikes}>
            Like
          </Button>
          {'  '}
          <>
            {' '}
            {loggedUser[0].name === blog.user.name ? (
              <Button variant='outline-secondary' onClick={handleShow}>
                Delete
              </Button>
            ) : null}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop='static'
              keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to procceed?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {`${blog.title} will be permanently`}
                <em style={{ color: 'red ' }}> deleted!</em>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant='danger' onClick={() => handleDelete(blog)}>
                  Proceed
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          <div className='BlogComments'>
            <Card.Subtitle as='h5'>Comments</Card.Subtitle>
          </div>
          <div style={{ paddingTop: 10 }}>
            <InputGroup className='mb-3'>
              <Form.Control
                {...newComment.setters}
                aria-label='user comment'
                aria-describedby='basic-addon2'
                className='InputGroup'
              />
              <Button
                variant='outline-secondary'
                id='button-addon2'
                onClick={handleComments}
                disabled={buttonStyles}>
                comment
              </Button>
            </InputGroup>
          </div>
          <div>
            <ListGroup variant='flush'>
              {blog.comments.map((c) => (
                <ListGroup.Item key={c.id} className='ListGroupItem'>
                  {c.comment}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Blog;
