
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post',(table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('author').notNullable();
    table.boolean('private').defaultTo(true).notNullable();
    table.datetime('date').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post');
};
