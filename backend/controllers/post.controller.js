import Post from "../models/post.model.js";
import User from "../models/user.model.js";

/*export const getPosts = async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  };
*/
  export const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
  
    const query = {};
  
    console.log(req.query);
  
    const category = req.query.category;
    const author = req.query.author;
    const searchQuery = req.query.search;
    const sortQuery = req.query.sort;
    const featured = req.query.featured;
  
    if (category) {
      query.category = category;
    }
  
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }
  
    if (author) {
      const user = await User.findOne({ username: author }).select("_id");
  
      if (!user) {
        return res.status(404).json("No post found!");
      }
  
      query.user = user._id;
    }
  
    let sortObj = { createdAt: -1 };
  
    if (sortQuery) {
      switch (sortQuery) {
        case "newest":
          sortObj = { createdAt: -1 };
          break;
        case "oldest":
          sortObj = { createdAt: 1 };
          break;
        default:
          break;
      }
    }
  
    if (featured) {
      query.isFeatured = true;
    }
  
    const posts = await Post.find(query)
      .populate("user", "username")
      .sort(sortObj)
      .limit(limit)
      .skip((page - 1) * limit);
  
    const totalPosts = await Post.countDocuments();
    const hasMore = page * limit < totalPosts;
  
    res.status(200).json({ posts, hasMore });
  };
  

 export const getPost = async (req, res) => {
    const post = await Post.findOne({slug:req.params.slug})
    res.status(200).json(post);
  };

  export const createPost = async (req, res) => {
    const newPost = new Post(req.body)
    const post = await newPost.save()
    res.status(200).json(post);
  };

  export const deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id)
    res.status(200).json("Post has been deleted");
  };

  export const updatePost = async (req, res) => {
    try {
      const existingPost = await Post.findById(req.params.id);
      if (!existingPost) {
        return res.status(404).json({ error: "Post não encontrado" });
      }
  
      // Se o slug não mudou, remove-o do req.body para evitar problemas
      if (req.body.slug === existingPost.slug) {
        delete req.body.slug;
      }
  
      // Atualiza o post sem modificar slug (caso não tenha sido alterado)
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
