const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Loved this book, couldn't put it down!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "This review was very insightful.",
    user_id: 2,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;