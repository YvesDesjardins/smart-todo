exports.seed = function (knex, Promise) {
  return knex('tasks').del()
    .then(function () {
      return Promise.all([
        knex('tasks').insert({
          name: 'Work on bloopityboop',
          completed: false,
          category_id: 1
        }),
        knex('tasks').insert({
          name: 'Watch Avengers',
          completed: false,
          category_id: 2
        }),
        knex('tasks').insert({
          name: 'Eat ramen',
          completed: false,
          category_id: 3
        }),
      ]);
    });
};
