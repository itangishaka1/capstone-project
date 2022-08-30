exports.up = function(knex) {
   return knex.schema
     .createTable('admin', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('position').defaultTo('admin');
        table.string('address').notNullable();
        table.string('phone').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('updated-at').defaultTo(knex.fn.now());
     })
     .createTable('staff', (table) => {
        table.increments('id').primary();
        table.integer('admin_id').unsigned().notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('gender').notNullable();
        table.string('department').notNullable();
        table.string('position').notNullable().defaultTo('Teacher');
        table.string('address').notNullable();
        table.string('phone').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('updated-at').defaultTo(knex.fn.now());
        table
        .foreign('admin_id')
        .references('id')
        .inTable('admin')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
     })
     .createTable('student', (table) => {
        table.increments('id').primary();
        table.integer('admin_id').unsigned().notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('position').defaultTo('student');
        table.string('address').notNullable();
        table.string('parent_phone').notNullable();
        table.string('parent_email').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('updated-at').defaultTo(knex.fn.now());
        table
        .foreign('admin_id')
        .references('id')
        .inTable('admin')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
     })
     .createTable('course', (table) => {
        table.increments('id').primary();
        table.integer('admin_id').unsigned().notNullable();
        table.string('course_name').notNullable();
        table.string('course_type').notNullable();
        table.string('course_department').notNullable();
        table.string('semester').notNullable();
        table.string('credit').notNullable();
        table.timestamp('updated-at').defaultTo(knex.fn.now());
        table
        .foreign('admin_id')
        .references('id')
        .inTable('admin')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
     })
     .createTable('department', (table) => {
        table.increments('id').primary();
        table.integer('admin_id').unsigned().notNullable();
        table.string('name').notNullable();
        table.timestamp('updated-at').defaultTo(knex.fn.now());
        table
        .foreign('admin_id')
        .references('id')
        .inTable('admin')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
     })
 
 };
 
 exports.down = function(knex) {
    return knex.schema.dropTable('staff').dropTable('department').dropTable('admin').dropTable('student').dropTable('course')
 }