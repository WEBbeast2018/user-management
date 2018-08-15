# user-management
user authentication demo with password hashing and passport.js


## User cases


## Steps:
1. clone and install packages (npm install), add json read and write methods
2. registration - create a route and process request (save to users.json)
3. add form validation using [express-validator](https://github.com/express-validator/express-validator)
4. hash user password with [bcrypt](https://github.com/kelektiv/node.bcrypt.js/)
5. configure [express-session](https://github.com/expressjs/session) and [passport](http://www.passportjs.org)
   - create `posts` endpoint (which serve data from posts.json)
   - restrict `posts` endpoint to authenticated users
   - add login page
6. make sessions data persistant with [session-file-store](https://github.com/valery-barysok/session-file-store)
7. Add login functionality with `bcrypt.compare` and passport [LocalStrategy](https://github.com/jaredhanson/passport-local)
8. Add logout link/button
9. Create TSL certificate and add HTTPS


Useful materials:

[Node Authentication Tutorial](https://www.youtube.com/watch?v=gYjHDMPrkWU&list=PLpPnRKq7eNW3Qm2OfoJ3Hyvf-36TulLDp)

[How to use Express-Validator 5.x](https://charlietheprogrammer.com/how-to-use-express-validator-5/)

[Why chosing bcrpyt for password hashing](https://codahale.com/how-to-safely-store-a-password/)

[How can bcrypt have built-in salts?](https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts)

[How do Express.js Sessions work?](https://nodewebapps.com/2017/06/18/how-do-nodejs-sessions-work/)

[Fetch API with Cookie](https://stackoverflow.com/questions/34558264/fetch-api-with-cookie)

[Handling Failed HTTP Responses With fetch](https://www.tjvantoll.com/2015/09/13/fetch-and-errors/)

[Node Documentation TSL](https://nodejs.org/docs/latest/api/tls.html#tls_tls_ssl_concepts)

[Setup an HTTPS server with NodeJS and Express](https://www.youtube.com/watch?v=8ptiZlO7ROs)

[Automatic HTTPS connection/redirect with node.js/express](https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express)