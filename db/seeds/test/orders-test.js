let ordersData = [
  {
    id: 1,
    total_price: 129.98
  }
]

const createOrder = (knex, order) => {
  return knex('order_history').insert({
    id: order.id,
    total_price: order.total_price,
  }, 'id')
};

exports.seed = (knex, Promise) => {
  return knex('order_history').del()
  .then(() => {
    let ordersPromises = [];

    ordersData.forEach((order) => {
      ordersPromises.push(createOrder(knex, order));
    });

    return Promise.all(ordersPromises);
  })
  .catch(error => console.log(`Error seeding orders data: ${error}`));
};
