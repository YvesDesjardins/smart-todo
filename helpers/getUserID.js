module.exports = (knex, uid, callback) => {
  // returns user id from db
  knex('users')
    .select('*')
    .where('email', uid)
    .then((results) => {
      callback(results[0].id);
    })
    .catch((err) => {
      throw err;
    });
}
