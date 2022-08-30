# Relax Admin System

** Try this app at : **
https://relax-admin.itangishaka.com/  

Relax Admin system provides complete funtionality to manage records, staffs, students, faculty, courses and classes for a particular school administration. It uses Express( Node.js framework) for backend and MySql(using knex.js a query builder for MySQL) as Database.

The purpose of this application is to automate and replace the existing manual system.
With Relax Admin System, schools data/information can be stored for a longer period with easy accessing and manipulation.
## Product Features and User Classifications

The end users for the Relax Admin System are divided as Students, Staff and the Administrator. 

At the moment: 

**ADMIN is able to**:  

          . Create an account/ do registration
          . Login in the system using the correct credentials
          . add staff/student/departments/courses/classes
          . view staff/student
          . edit staff/student
          .delete staff/student 

**In the coming days:**

ADMIN is able to    

    add, edit, view and delete departments/courses/classes and many more features

**STAFF will be able to:**

           . view students details, 
           . add/update assignments, 
           . Give marks and attendance to a particular student. 
           . see the time-table of a particular class they belong to.

**STUDENT will be able:**    


           . to update profile
           . add solution to assignments and 
           . see marks and attendance.
           . apply for a certification, 
           . inform the school the reason he/she will be absent and ask permission
           . to pay the school fees and miscellaneous.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server folder

`PORT=5050`
`JWT_SECRET`


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://itangishaka.com/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/itangishaka/)

[![github](https://img.shields.io/badge/github-0A66C2?style=for-the-badge&logo=github&logoColor=white)](https://github.com/itangishaka1)

# Tech Stack Used

**Front End:**      

React.js.  
Axios  
Material UI.   
Sass

**Back End:**

Node.js    
Express.js.  
Knex.js.  
MySQL   


  




## Installation

knexfile.js

```bash
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'your password',
      database: 'relax_admin_db',
      charset:'utf8'
    }
  },
};
  
```
    