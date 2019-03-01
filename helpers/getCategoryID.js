module.exports = (knex, name) => {
  // returns category id from db
  return knex('categories').select('*').where('name', name);
}
