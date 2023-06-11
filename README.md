# User Management Application

This is a simple user management application built using Node.js, Express, MySQL2, Sequelize, React.js, and Axios.

The application allows you to perform basic CRUD (Create, Read, Update, Delete) operations on a users table.

## Server

The server part of the application is structured as an MVC (Model-View-Controller) architecture, similar to Laravel.

### Folder Structure

- `server`
  - `controllers`: Contains the controllers responsible for handling HTTP requests and defining the application logic.
  - `models`: Contains the Sequelize models that define the structure of the users table.
  - `routes`: Contains the Express routes that map the HTTP endpoints to the appropriate controller methods.
  - `migrations`: Contains the Sequelize migration files that define the changes to the database schema.
  - `config`: Contains the configuration files for the database connection and other settings.

### Sequelize

Sequelize is a powerful ORM library for Node.js that provides an easy-to-use interface for working with databases. It abstracts away the low-level SQL queries and allows you to interact with the database using JavaScript models and methods.

In this application, Sequelize is used to define the structure of the users table in the `models/User.js` file. The model defines the table columns, their data types, and any constraints or associations. Sequelize also generates SQL queries under the hood to perform database operations such as creating, reading, updating, and deleting records.

The `config/database.js` file sets up the Sequelize connection to the MySQL database using the configuration specified in the `config/config.json` file.

Sequelize migrations, located in the `migrations` directory, are used to version control and manage the changes to the database schema over time. Each migration file represents a set of database changes, such as creating or modifying tables, and can be executed to apply or revert the changes to the database.

### Running the Server

To run the server, follow these steps:

1. Navigate to the `server` folder:

```
cd server
```
2. Install the dependencies:

```
npm install
```
3. Create a new MySQL database.

4. Set up the database connection by modifying the `config/config.json` file.

5. Run the migrations to create the necessary tables:

```
npx sequelize-cli db:migrate
```

6. Run the server:

```
npm start
```

The server will start running on http://localhost:3000.

## Client

The client part of the application is built using React.js (Vite) and uses Axios for making HTTP requests. The application state is managed using context providers.

### Folder Structure

- `client`
    - `src`
        - `assets`: Contains the static assets and styles used in the application.
        - `components`: Contains the reusable components used in the application.
        - `context`: Contains the context providers for managing the application state and making HTTP requests.
        - `pages`: Contains the main pages of the application.
        - `App.js`: The main component that defines the application's context providers.
        - `index.js`: The entry point of the React application.

### Running the Client

To run the client, follow these steps:

1. Navigate to the `client` folder:

```
cd client
```

2. Install the dependencies:

```
npm install
```

3. Run the client:

```
npm run dev
```

The client will start running on http://localhost:5173.

## Usage

Once both the server and client are running, you can open your web browser and access the user management application at http://localhost:5173.

The application allows you to perform the following operations:

- View the list of users.
- Create a new user.
- Edit an existing user.
- Delete a user.

The changes made in the application will be reflected in the database.

## Screenshots


## Contributing

Contributions are welcome! If you find any issues or want to add new features, please submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE)