
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post',(table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('subTitle');
    table.text('author').notNullable();
    table.text('body').notNullable();
    table.boolean('private').defaultTo(true).notNullable();
    table.datetime('date').notNullable();
    table.text('banner_image_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post');
};

/*
exports.up = function(knex, Promise) {
    return knex.schema.table('post', (table) => {
        table.text('banner_image_url').notNullable();;
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('post', (table) =>  {
        table.dropColumn('banner_image_url').notNullable();;
    });
};
*/
