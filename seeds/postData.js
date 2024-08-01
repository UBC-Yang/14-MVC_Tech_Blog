const { Post } = require("../models");

const postData = [
  {
    title: "The Road",
    content: "A post-apocalyptic novel that follows a father and his young son as they traverse a desolate landscape, struggling to survive. The novel explores themes of survival, love, and the will to live.",
    user_id: 1,
  },
  {
    title: "Life of Pi",
    content: "A young boy named Pi survives a shipwreck and is left stranded on a lifeboat with a Bengal tiger named Richard Parker. The novel is a story of survival, faith, and the relationship between humans and animals.",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;