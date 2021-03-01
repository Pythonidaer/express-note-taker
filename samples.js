var express = require('express')
var app = express()

const PORT = process.env.PORT || 8081;
// Here are some examples of route paths based on strings.

// This route path will match requests to the root route, /.

app.get('/', function (req, res) {
  res.send('root')
})
// This route path will match requests to /about.

app.get('/about', function (req, res) {
  res.send('about')
})
// This route path will match requests to /random.text.

app.get('/random.text', function (req, res) {
  res.send('random.text')
})
// Here are some examples of route paths based on string patterns.

// This route path will match acd and abcd.

app.get('/ab?cd', function (req, res) {
  res.send('ab?cd')
})
// This route path will match abcd, abbcd, abbbcd, and so on.

app.get('/ab+cd', function (req, res) {
  res.send('ab+cd')
})
// This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.

app.get('/ab*cd', function (req, res) {
  res.send('ab*cd')
})
// This route path will match /abe and /abcde.

app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})
// Examples of route paths based on regular expressions:

// This route path will match anything with an “a” in it.

app.get(/a/, function (req, res) {
  res.send('/a/')
})
// This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.

app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/')
})

// Route Handlers
// A single callback function can handle a route. For example:

app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})

// More than one callback function can handle a route (make sure you specify the next object). For example:

app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

// An array of callback functions can handle a route. For example:

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

// A combination of independent functions and arrays of functions can handle a route. For example:

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })


// Create a router file named birds.js in the app directory, with the following content:

var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
// Then, load the router module in the app:

var birds = require('./birds')

// ...

app.use('/birds', birds)



app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});
  
/*
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }

Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }

Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
*/