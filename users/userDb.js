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
  return db('users-data').select('full_name', 'email', 'password');
}

function findByUsername(full_name) {
  return db('users-data')
    .where({ full_name })
}

function add(email) {
  return db('users-data')
    .insert(email)
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


