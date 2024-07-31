// Import the required modules
const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

// Set up the routes
router.use("/users", userRoutes);
router.use("/posts", postRoutes); 
router.use("/comments", commentRoutes); 

// Export the router
module.exports = router;