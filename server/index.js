const express = require("express");
require('dotenv').config();
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
var cors = require('cors');
app.use(cors());
const saltRounds = 10;
mongoose.connect(process.env.DATABASE_URL);

console.log(process.env.SECRET_KEY);
const blogSchema = new mongoose.Schema(
  {

    email: String,
    author:
    {
      type: String,
      required: true,
    },
    title:
    {
      type: String,
      required: true
    },
    body:
    {
      type: String,
      required: true
    },
    date:
    {
      type: Date,
      required: true
    },
    upvotes: Number,
    downvotes: Number,
    saves: Number,
    is_edited: Boolean,
    comments: [String],
    tags: [String]
  }
);
const Blog = mongoose.model("Blog", blogSchema);
////////////////////
const userSchema = new mongoose.Schema(
  {
    username:
    {
      type: String, required: true
    },
    email:
    {
      type: String,
      required: true
    },
    password: String,
    blogs: [String],
    saves: [String],
    upvotes: [String],
    downvotes: [String]
  }
)

const User = new mongoose.model("User", userSchema);


app.post("/register", (req, res) => {

  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {

    const user = new User(
      {
        email: req.body.email,
        password: hash,
        username: req.body.username
      });
    await user.save((err) => {
      if (err) console.log(err);
      else console.log("eluser etsagel meya meya");
    });
    const currentUser = {
      email: req.body.email,
    }
    const token = jwt.sign(currentUser, SECRET_KEY);
    res.json({
      token: token
      , currentUser: currentUser
    });
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }, (err, user) => {
    if (err)
      res.send("failure");
    else {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const currentUser = {
              email: email,
              password: password
            }
            // const token = jwt.sign(currentUser, SECRET_KEY, { expiresIn: "1h" });
            const token = jwt.sign(currentUser, SECRET_KEY, { expiresIn: "1h" });

            res.json({
              token: token
              , currentUser: currentUser
            });
            // res.send("success");
          }
          else res.send("failure");
        });
      }
      else {
        res.send("failure");
      }
    }
  })
});



////////////////////////
function authenticate(req, res, next) {

  const token = req.headers.authorization.split(" ")[1];
  if (!token) console.log("error 1 in authenticate middle ware");
  else {
    try {
      console.log("naga7t a7amo f auth");
      const user = jwt.verify(token, SECRET_KEY);
      req.user = user;
      next();
    } catch (error) {
      console.log("error 2 in authenticate moddileware");
    }
  }
}

app.post("/test", (req, res) => {
  console.log(req.body); console.log("MOOOOOOOOOOOOOO");

});

app.get("/all-blogs", authenticate, (req, res) => {

  console.log(req.headers);
  Blog.find({}, (err, blog) => {
    if (err) console.log(err);
    else {
      res.send(blog);
    }
  });


});

app.post("/find-user", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {

    if (err) console.log(err);
    else {
      res.send(user);
    }
  });

});

app.get("/find-user", authenticate, (req, res) => {
  User.findOne({ email: req.user.email }, (err, user) => {

    if (err) console.log(err);
    else {
      res.send(user);
    }
  });

});

app.post("/add-blog", authenticate, (req, res) => {

  var myblog = new Blog({

    author: req.body.author,
    title: req.body.title,
    body: req.body.body,
    email: req.body.email,
    date: new Date(),
    upvotes: 0,
    downvotes: 0,
    saves: 0,
    is_edited: false,
    tags: req.body.tags
  });
  myblog.save();

  console.log("added successfully");
  res.send("success");
});



app.post("/save", authenticate, async (req, res) => {
  User.findOneAndUpdate({ email: req.user.email, saves: req.body._id }, { $pull: { saves: req.body._id } }, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      if (!user) {
        User.findOneAndUpdate({ email: req.user.email }, { $push: { saves: req.body._id } }, (err, user) => {
          if (err) console.log(err);
          else {
            Blog.findOneAndUpdate({ _id: req.body._id }, { $inc: { saves: 1 } }, (err, blog) => {
              blog.saves += 1;
              res.send(blog);
            });
          }
        });
      }
      else {
        Blog.findOneAndUpdate({ _id: req.body._id }, { $inc: { saves: -1 } }, (err, blog) => {
          blog.saves -= 1;
          res.send(blog);
        });
      }
    }
  });
});

app.post("/upvote", authenticate, async (req, res) => {
  User.findOneAndUpdate({ email: req.user.email, upvotes: req.body._id }, { $pull: { upvotes: req.body._id } }, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      if (!user) {
        User.findOneAndUpdate({ email: req.user.email }, { $push: { upvotes: req.body._id } }, (err, user) => {
          if (err) console.log(err);
          else {
            Blog.findOneAndUpdate({ _id: req.body._id }, { $inc: { upvotes: 1 } }, (err, blog) => {
              blog.upvotes += 1;
              res.send(blog);
            });
          }
        });
      }
      else {
        Blog.findOneAndUpdate({ _id: req.body._id }, { $inc: { upvotes: -1 } }, (err, blog) => {
          blog.upvotes -= 1;
          res.send(blog);
        });
      }
    }
  });
});
app.post("/downvote", authenticate, async (req, res) => {
  User.findOneAndUpdate({ email: req.user.email, downvotes: req.body._id }, { $pull: { downvotes: req.body._id } }, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      if (!user) {
        User.findOneAndUpdate({ email: req.user.email }, { $push: { downvotes: req.body._id } }, (err, user) => {
          if (err) console.log(err);
          else {
            Blog.findOneAndUpdate({ _id: req.body._id }, { $inc: { downvotes: 1 } }, (err, blog) => {
              blog.downvotes += 1;
              res.send(blog);
            });
          }
        });
      }
      else {
        Blog.findOneAndUpdate({ _id: req.body._id }, { $inc: { downvotes: -1 } }, (err, blog) => {
          blog.downvotes -= 1;
          res.send(blog);
        });
      }
    }
  });
});


app.get("/saved-blogs", authenticate, (req, res) => {

  User.findOne({ email: req.user.email }, (err, user) => {

    if (err) console.log(err);
    else {

      Blog.find({}, (err, blog) => {
        if (err) console.log(err);
        else {
          //res.send(user);
          //res.send(blog);
          var myblogs = [];
          user.saves.map((save) => {
            blog.map((myblog) => {
              if (myblog._id == save) {
                myblogs.push(myblog);
              }
            });
          });
          res.send(myblogs);
        }
      });
    }
  });
});

app.post("/friend-blogs", authenticate, (req, res) => {
  var friend = req.body.username;
  console.log(friend);
  Blog.find({ author: friend }, (err, blogs) => {
    if (blogs) {
      res.send(blogs);
    }
  });
});

app.post("/full-blog", authenticate, (req, res) => {
  var id = req.body.id;
  // console.log(id);
  Blog.find({ _id: id }, (err, blogs) => {
    if (blogs) {
      res.send(blogs);
    }
  });
})


app.post("/filtered-blogs", (req, res) => {

  const tags = req.body.tags;
  //console.log(tags);
  const myblogs = [];
  Blog.find({}, (err, blogs) => {
    if (err) console.log(err);
    else {
      blogs.map((blog) => {

        var flag = false;
        console.log(blog.tags.length);
        for (var i = 0; i < blog.tags.length; i++) {
          for (var j = 0; j < tags.length; j++) {
            console.log(tags[j]);
            if (blog.tags[i] == tags[j]) {
              myblogs.push(blog);
              flag = true;
              console.log("!");
              break;
            }
          }
          if (flag) break;
        }
      });
      res.send(myblogs);
    }



    //res.send()

  })


});

app.listen(process.env.PORT, () => {
  console.log("server started at port 5000");
});



