exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('age', 2).notNullable();
    table.string('cpf', 11).notNullable();
    table.string('rg', 7).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
