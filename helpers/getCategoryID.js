module.exports = (knex, name, callback) => {
  // returns category id from db
  return knex('categories').select('*').where('name', name);
}
