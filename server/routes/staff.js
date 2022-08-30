const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const knex = require('knex')(require('../knexfile'))
const authorize = require('../middleware/authorize')


// POST  /register
// Expected body: { 'first_name','last_name','position','address','phone', 'email','password' }
router.post('/register', authorize, (req, res) => {
        const {first_name, last_name, position,gender, department, address, phone, email, password } = req.body

        if(!first_name || !last_name || !gender || !department || !position || !address || !phone || !email || !password) {
            return res.status(400).json({error:'Please provide all the required fields 😡😡😡'})
        }

        // Encrypt staff password
        const hashedPassword = bcrypt.hashSync(password, 8)

        // Create a new staff in DB
        knex('staff')
            .insert({...req.body, admin_id: req.decoded.id, password: hashedPassword})
            .then((newStaffId) => {
                res.status(201).json(`New staff ID: ${newStaffId}`)
            })
            .catch((err) => {
                res.status(400).json({message : 'Registration Failed ', error: err.sqlMessage})
            })
})


// GET  staff/:id
router.get("/:id", authorize, (req, res) => {
    knex('staff')
    .select('first_name', 'last_name', 'position', 'department','gender','email','phone', 'address' )
       .where({ id: req.params.id})
       .then((data) => {
       // If record is not found, respond with 404
       if(!data.length) {
           return res.status(404).send(`Record with id: ${req.params.id} is not found`)
       }

       // knex returns an array of records. 
       // So we need to send response with a single object only
       res.status(200).json(data[0])
    })
    .catch((err) =>
       res.status(400).send(`Error retrieving staff ${req.params.id} ${err}`))
})

// GET /staffs
router.get('/', (req, res) => {
    // res.status(200).send(req.headers.authorization)
    if(!req.headers.authorization) {
        return res.status(401).send('Please login')
    }
    
    // Get the token value
    const authToken = req.headers.authorization.split(' ')[1]

    // verify the token
    jwt.verify(authToken, process.env.JWT_SECRET, (err, payload) => {
        if(err) {
           return res.status(403).send('Invalid auth token')
        } else {
            knex
            .select(
              'staff.id as id',
              'admin.id as admin_id',
              'staff.first_name', 
              'staff.last_name', 
              'staff.position', 
              'staff.gender', 
              'staff.department', 
              'staff.address',
              'staff.phone',
              'staff.email',
            )
            .from ('staff')
            .leftJoin('admin', 'staff.admin_id', 'admin.id')
            .orderBy('staff.id', 'desc')
            .then(allStaffs => {

            const staffs = allStaffs.filter( admin => admin.admin_id === payload.id)
               res.status(200).json(staffs)
            })
            // knex('staff')
            //   .then(data => {
            //        res.status(200).json(data)
            //   })
            
              
        }
    })
})

//  PUT /:id/edit
router.put('/:id/edit', authorize, (req, res) => {
    const {first_name, last_name, position,gender, department, address, phone, email, password } = req.body

    if(!first_name || !last_name || !gender || !department || !position || !address || !phone || !email || !password) {
        return res.status(400).json({error:'Please provide all the required fields 😡😡😡'})
    }

    // Encrypt staff password
    const hashedPassword = bcrypt.hashSync(password, 8)
    knex('staff')
    .where({id: req.params.id})
    .update({...req.body, password: hashedPassword})
    .then((data) => {
       res.sendStatus(200)
    })
    .catch((err) => {
        res.status(400).json({ message: `Error updating user ${req.params.id}`, error: err.sqlMessage
        })

    })

})

// DELE /:id/delete
router.delete('/:id/delete', authorize, (req, res) => {
        knex('staff')
          .where({ id: req.params.id  })
          .del()
          .then((data) => {
             res.sendStatus(204)
          })
          .catch(() => 
            res.status(400).json({
               message: `Error deleting user ${req.params.id}`
            }))
})




module.exports = router