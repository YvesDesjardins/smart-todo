module.exports = (knex, uid, callback) => {
  // returns user id from db
  return knex('users').select('*').where('email', uid);
}
