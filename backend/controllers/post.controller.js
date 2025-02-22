import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts);
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
