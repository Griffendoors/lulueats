exports.up = function(knex, Promise) {
  return knex.schema.createTable('image',(table) => {
    table.increments();
    table.text('image_url').notNullable();
    table.text('image_id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post');
};
