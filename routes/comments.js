const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Create a new comment
router.post('/post', async (req, res) => {
  try {
    const currentUser = req.user; 
    const { content, postId } = req.body;

    await Comment.create({ content, postId, name: currentUser.name, userId: currentUser._id.toString() });

    if(postId == 1) {
      res.redirect('/reviews');
    } else if (postId == 2) {
      res.redirect('/ReviewsFauverelle');
    } else {
      res.redirect('/WhiteoakReviews');
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Handle error
  }
});
 // Update the route for the first page of comments

//  router.get('/reviews', async (req, res) => {
//   const page = 1; // Page number
//   const commentsPerPage = 10; // Number of comments per page
//   const skip = (page - 1) * commentsPerPage;

//   try {
//       const comments = await Comment.find({ postId }).skip(skip).limit(commentsPerPage);
//       res.render('reviews', { currentUser, comments });
//   } catch (error) {
//       console.error(error);
//       res.sendStatus(500); // Handle error
//   }
// });

// Update the route for the second page of comments

// router.get('/ReviewsFauverelle', async (req, res) => {
//   const page = 2; // Page number
//   const commentsPerPage = 10; // Number of comments per page
//   const skip = (page - 1) * commentsPerPage;

//   try {
//       const comments = await Comment.find({ postId }).skip(skip).limit(commentsPerPage);
//       res.render('ReviewsFauverelle', { currentUser, comments });
//   } catch (error) {
//       console.error(error);
//       res.sendStatus(500); // Handle error
//   }
// });

// Update the route for the second page of comments

// router.get('/ReviewsWhiteoak', async (req, res) => {
//   const page = 3; // Page number
//   const commentsPerPage = 10; // Number of comments per page
//   const skip = (page - 1) * commentsPerPage;

//   try {
//       const comments = await Comment.find({ postId }).skip(skip).limit(commentsPerPage);
//       res.render('ReviewsWhiteoak', { currentUser, comments });
//   } catch (error) {
//       console.error(error);
//       res.sendStatus(500); // Handle error
//   }
// });
  

// Get comments for a specific post
router.get('/:commentId/delete', async (req, res) => {
    try {
      const commentId = req.params.commentId.toString();
      const comment = await Comment.find({ _id: commentId });

      await Comment.findByIdAndDelete(commentId);

      if(comment[0].postId == 1) {
        res.redirect('/reviews');
      } else if (comment[0].postId == 2) {
        res.redirect('/ReviewsFauverelle');
      } else {
        res.redirect('/WhiteoakReviews');
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500); // Handle error
    }
  });

  router.get('/:commentId/edit', async (req, res) => {
    try {
        const currentUser = req.user; // Assuming you're using passport for authentication
        const commentId = req.params.commentId;
        const comment = await Comment.findById({ _id: commentId });

        const comments = await Comment.find({ postId: comment.postId });
        if(comment.postId == 1) {
          res.render('reviews', { currentUser, comments, editcomment: comment});
        } else if (comment.postId == 2) {
          res.render('ReviewsFauverelle', { currentUser, comments, editcomment: comment});
        } else {
          res.render('WhiteoakReviews', { currentUser, comments, editcomment: comment });
        }
    } catch (error) {
      console.error(error);
      res.sendStatus(500); // Handle error
    }
  });

  router.post('/:commentId', async (req, res) => {
    try {
      const { _id, content } = req.body;
  
      const comment = await Comment.findByIdAndUpdate(_id, { content });
      
      if(comment.postId == 1) {
        res.redirect('/reviews'); // Redirect to comments page or wherever you want
      } else if (comment.postId == 2) {
        res.redirect('/ReviewsFauverelle'); // Redirect to comments page or wherever you want
      } else {
        res.redirect('/WhiteoakReviews'); // Redirect to comments page or wherever you want
      }
     
    } catch (error) {
      console.error(error);
      res.sendStatus(500); // Handle error
    }
  });

module.exports = router;

