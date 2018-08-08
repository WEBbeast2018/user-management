# user-management
user authentication demo with password hashing and passport.js


## User cases


## Steps:
1. clone and install packages (npm install)
2. registration - create a route and process request (save to users.json)
3. add form validation using [express-validator](https://github.com/express-validator/express-validator)
4. hash user password with [bcrypt](https://github.com/kelektiv/node.bcrypt.js/)
5. configure [express-session](https://github.com/expressjs/session) and [passport](http://www.passportjs.org)
6. make sessions data persistant with [session-file-store](https://github.com/valery-barysok/session-file-store)
7. create `posts` endpoint (which serve data from posts.json)
8. restrict `posts` endpoint to authenticated users
9. add login page and passport [LocalStrategy](https://github.com/jaredhanson/passport-local)