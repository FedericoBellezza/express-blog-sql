// const posts = require("../data/posts");
// const { post } = require("../routers/postsRouter");

// Importiamo il file di connessione al database
const connection = require("../db/conn");

// - index
function index(req, res) {
  // prepariamo la query
  const sql = "SELECT * FROM blog.posts";
  // eseguiamo la query!
  connection.query(sql, (err, results) => {
    console.log(err);
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

// - show
function show(req, res) {
  // const post = posts[req.params.id];
  // if (!post) {
  //   res.status(404);
  //   return res.json({
  //     error: "Not Found",
  //     message: "Post non trovato",
  //   });
  // }
  // res.json({
  //   post,
  // });

  // prepariamo la query
  const postSql = "SELECT * FROM `blog`.`posts` WHERE `posts`.`id` = ?";
  const tagsSql =
    "SELECT label FROM blog.tags JOIN post_tag ON tags.id = post_tag.tag_id JOIN posts ON post_id = posts.id WHERE post_id = ?";
  const id = req.params.id;

  let post = [];

  // eseguiamo la query!
  connection.query(postSql, [id], (err, results) => {
    console.log(err);
    if (err) return res.status(500).json({ error: "Database query failed" });
    post.push(results);
  });

  connection.query(tagsSql, [id], (err, results) => {
    console.log(err);
    if (err) return res.status(500).json({ error: "Database query failed" });
    post.push(results);
    res.json(post);
  });
}

// - store
function store(req, res) {
  // console.log(req.body);
  // const newId = posts.at(-1).id + 1;
  // if (!newId) {
  //   res.status(404);
  //   return res.json({
  //     error: "Not Found",
  //     message: "Id non valido",
  //   });
  // }
  // const newPost = {
  //   id: newId,
  //   title: req.body.title,
  //   content: req.body.content,
  //   img: req.body.img,
  //   tags: req.body.tags,
  // };
  // console.log(newPost);
  // posts.push(newPost);
  // res.json("Creazione nuovo post");
}

// - update
function update(req, res) {
  // res.send("Modifica integrale del post " + req.params.id);
  // const post = posts.find((e) => e.id == req.params.id);
  // if (!post) {
  //   res.status(404);
  //   return res.json({
  //     error: "Not Found",
  //     message: "Post non trovato",
  //   });
  // }
  // post.name = req.body.name;
  // post.title = req.body.title;
  // post.content = req.body.content;
  // post.tags = req.body.tags;
}

// - destroy
const destroy = (req, res) => {
  // const postToDelete = posts.find((e) => e.id == req.params.id);
  // if (!postToDelete) {
  //   res.status(404);
  //   return res.json({
  //     error: "Not Found",
  //     message: "Post non trovato",
  //   });
  // }
  // const postToDeleteIndex = posts.indexOf(postToDelete);
  // posts.splice(postToDeleteIndex, 1);
  // console.log(posts);
  // res.json(posts);

  // prepariamo la query
  const sql = "DELETE FROM `blog`.`posts` WHERE `posts`.`id` = ?";
  const id = req.params.id;
  // eseguiamo la query!
  connection.query(sql, [id], (err, results) => {
    console.log(err);
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
};

module.exports = { index, show, store, update, destroy };
