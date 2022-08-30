const express = require('express')
const app = express()
const cors = require('cors')
const staffRoutes = require('./routes/staff')
const adminRoutes = require('./routes/admin')
const studentRoutes = require('./routes/studentRoute')
const departmentRoutes = require('./routes/departmentRoute')
const courseRoutes = require('./routes/courseRoute')


require('dotenv').config()
const PORT = process.env.PORT || 5050

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send('Hello Abdullah')
})

app.use('/staff', staffRoutes )
app.use('/admin', adminRoutes)
app.use('/student', studentRoutes)
app.use('/department', departmentRoutes)
app.use('/course', courseRoutes)

app.listen(PORT, () => {
    console.log(`Server running on PORT:http://localhost:${PORT} 🚀🚀🚀`)
})