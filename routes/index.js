const exprs = require('express');
const router = exprs.Router();

const auth = require('./auth.routes');
router.use('/auth', auth);
const users = require('./users.routes');
router.use('/users', users);
const author = require('./author.routes');
router.use('/author', author);
const book = require('./book.routes');
router.use('/book', book);
const borrowedBook = require('./borrowedBooks.routes');
router.use('/borrowedBook', borrowedBook);

module.exports = router;