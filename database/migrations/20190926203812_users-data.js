
exports.up = function(knex) {
    return knex.schema.createTable('users-data', users => {
      users.increments()

      users
        .string('full_name', 128)
        .notNullable()
        .unique();
      users
        .string('email', 128)
        .notNullable()
      users.string('password', 128)
      .notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users-data');
  };
