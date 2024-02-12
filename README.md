# Simple CRUD API

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository: `git clone https://github.com/SilCorp/NodeJS2024Q1.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run start:dev`
4. Open your browser and navigate to address provided in console. The default is: `http://127.0.0.1:4000/`

## Available Endpoints

| Endpoint               | Description                                                                         |
|----------------------|-------------------------------------------------------------------------------------|
| `/users`              | GET: Returns a list of users<br>POST: Creates a new user                         |
| `/users/:userId`      | GET: Returns a single user<br>PUT: Updates an existing user<br>DELETE: Deletes a user |

## Scripts

| Script               | Description                                                                         |
|----------------------|-------------------------------------------------------------------------------------|
| `npm run start:dev`   | Starts the development server with hot module reloading                              |
| `npm run start:prod`  | Builds the production bundle and starts the production server                         |
| `npm run build`      | Builds the production bundle                                                        |
| `npm run test`       | Runs the unit tests with Jest                                                      |

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript
- [Webpack](https://webpack.js.org/) - A module bundler that bundles JavaScript files for usage in a browser
- [Jest](https://jestjs.io/) - A testing framework that allows you to write tests using a JavaScript syntax