const knex = require('knex')(require('../knexfile'))
const bcrypt = require('bcryptjs')


// GET all students
exports.index = (req, res) => {
  knex('student')
    .select('id', 'admin_id','first_name', 'last_name','email','address','parent_phone','parent_email')

    .then((data) => {
        const students = data.filter(student => student.admin_id === req.decoded.id)
      res.status(200).json(students);
    })
    .catch((err) => res.status(400).send(`Error retrieving student ${err}`));
};

exports.singlestudent = (req, res) => {
  knex('student')
    .select('first_name', 'last_name', 'parent_email', 'parent_phone', 'email', 'address')
    .where({ id: req.params.id })
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        return res.status(404).send(`Record with id: ${req.params.id} is not found`)
      }

      // Knex returns an array of records, so we need to send response with a single object only
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving student ${req.params.id} ${err}`)
    );
};

// exports.warehouseInventories = (req, res) => {
//   knex('inventory')
//     .where({ warehouse_id: req.params.id })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) =>
//       res
//         .status(400)
//         .send(
//           `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
//         )
//     );
// };

exports.addstudent = (req, res) => {

  // Validate the request body for required data
  if (!req.body.first_name || 
      !req.body.last_name || 
      !req.body.address || 
      !req.body.parent_phone || 
      !req.body.email || 
      !req.body.parent_email || 
      !req.body.password) {

      return res.status(400).json({error: 'Please fill all the required fields'});
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 8)


  knex('student')
    .insert({...req.body, admin_id: req.decoded.id, password: hashedPassword})
    .then((data) => {
      // For POST requests we need to respond with 201 and the location of the newly created record
      const newStudentURL = `/student/${data[0]}`;
      res.status(201).location(newStudentURL).end(newStudentURL);
    })
    .catch((err) => {
      res.status(400).json({message : 'Registration Failed ', error: err.sqlMessage})
  })
};

exports.updatestudent = (req, res) => {
  if(!req.body.first_name || !req.body.last_name || !req.body.parent_phone || !req.body.parent_email || !req.body.email || !req.body.address || !req.body.password) {
      return res.status(400).json({error: "Please fill all the required fields"})
  }
  
  const hashedPassword = bcrypt.hashSync(req.body.password, 8)


  knex('student')
    .update({...req.body, password: hashedPassword})
    .where({ id: req.params.id })
    .then(() => {
      res.status(200).send(`Student with id: ${req.params.id} has been updated`);
    })
    .catch((err) =>
      res.status(400).json({error: `Error updating Student ${req.params.id} ${err.sqlMessage}`})
    );
};

exports.deletestudent = (req, res) => {
  knex('student')
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res.status(204).send(`Student with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
    );
};