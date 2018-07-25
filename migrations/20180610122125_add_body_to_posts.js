

exports.up = function(knex, Promise) {
    return knex.schema.table('post', (table) => {
        table.text('body').notNullable();;
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('post', (table) =>  {
        table.dropColumn('body').notNullable();;
    });
};
