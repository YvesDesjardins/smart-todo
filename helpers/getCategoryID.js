module.exports = (knex, name, callback) => {
  // returns category id from db
  knex('categories')
    .select('*')
    .where('name', name)
    .then((results) => {
      return results[0].id;
    })
    .catch((err) => {
      throw err;
    });
}
