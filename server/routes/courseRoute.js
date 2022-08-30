const router = require('express').Router();
const courseController = require('../controllers/courseController');
const authorize = require('../middleware/authorize')



router.get('/', authorize, courseController.index)
  // .route('/')
  // .get(courseController.index)
  // .post(courseController.addcourse);

// router
//   .route('/:id')
//   .get(courseController.singlecourse)
//   .put(courseController.updatecourse)
//   .delete(courseController.deletecourse);

// router
//   .route('/:id/inventories')
//   .get(courseController.courseInventories);

module.exports = router;
