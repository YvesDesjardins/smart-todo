exports.seed = function (knex, Promise) {
  return knex('tasks').del()
    .then(function () {
      return Promise.all([
        knex('tasks').insert({
          name: 'Work on bloopityboop',
          completed: false,
          category_id: 999
        }),
        knex('tasks').insert({
          name: 'Be alive',
          completed: true,
          category_id: 888
        }),
        knex('tasks').insert({
          name: 'Watch Avengers',
          completed: false,
          category_id: 1
        }),
        knex('tasks').insert({
          name: 'Eat ramen',
          completed: false,
          category_id: 2
        }),
        knex('tasks').insert({
          name: 'Buy shoes',
          completed: false,
          category_id: 3
        }),
        knex('tasks').insert({
          name: 'Read Cracking The Coding Interview',
          completed: false,
          category_id: 4
        }),
      ]);
    });
};
