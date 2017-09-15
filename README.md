# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

!["url list page"](/screenshots/urls_page.png)
!["url edit page"](/screenshots/url_edit.png)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session
- method-override
- morgan

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.

## Usage

In your terminal, run `$ npm start`

You should see the following: `Tiny App listening on port 8080!`

then simply navigate to `http://localhost:8080` (this redirects to `http://localhost:8080/urls`) and login or register.

There are 2 mock users by default: `user@example.com:1234` and `user2@example.com:1234`

Have fun!

## Additional Info

### The following are mock databases that contain the necessary CRUD methods for the app

- urlsDB.js
- usersDB.js
- analyticsDB.js

Each database contains a small amount of mock data. Any data added to the database during runtime will be lost when the application is stopped.
