module.exports = (knex, uid) => {
  // returns user id from db
  knex('users')
    .select('*')
    .where('email', uid)
    .then((results) => {
      return results[0].id;
    })
    .catch((err) => {
      throw err;
    });
}
