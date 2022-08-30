const departmentData = require('../seed_data/department')

exports.seed = function(knex) {
   return knex('department')
     .del()
     .then(function(){
        return knex('department').insert(departmentData)
     })
}