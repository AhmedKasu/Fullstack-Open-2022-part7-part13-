import useField from '../hooks/index';

import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';

import { Form, Button } from 'react-bootstrap';

const BlogsForm = ({ blogsFormRef, loggedUser }) => {
  const title = useField('text', 'Enter Title');
  const author = useField('text', 'Enter Author');
  const url = useField('url', 'Enter Url');

  const dispatch = useDispatch();

  const createBlog = (event) => {
    event.preventDefault();
    blogsFormRef.current.toggleVisibility();

    const newBlog = {
      title: title.setters.value,
      author: author.setters.value,
      url: url.setters.value,
    };
    dispatch(addBlog({ blog: newBlog, user: loggedUser }));
  };

  const resetForm = () => {
    return (
      title.resetter.reset(), author.resetter.reset(), url.resetter.reset()
    );
  };

  const handleCancel = () => {
    blogsFormRef.current.toggleVisibility();
    resetForm();
  };

  const buttonView =
    title.setters.value !== '' &&
    author.setters.value !== '' &&
    url.setters.value !== ''
      ? null
      : true;

  return (
    <div>
      <div className='BlogsForm'>
        <h2 className='BlogsFormHeader'>Create new</h2>

        <Form onSubmit={createBlog}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Title</Form.Label>
            <Form.Control {...title.setters} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Author</Form.Label>
            <Form.Control {...author.setters} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Url</Form.Label>
            <Form.Control {...url.setters} />
          </Form.Group>
          <div>
            <span>
              <Button
                variant='primary'
                type='submit'
                disabled={buttonView}
                style={{ margin: '1rem' }}>
                Create
              </Button>
            </span>
            <span>
              <Button
                style={{ margin: '1rem' }}
                variant='secondary'
                onClick={handleCancel}>
                Cancel
              </Button>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BlogsForm;
