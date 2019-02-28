exports.seed = function (knex, Promise) {
  return knex('tasks').del()
    .then(function () {
      return Promise.all([
        knex('tasks').insert({
          id: 1,
          name: 'Uncategorized',
          api: 'uncat',
          user_id: 1
        }),
        knex('tasks').insert({
          id: 2,
          name: 'Movies',
          api: 'imdb',
          user_id: 2
        }),
        knex('tasks').insert({
          id: 3,
          name: 'Food',
          api: 'yelp',
          user_id: 3
        }),
      ]);
    });
};
