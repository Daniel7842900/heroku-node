const express = require('express');
let mod = require('../users');
const router = express.Router();

router.get('/users/retrieve', (req, res) => {
   let result = mod.retrieve().then((data) => {
      res.send(data);
   });
   
});


router.post('/users/add', (req, res) => {
   let addUser = {
      id: req.body.id,
      name: req.body.name,
      about: req.body.about,
      imgURL: req.body.imgURL
   }
   mod.add(addUser);
   res.redirect(301, '/users/retrieve');
})

router.post('/users/delete', (req, res) => {
   console.log(`============== Delete User ${req.body.id} =====================`);

   let deleteUser = mod.delete(req.body.id);
   if (deleteUser) {
      res.redirect(301, '/users/retrieve');
      res.send(true);
   } else {
      res.send(false);
   }
   
})

module.exports = router;
