exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sharks', (table) => {
      table.integer('id').primary()
      table.string('name')
      table.string('description')
      table.string('img_src')
      table.decimal('price')
    }),
    knex.schema.createTable('order_history', (table) => {
      table.increments('id').primary()
      table.decimal('total_price')
      table.timestamp('order_date').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('sharks'),
    knex.schema.dropTable('order_history')
  ])
};
