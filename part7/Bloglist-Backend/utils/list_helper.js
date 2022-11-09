const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPostList) => {
  let total = 0;
  blogPostList.forEach((blog) => {
    return (total += blog.likes);
  });
  return total;
};

const favouriteBlog = (blogPostList) => {
  const maxLikesBlog = blogPostList.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });

  return {
    title: maxLikesBlog.title,
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes,
  };
};

const mostBlogs = (blogPostList) => {
  const authorsWithMostBlogs = _.maxBy(
    _.map(_.countBy(blogPostList, 'author'), (val, key) => ({
      author: key,
      blogs: val,
    })),
    'author'
  );
  return authorsWithMostBlogs;
};

const mostLikes = (blogPostList) => {
  const maxLikes = _(blogPostList)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .maxBy('likes');

  console.log('console log', maxLikes);
  return maxLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
