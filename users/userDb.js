const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
};

function find() {
  return db('users').select('id', 'email', 'first_name', 'last_name', 'avatar');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user)
    // .then(ids => ({ id: ids[0] }));

}

function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}


