exports.seed = function (knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({
          id: 999,
          name: 'Uncategorized',
          api: 'uncat',
          user_id: 1,
        }),
        knex('categories').insert({
          id: 888,
          name: 'Completed',
          api: 'uncat',
          user_id: 1,
        }),
        knex('categories').insert({
          name: 'Watch',
          api: 'imdb',
          user_id: 2,
        }),
        knex('categories').insert({
          name: 'Eat',
          api: 'yelp',
          user_id: 3,
        }),
        knex('categories').insert({
          name: 'Buy',
          api: 'amazon',
          user_id: 3,
        }),
        knex('categories').insert({
          name: 'Read',
          api: 'amazon',
          user_id: 2,
        }),
      ]);
    });
};
