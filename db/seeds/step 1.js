exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          email: 'test@google.com',
          password: '12345abcd'
        }),
      ]);
    });
};
