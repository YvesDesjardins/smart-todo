module.exports = (knex, userEmail) => {
  // returns user id from db
  return knex('users').select('*').where('email', userEmail);
}
