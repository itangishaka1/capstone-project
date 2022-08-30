const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const knex = require('knex')(require('../knexfile'))
const authorize = require('../middleware/authorize')


// POST /register
router.post('/register', (req, res) => {
    const {address, email, first_name, last_name, password, phone} = req.body
    if(!address || !email || !first_name || !last_name || !password || !phone) {
        return res.status(400).json({ error: 'Please provide all the required fields 😡😡😡'})
    }

    const hashedPassword = bcrypt.hashSync(password, 8)

    knex('admin')
       .insert({...req.body, password: hashedPassword})
       .then(() => {
           res.status(201).send('Registered successfully 👏👏👏')
       })
       .catch(err => {
           res.status(400).json({message: 'Registration Failed', error: `${err.sqlMessage.split(' ')[2]} is taken! Use another email address`})
       })
})

// POST /login
router.post('/login', (req, res) => {
    const { email, password } = req.body

    // 1. Checks if the user sends both email and password
    if(!email || !password) {
        return res.status(400).json({error: 'Please provide all the required fields 😡😡😡'})
    }

    // 2. check if we have this email in our DB
    knex('admin')
      .where({ email:email })
      .then(admin => {
         if(!admin.length) {
             return res.status(400).json({error: "This account does not exist! 😡😡😡"})
         }

         // 3. We have the user, check the password if matches the one we have in our DB
         const isPasswordCorrect = bcrypt.compareSync(password, admin[0].password)
         if(!isPasswordCorrect) {
            return res.status(400).json({error: "Email or password is incorrect! 😡😡😡"})
         }

         // 4. Create a JWT for successful login
         // To generate a secret key you can run this line of code in the Terminal: node -e "console.log(require('crypto').randomBytes(32).toString('hex'));".
         const token = jwt.sign(
            { id: admin[0].id, email: admin[0].email},
            process.env.JWT_SECRET,
            { expiresIn: "24h" }  
            )
         res.status(200).json({ token: token})   
      })
      .catch(() => {
         res.status(400).json({ error : "Email and password are incorrect! 😡😡😡"})
      })
})

// GET /curent - Protected route
router.get('/current', authorize,  (req, res) => {
    knex('admin')
        .select( 'id', 'address', 'email', 'first_name', 'last_name', 'phone', 'position')
        .where({ email: req.decoded.email })
        .then(data => {
            res.status(200).send(data)
        })
        .catch( () => {
            res.status(500).send('Could not fetch the data, try again')
        })
})


module.exports = router