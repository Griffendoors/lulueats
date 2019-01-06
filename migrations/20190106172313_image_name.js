
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('image', (table) => {
    table.text('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('image', (table) => {
    table.dropColumn('name');
  });
};
