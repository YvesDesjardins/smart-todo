exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: 1,
          email: 'test@google.com',
          password: '12345abcd'
        }),
        knex('users').insert({
          id: 2,
          email: 'awildlama@amazon.ca',
          password: '12345abcd'
        }),
        knex('users').insert({
          id: 3,
          email: '12345@12345.com',
          password: '12345abcd'
        }),
      ]);
    });
};
