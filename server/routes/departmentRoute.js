const router = require('express').Router();
const departmentController = require('../controllers/departmentController');
const authorize = require('../middleware/authorize')

router.get('/', authorize, departmentController.index) 
  // .route('/')
  // .get(departmentController.index)
  // .post(departmentController.adddepartment);

// router
//   .route('/:id')
//   .get(departmentController.singledepartment)
//   .put(departmentController.updatedepartment)
//   .delete(departmentController.deletedepartment);

// router
//   .route('/:id/inventories')
//   .get(departmentController.departmentInventories);

module.exports = router;
