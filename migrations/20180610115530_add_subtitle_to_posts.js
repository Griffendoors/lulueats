
exports.up = function(knex, Promise) {
    return knex.schema.table('post', (table) => {
        table.text('subTitle');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('post', (table) =>  {
        table.dropColumn('subTitle');
    });
};
