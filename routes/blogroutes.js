const express = require("express");
const Blog = require("../models/blog");
const blogController = require("../controllers/blogController");
const { blog_details } = require("../controllers/blogController");

const router = express.Router();

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

// GET ALL THE BLOGS FROM DATABASE AND DISPLAY

router.get("/", blogController.blog_index);

module.exports = router;
