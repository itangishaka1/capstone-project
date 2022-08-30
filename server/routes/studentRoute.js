const router = require('express').Router();
const studentController = require('../controllers/studentController');
const authorize = require('../middleware/authorize')


router.get('/', authorize, studentController.index )
router.post('/', authorize, studentController.addstudent)

// router
//   .route('/', authorize)
  // .get(studentController.index)
  // .post(studentController.addstudent);

// router
//   .route('/:id')
//   .get(studentController.singlestudent)
//   .put(studentController.updatestudent)
//   .delete(studentController.deletestudent);
router.put('/:id', authorize, studentController.updatestudent)
router.get('/:id', authorize, studentController.singlestudent )
router.delete('/:id', authorize, studentController.deletestudent)

// router
//   .route('/:id/inventories')
//   .get(studentController.studentInventories);

module.exports = router;
