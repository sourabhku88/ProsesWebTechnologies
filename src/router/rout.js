const express = require('express');
const { createUser, getUser, updateUser, deleteUser } = require('../controllers/user');
const router = express.Router();



router.post('/create/user', createUser);
router.get('/get/user', getUser);
router.patch('/update/user/:id', updateUser);
router.delete('/update/user/:id', deleteUser);

router.all('*', (_, res) => res.status(400).send({ message: 'BAD URL' }));

module.exports = router;