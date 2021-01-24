const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/posts");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Mongoose connection
mongoose
  .connect(
    "mongodb+srv://wilfredadmin:320Favor515@meancourse.hdvvn.mongodb.net/node-angular?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// maka save na kay dapat i set ang post service ang http to http://localhost:3000/api/posts
// dili maka store/save ang angular UI padulong sa mongodb pero ma able sya ma view sa backend routes
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({
    message: "Post Added successfully",
  });
  next();
});

app.use("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    // console.log(documents)
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });

  // const posts= [
  //   {
  //     id: 'fad124211',
  //     title:'First server-side posts',
  //     content:'comming from the server'
  //   },
  //   {
  //     id: 'fad124221',
  //     title:'Second server-side posts',
  //     content:'comming from the server'
  //   },
  //   {
  //     id: 'fad124221',
  //     title:'Third server-side posts',
  //     content:'Third comming from the server'
  //   }
  // ];
  // res.status(201).json({
  //   message: 'Posts fetch successfully!!',
  //   posts: posts
  // });
});
app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  res.status(200).json({ message: "Post Deleted!" });
});

// app.post("/api/addposts", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   post.save();
//   res.status(201).json({
//     message: "Post Added successfully",
//   });
// });

// app.post("/api/posts", (req, res, next)=>{
//   // const posts = req.body;
//   const posts = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   console.log(posts);
//   post.save();
//   res.status(201).json({
//     message: 'Post Added Successfully!!!'
//   });
// });

// app.use((req, res, next) =>{
//   console.log("First middleware")
//   next();
// });

// app.use((req, res, next)=>{
//   res.send("hello from express");
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
