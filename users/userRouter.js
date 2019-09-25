const express = require('express');
const router = express.Router();

const Users =require('../users/userDb');


//POST user
router.post('/', validateUser, (req, res) => {
    const newUser = req.body;
    Users.add(newUser)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({
            err:err,
            message: 'Error adding new user.'
        })
    })
});


//GET users
router.get('/', (req, res) => {
    Users.find('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'Error retrieving all users.'
            });
        });
});

//GET user by Id
router.get('/:id/user', validateUserId, (req, res) => {
    const full_name  = req.params;
    Users.findByUsername(full_name)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({
            err:err,
            message: 'Error retrieving user.'
        });
    });
});

//Put user
router.put('/users/:id', validateUser, validateUserId, (req, res) => {
    const full_name = req.params;
    const changes = req.body;
        Users.update(full_name, changes)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({
            err:err,
            message: 'Error updating user.'
            });
      });
});

//DELETE user
router.delete('/users:id', validateUserId, (req, res) => {
    const user = req.params.id;
        Users.remove(user)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
        res.status(500).json({
            err:err,
            message: 'Error deleting user.'
        });
    });
});

//custom middleware
function validateUserId(req, res, next) {
    const full_name  = req.params;
    console.log('full_name', full_name)
    Users.findByUsername(full_name)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: 'No user with given id!' 
        });
    }
})
    .catch(err => {
      res.status(500).json({
        err:err,
        message: 'Error while processing the request.'
        });
    });
};

function validateUser(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
    next();
      } else {
        next({ message: 'BAD REQUEST!.' });
      }
};



module.exports = router;