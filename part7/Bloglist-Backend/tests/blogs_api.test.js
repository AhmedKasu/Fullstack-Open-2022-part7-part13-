const mongoose = require('mongoose');

const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const Blog = require('../models/blog');

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  let userObject = new User(helper.initialUsers[0]);
  await userObject.save();
  userObject = new User(helper.initialUsers[1]);
  await userObject.save();

  let blogObject = new Blog(helper.initialBlogs[0]);
  blogObject.user = await (await helper.tokenGenerator()).id;
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  blogObject.user = await (await helper.tokenGenerator()).id;
  await blogObject.save();
});

describe('when there are blogs initialy saved', () => {
  test('blogs are returned as jason and are of the correct amount', async () => {
    const token = await (await helper.tokenGenerator()).token;
    const response = await api
      .get('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('the unique identifier property of the blog posts are named id instead of _id', async () => {
    const allBlogs = await helper.blogsInDb();
    allBlogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('addition of a new blog post', () => {
  test('a post with valid data & token can be added', async () => {
    const token = await (await helper.tokenGenerator()).token;
    const newBlogPost = {
      title: 'History of the internet',
      author: 'Beve Blasha',
      url: 'www.theInternet.com',
      likes: 33,
    };

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);

    const titles = allBlogs.map((b) => b.title);
    expect(titles).toContain('History of the internet');
  });

  test('if the likes property is missing, the default value is set to zero', async () => {
    const token = await (await helper.tokenGenerator()).token;
    const newBlogPost = {
      title: 'Fundamentals of Programming',
      author: 'Beve Blasha',
      url: 'www.programming.com',
    };

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const allBlogs = await helper.blogsInDb();
    const newBlog = allBlogs.find(
      (blog) => blog.title === 'Fundamentals of Programming'
    );
    expect(newBlog.likes).toBe(0);
  });

  test('if the title and url properties are missing, a blog can not be saved and the response should be a 400 status code', async () => {
    const token = await (await helper.tokenGenerator()).token;
    const newBlogPost = {
      author: 'none existent!',
    };
    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlogPost)
      .expect(400);
    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length);
  });

  test('if no token is provided, a blog can not be saved and the response should be a 401 unauthorized', async () => {
    const newBlogPost = {
      title: 'bog with invalid token',
      author: 'crazy bloger',
      url: 'www.thebloger.com',
      likes: 1,
    };
    await api.post('/api/blogs').send(newBlogPost).expect(401);
    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length);
  });
});

describe('delition of saved blogs', () => {
  test('a single blog post can be deleted if the id & token is valid', async () => {
    const allBlogsBefore = await helper.blogsInDb();
    const blogToDelete = allBlogsBefore[0];
    const token = await (await helper.tokenGenerator()).token;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204);
    const allBlogsAfter = await helper.blogsInDb();
    expect(allBlogsAfter).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe('updating saved blogs', () => {
  test('a single blog can be updated if a valid id & token is provided', async () => {
    const allBlogsBefore = await helper.blogsInDb();
    const blogToUpdate = allBlogsBefore.find(
      (blog) => blog.title === 'api is the future'
    );
    const newBlog = {
      title: 'api is the future',
      author: 'Beve Blasha',
      url: 'www.api_for_all.com',
      likes: 150,
    };
    const token = await (await helper.tokenGenerator()).token;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200);
    const allBlogsAfter = await helper.blogsInDb();
    const updatedBlog = allBlogsAfter.find(
      (blog) => blog.title === 'api is the future'
    );
    expect(updatedBlog.likes).toBe(150);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
