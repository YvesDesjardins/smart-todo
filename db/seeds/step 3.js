exports.seed = function (knex, Promise) {
  return knex('tasks').del()
    .then(function () {
      return Promise.all([
        knex('tasks').insert({
          name: 'Work on bloopityboop',
          completed: false,
          category_id: 1,
        }),
        knex('tasks').insert({
          name: 'Be alive',
          completed: true,
          category_id: 2,
        }),
        knex('tasks').insert({
          name: 'Watch Avengers',
          completed: false,
          category_id: 3,
        }),
        knex('tasks').insert({
          name: 'Watch Harry Potter',
          completed: false,
          category_id: 3,
        }),
        knex('tasks').insert({
          name: 'Watch The Expanse',
          completed: false,
          category_id: 3,
        }),
        knex('tasks').insert({
          name: 'Eat ramen',
          completed: false,
          category_id: 4,
        }),
        knex('tasks').insert({
          name: 'Eat noodles',
          completed: false,
          category_id: 4,
        }),
        knex('tasks').insert({
          name: 'Eat rice',
          completed: false,
          category_id: 4,
        }),
        knex('tasks').insert({
          name: 'Buy shoes',
          completed: false,
          category_id: 5,
        }),
        knex('tasks').insert({
          name: 'Read Cracking The Coding Interview',
          completed: false,
          category_id: 6,
        }),
        knex('tasks').insert({
          name: 'Work on nothing at all',
          completed: false,
          category_id: 7,
        }),
        knex('tasks').insert({
          name: 'Be not dead',
          completed: true,
          category_id: 8,
        }),
        knex('tasks').insert({
          name: 'Watch Game of Thrones',
          completed: false,
          category_id: 9,
        }),
        knex('tasks').insert({
          name: 'Eat spaghetti',
          completed: false,
          category_id: 10,
        }),
        knex('tasks').insert({
          name: 'Buy shirts',
          completed: false,
          category_id: 11,
        }),
        knex('tasks').insert({
          name: 'Read Pride and Prejudice',
          completed: false,
          category_id: 12,
        }),
        knex('tasks').insert({
          name: 'Zip zop',
          completed: false,
          category_id: 13,
        }),
        knex('tasks').insert({
          name: 'Get into lighthouse labs',
          completed: true,
          category_id: 14,
        }),
        knex('tasks').insert({
          name: 'Watch Moana',
          completed: false,
          category_id: 15,
        }),
        knex('tasks').insert({
          name: 'Eat taco',
          completed: false,
          category_id: 16,
        }),
        knex('tasks').insert({
          name: 'Buy groceries',
          completed: false,
          category_id: 17,
        }),
        knex('tasks').insert({
          name: 'Read how to program c#',
          completed: false,
          category_id: 18,
        }),
      ]);
    });
};
