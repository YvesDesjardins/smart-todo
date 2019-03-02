## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Some SQL database with support for postgresql

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`
9. Login via the login button in the top right

## Create New Category

1. Click 'New category' button in the top left of the window
2. Enter your preferred name for the category
3. Click submit to create your new empty category!

## Create New Task

1. Click 'New task' button in the top left of the window
2. Enter your preferred name for the task
3. The state of the art deep learning AI will automatically select a category for you
4. Click submit to create your new task!

## Edit Category

1. Click the category you want to change
2. Edit the new name you want
3. Click the 'save' button

## Edit Task

1. Click the task you want to change
2. Edit the fields you want
3. Click the 'save' button

## Delete Task

1. Click the task you want to change
2. Click the 'delete' button

