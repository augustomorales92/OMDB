const express = require("express");
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const Movie = require('../models/Movies');




router.post(`/register`, (req, res) => {
  
  
  User.create(req.body)
    .then(data => res.send(data)); 
});

router.post(`/login`, passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

router.get(`/user`, (req, res) => {
  if (req.user) res.send(`messi.jpg`);
  else res.sendStatus(401);
});

router.post(`/logout`, (req, res) => {
  req.logOut();
  res.send(req.user);
});

router.get(`/me`, (req, res) => {
  if(req.user) res.send(req.user);
  else res.sendStatus(401);
});


router.post(`/favorites/:id`, (req, res) => {
  req.params.id
  Movie.findOne({where:{title:req.body.title,userId:req.params.id}})
  .then(favorite=>{
    favorite ? res.send('is already in favorites')
    : 
    Movie.create(req.body,{include:{model:User, as:'user'}}).then(data => res.send(data)); 
  })
  
  
});

router.get(`/favorites`, (req, res) => {
  if (req.user) Movie.findAll().then((data)=> res.send(data)) 
  else res.sendStatus(401);
});

router.delete('/favorites/:id', (req,res)=>{
  console.log(req.params.id)
  Movie.destroy({where:{id:req.params.id}})
  .then((data)=> console.log(data))
})



router.use("/", function (req, res) {
  res.sendStatus(404);
});






// router.put("/favorites", (req, res) => {
//   const { userId, flightId } = req.query;
//   User.findOneAndUpdate(
//     { _id: userId },
//     { $push: { favorites: flightId } },
//     { new: true }
//   )
//     .populate({
//       path: "favorites",
//       populate: { path: "origin destination" },
//     })
//     .then((user) => res.send(user))
//     .catch((error) => res.status(500).send(error));
// });

// router.delete("/favorites", (req, res) => {
//   const { userId, flightId } = req.query;
//   console.log("USER ID", userId);
//   console.log("FLIGHt ID", flightId);
//   User.findOneAndUpdate(
//     { _id: userId },
//     { $pull: { favorites: flightId } },
//     { new: true }
//   )
//     .populate({
//       path: "favorites",
//       populate: { path: "origin destination" },
//     })
//     .then((user) => {
//       console.log("USER", user);
//       res.send(user);
//     })
//     .catch((error) => res.status(500).send(error));
// });


module.exports = router;
