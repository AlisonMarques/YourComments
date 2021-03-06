exports.up = function (knex) {
  return knex.schema.createTable('userdata', function (table) {
    table.increments();

    table.string('about').notNullable();
    table.string('instagram').notNullable();
    table.string('facebook').notNullable();

    table.string('userdata_id').notNullable();

    table.foreign('userdata_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('userdata');
};
