import { useRef } from 'react';
import { Link } from 'react-router-dom';

import BlogsForm from './BlogsForm';
import Togglable from './Togglable';

import { Table } from 'react-bootstrap';

const Blogs = ({ loggedUser, blogs }) => {
  const blogsFormRef = useRef();
  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes;
  });

  return (
    <div className='Blogs'>
      <h1 className='BlogsFormHeader'>Blogs</h1>
      <Togglable buttonLabel='Create new' ref={blogsFormRef}>
        <BlogsForm blogsFormRef={blogsFormRef} loggedUser={loggedUser[0]} />
      </Togglable>
      <div style={{ paddingTop: 10, paddingBottom: 150 }}>
        <Table striped>
          <tbody>
            {sortedBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link className='BlogLinks' to={`/blogs/${blog.id}`}>
                    {' '}
                    {blog.title}
                  </Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Blogs;
