const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/', (req, res) => {
  const currentUser = req.user; // Assuming you're using passport for authentication
  res.render('dashboard', { currentUser });
});
router.get('/login', (req, res) => {
    res.render('login', { error: '' });
    
  });

router.get('/register', (req, res) => {
    res.render('register');
  });
  

  router.get('/reviews', async (req, res) => {
    const currentUser = req.user; // Assuming you're using passport for authentication
    const comments = await Comment.find({ postId: 1 });
    res.render('reviews', { currentUser, comments, editcomment: {} });
  });

  router.get('/ReviewsFauverelle', async (req, res) => {
    const currentUser = req.user; // Assuming you're using passport for authentication
    const comments = await Comment.find({ postId: 2 });
    res.render('ReviewsFauverelle', { currentUser, comments, editcomment: {} });
  });

  router.get('/WhiteoakReviews', async (req, res) => {
    const currentUser = req.user; // Assuming you're using passport for authentication
    const comments = await Comment.find({ postId: 3 });
    res.render('WhiteoakReviews', { currentUser, comments, editcomment: {} });
  });

  router.get('/airbnb', (req, res) => {
    const currentUser = req.user; // Assuming you're using passport for authentication

    res.render('airbnb', { currentUser });
  });

  router.get('/airbnb', (req, res) => {
    res.render('airbnb');
  });
  router.get('/Weather', (req, res) => {
    const currentUser = req.user;
    res.render('Weather', { currentUser });
  });
  router.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });
  router.get('/Chamgaia', (req, res) => {
    const currentUser = req.user;
    res.render('Chamgaia', { currentUser });
  });
  router.get('/Fauverelle', (req, res) => {
    const currentUser = req.user;
    res.render('Fauverelle', { currentUser });
  });
  router.get('/Whiteoaks', (req, res) => {
    const currentUser = req.user;
    res.render('Whiteoaks', { currentUser });
  });
  router.get('/Activities', (req, res) => {
    const currentUser = req.user;
    res.render('Activities',{ currentUser });
  });
 
  
  
  

module.exports = router;
