exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('email');
      table.date('password');
    }),
    knex.schema.createTable('categories', function (table) {
      table.increments('id');
      table.string('name');
      table.string('api');
      table.integer('user_id').references('id').inTable('users');
    }),
    knex.schema.createTable('tasks', function (table) {
      table.increments('id');
      table.string('name');
      table.boolean('completed');
      table.integer('category_id').references('id').inTable('categories');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('tasks')
  ])
};
