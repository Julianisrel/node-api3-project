const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser(), (req, res, next) => {
  users.insert(req.body)
  .then(user => {
    return res.status(201).json(user)
  })
  .catch(error => {
    next(error)
  })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  posts.insert(req.body)
  .then(post => {
    return res.status(201).json(post)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/', (req, res, next) => {
  users.get()
  .then(user => {
    return res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    next(error)
  })
});

router.get('/:id', validateUserId(), (req, res) => {
  return res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  users.getUserPosts(req.params.id)
  .then(post => {
    return res.status(200).json(post)
  })
  .catch(error => {
    next(error)
  })
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  users.remove(req.params.id)
  .then(post => {
    if(post > 0) {
      return res.status(200).json({
        message: "The user was deleted."
      })
    } else {
      return res.status(404).json({
        message: "There was an error deleting the user"
      })
    }
  })
  .catch(error => {
    next(error)
  })
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  users.update(req.params.id, req.body)
  .then(user => {
    if(user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({
        message: "The user could not be found."
      })
    }
  })
});

//custom middleware

function validateUserId(req, res, next) {
  return (req, res, next) => {
    users.getById(req.params.id)
    .then(user => {
        if(user) {
            req.user = user
            next()
        } else {
            return res.status(404).json({
                errorMessage: "Some helpful error message"
            })
        }
    })
    .catch(error => {
        console.log(error)
        return res.status(400).json({
            message: 'invalid user id'
        })
    })
}
}


function validateUser() {
  return (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
     return res.status(400).json({
        message: "missing user data"
      })
    } else if (!req.body.name) {
     return res.status(400).json({
        message: "missing user name field"
      })
    } else {
      next()
    }
  }
}

function validatePost(req, res, next) {
  return (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
     return res.status(400).json({
        message: "missing post data"
      })
    } else if (!req.body.text) {
     return res.status(400).json({
        message: "missing text field"
      })
    } else if(!req.body.user_id){
      return res.status(400).json({
        message: "missing user id"
      })
    } else {
      next()
    }
  }
}

module.exports = router;
