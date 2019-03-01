module.exports = (knex, cat_id, user_id) => {
  // returns tasks that match current user, category and task id
  return knex
    .from('tasks')
    .select('tasks.id')
    .join('categories', 'tasks.category_id', '=', 'categories.id')
    .where('tasks.category_id', cat_id)
    .andWhere('categories.user_id', user_id)
}
