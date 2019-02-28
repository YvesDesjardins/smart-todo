module.exports = (knex, userEmail, callback) => {
  // returns user id from db
  return knex('users').select('*').where('email', userEmail);
}
