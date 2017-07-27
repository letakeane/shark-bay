// STOREFRONT
const sharkHtmlGenerator = (shark) => {
  if (localStorage.length && localStorage.getItem(`${shark.id}`) !== null) {
    if (shark.id == JSON.parse(localStorage.getItem(`${shark.id}`))[0].id) {
      return (
        `
        <article class='shark-card bought' id='${shark.id}' data-price='${shark.price}'>
          <h2 class='shark-name'>${shark.name}</h2>
          <img class='shark-image' alt='picture of shark' src=${shark.img_src} />
          <p>Description:</p>
          <p class='shark-description'>${shark.description}</p>
          <p>Price:</p>
          <h3 class='shark-price'>$${shark.price}</h3>
          <button class='buy-shark'>ADOPT ME!</button>
        </article>
        `
      )
    }
  } else {
    return (
      `
      <article class='shark-card' id='${shark.id}' data-price='${shark.price}'>
        <h2 class='shark-name'>${shark.name}</h2>
        <img class='shark-image' alt='picture of shark' src=${shark.img_src} />
        <p>Description:</p>
        <p class='shark-description'>${shark.description}</p>
        <p>Price:</p>
        <h3 class='shark-price'>$${shark.price}</h3>
        <button class='buy-shark'>BUY ME</button>
      </article>
      `
    )
  }
}

const displaySharks = (sharkArray) => {
  sharkArray.forEach((shark) => {
    $('#storefront').append(sharkHtmlGenerator(shark))
  })
  clickBuyShark();
}

const getSharks = () => {
  fetch('/api/v1/sharks')
    .then((resp) => resp.json())
    .then((sharks) => {
      sharksArray = sharks;
      $('#sharks-section').empty();
      displaySharks(sharks);
    })
    .catch((error) => console.log('Problem retreiving sharks: ', error))
}

const clickBuyShark = () => {
  $('.buy-shark').on('click', (e) => {
    const card = e.target.closest('.shark-card');
    const id = card.id;
    const price = $(`#${id}`).data('price');

    $(`#${id}`).toggleClass('bought');
    $(`#${id}`).children('button').prop('disabled', true);
    cartFullStyle();

    fetch(`/api/v1/sharks/${id}`)
      .then((response) => response.json())
      .then(shark => {
        localStorage.setItem(`${id}`, JSON.stringify(shark));
      })
    .catch((error) => { console.log('Error getting shark information: ', error) })
  })
}


// CART
const persistCartStyle = () => {
  if (localStorage.length) {
    cartFullStyle();
  }
}

const cartFullStyle = () => {
  $('#show-cart').css('background-color', '#23bca3');
  $('#show-cart').css('border', '2px solid white');
  $('#show-cart').css('border-right', 'none');
}

const cartEmptyStyle = () => {
  $('#show-cart').css('background-color', 'rgba(255, 255, 255, 0.7');
  $('#show-cart').css('border', '2px solid black');
  $('#show-cart').css('border-right', 'none');
}

const displayCart = () => {
  const sharkCart = [];
  for (var i in localStorage) {
    sharkCart.push(JSON.parse(localStorage[i])[0]);
  }
  displayCartContents(sharkCart);
}

const cartHTMLGenerator = (shark) => {
  return (
    `
    <article class='item' id='item${shark.id}' data-item-price='${shark.price}'>
      <div class='item-info'>
        <img class='item-image' alt='picture of shark' src=${shark.img_src} />
        <h2 class='item-name'>${shark.name}</h2>
      </div>
      <h3 class='item-price'>$${shark.price}</h3>
    </article>
    `
  )
}

const cartTotal = () => {
  const priceArray = [];

  if ($('.item')) {
    $('.item').each((index) => {
      const id = $('.item')[index].id;
      const price = $(`#${id}`).data('item-price');
      priceArray.push(price)
    })

    const total = priceArray.reduce((acc, price) => {
      acc = acc + price;
      return acc;
    }, 0)
    return (
      `
        <p id='cart-total' data-order-total='${total.toFixed(2)}'>TOTAL: $${total.toFixed(2)}</p>
      `
    );
  }
}

const displayCartContents = (sharkCart) => {
  sharkCart.forEach((shark) => {
    $('#show-items').append(cartHTMLGenerator(shark))
  })
  $('#show-items').append(cartTotal());
}

const showCart = () => {
  $('#cart').css('width', '50%');
  displayCart();
  $('#checkout').removeClass('hidden');
}

const hideCart = () => {
  $('#cart').css('width', '0');
  $('#show-items').empty();
}

$('#show-cart').on('click', () => {
  showCart();
})

$('#close-cart').on('click', () => {
  hideCart();
})

$('#checkout').on('click', () => {
  const total = $('#cart-total').data('order-total');
  postOrder(total);
  newOrderStyle();
  localStorage.clear();
  $('#show-items').empty();
  $('#show-items').append(`
    <div class='complete'>
      <p>Order complete!</p>
      <p>Enjoy your new imaginary shark!</p>
    </div>
  `)
  cartEmptyStyle();
  $('#checkout').addClass('hidden');
})


// ORDERS
const orderHtmlGenerator = (order) => {
  const date = order.order_date.substring(0,10);
  return (
    `
      <div class='order-display'>
        <p>ID: ${order.id}</p>
        <p>DATE: ${date}</p>
        <p>COST: ${order.total_price}</p>
      </div>
    `
  )
}

const getOrders = () => {
  return fetch('/api/v1/orders')
    .then(resp => resp.json())
    .then((orders) => {
      $('#orders-section').empty();
      displayOrders(orders);
    })
  .catch((error) => console.log('Problem retreiving orders: ', error))
}

const displayOrders = (orderArray) => {
  orderArray.forEach((order) => {
    $('#orders-section').append(orderHtmlGenerator(order))
  })
}

const postOrder = (total) => {
  const header = { "Content-Type": "application/json" };
  const body = { "total_price": `${total}` };

  return fetch('/api/v1/orders', {method: "POST", headers: header, body: JSON.stringify(body)})
    .then(resp => resp.json())
    .then(id => {
      return id
    })
  .catch(error => console.log('Error retreiving folders: ', error))
}

const newOrderStyle = () => {
  $('#show-orders').css('background-color', '#23bca3');
  $('#show-orders').css('border', '2px solid white');
  $('#show-orders').css('border-left', 'none');
}

const orderStyle = () => {
  $('#show-orders').css('background-color', 'rgba(255, 255, 255, 0.7)');
  $('#show-orders').css('border', '2px solid black');
  $('#show-orders').css('border-left', 'none');
}

const showOrders = () => {
  $('#orders').css('width', '50%');
  getOrders();
}

const hideOrders = () => {
  $('#orders').css('width', '0');
  $('#orders-section').empty();
}

$('#show-orders').on('click', () => {
  showOrders();
})

$('#close-orders').on('click', () => {
  hideOrders();
})

getSharks();
persistCartStyle();
