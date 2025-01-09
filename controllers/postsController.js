const posts = require("../data/posts");
const { post } = require("../routers/postsRouter");

// - index
function index(req, res) {
  res.json({ text: "Lista dei post", posts });
}

// - show
function show(req, res) {
  const post = posts[req.params.id];
  if (!post) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  res.json({
    post,
  });
}

// - store
function store(req, res) {
  console.log(req.body);
  const newId = posts.at(-1).id + 1;

  if (!newId) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Id non valido",
    });
  }

  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    img: req.body.img,
    tags: req.body.tags,
  };

  console.log(newPost);
  posts.push(newPost);
  res.json("Creazione nuovo post");
}

// - update
function update(req, res) {
  res.send("Modifica integrale del post " + req.params.id);
  const post = posts.find((e) => e.id == req.params.id);

  if (!post) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  post.name = req.body.name;
  post.title = req.body.title;
  post.content = req.body.content;
  post.tags = req.body.tags;
}

// - destroy
const destroy = (req, res) => {
  const postToDelete = posts.find((e) => e.id == req.params.id);
  if (!postToDelete) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }
  const postToDeleteIndex = posts.indexOf(postToDelete);
  posts.splice(postToDeleteIndex, 1);

  console.log(posts);
  res.json(posts);
};

module.exports = { index, show, store, update, destroy };
