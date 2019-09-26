const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findByUsername,
  update,
  remove,
};

function find() {
  return db('users-data').select('email', 'password');
}

function findByUsername(email) {
  return db('users-data')
    .where({ email })
}

function add(user) {
  return db('users-data')
    .insert(user)
    .then(res => {
      const id = res[0];
      return findById(id);
    });

}

function findById(id) {
  return db('users-data')
  .where({ id })
}

function update(id, user) {
  return db('users-data')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return db('users-data')
    .where('id', Number(id))
    .del();
}


