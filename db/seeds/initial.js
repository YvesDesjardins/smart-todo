exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // users
        knex('users').insert({
          id: 1,
          email: 'test@google.com',
          password: '12345'
        }),
        knex('users').insert({
          id: 2,
          email: 'awildlama@amazon.ca',
          password: '12345'
        }),
        knex('users').insert({
          id: 3,
          email: '12345@12345.com',
          password: '12345'
        }),
        // categories
        knex('categories').insert({
          id: 3,
          name: 'Food',
          api: 'yelp',
          user_id: 1
        }),
        knex('categories').insert({
          id: 2,
          name: 'Movies',
          api: 'imdb',
          user_id: 2
        }),
        knex('categories').insert({
          id: 1,
          name: 'Uncategorized',
          api: 'uncat',
          user_id: 3
        }),
        // tasks
        knex('tasks').insert({
          id: 1,
          name: 'Watch Avengers',
          completed: false,
          category_id: 2
        }),
        knex('tasks').insert({
          id: 2,
          name: 'Eat ramen',
          completed: false,
          category_id: 3
        }),
        knex('tasks').insert({
          id: 3,
          name: 'Work on bleepbloop',
          completed: false,
          category_id: 1
        }),
      ]);
    });
};
