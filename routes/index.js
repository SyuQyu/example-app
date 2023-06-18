const exprs = require('express');
const router = exprs.Router();

const auth = require('./auth.routes');
router.use('/auth', auth);
const users = require('./users.routes');
router.use('/users', users);

module.exports = router;