# Introduction to Authentication Module Project

## Introduction

Use `Node.js`, `Express` and `Knex` to build an API that provides register, login and logout functionality.

## Instructions

### Task 1: Project Setup

Your instructor should have communicated which method to use for this project during the Guided Project and in your cohort's Slack channel. If you are still unsure, reach out to Lambda Staff.

### Task 2: Minimum Viable Product

#### 2A - Database Access Functions

Write the following user access functions inside `api/users/users-model.js`:

- [x] `find`
- [x] `findBy`
- [x] `findById`
- [x] `add`

#### 2B - Middleware Functions

Write the following auth middlewares inside `api/auth/auth-middleware.js`:

- [x] `restricted`
- [x] `checkUsernameFree`
- [x] `checkPasswordLength`
- [x] `checkUsernameExists`

#### 2C - Endpoints

Authentication will be tracked using sessions and cookies. See `api/server.js` for more instructions.

Write the following endpoints. The first one belongs inside `api/users/users-router.js` and the rest inside `api/auth/auth-router.js`:

- [x] `[GET] /api/users`
- [ ] `[POST] /api/auth/register`
- [x] `[POST] /api/auth/login`
- [x] `[GET] /api/auth/logout`

#### Users Schema

The database `auth.db3` includes a single `users` table:

| field    | data type        | metadata                                      |
| :------- | :--------------- | :-------------------------------------------- |
| user_id  | unsigned integer | primary key, auto-increments, generated by db |
| username | string           | required, unique                              |
| password | string           | required                                      |

#### Notes

- Run tests locally executing `npm test`.
- The project comes with `migrate`, `rollback` and `seed` scripts in case you need to reset the database.
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries or add extra scripts. Do not update existing libraries.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work.
- Perform basic professional polishing including spell-checking and grammar-checking on your work.

### Task 3: Stretch Goals

- Build a React application that implements components to register, login and view a list of users. Gotta keep sharpening your React skills.
