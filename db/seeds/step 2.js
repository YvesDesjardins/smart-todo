exports.seed = function (knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({
          name: 'Uncategorized',
          api: 'uncat',
          user_id: 1
        }),
        knex('categories').insert({
          name: 'Movies',
          api: 'imdb',
          user_id: 2
        }),
        knex('categories').insert({
          name: 'Food',
          api: 'yelp',
          user_id: 3
        }),
      ]);
    });
};
