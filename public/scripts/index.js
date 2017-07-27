const sharkHtmlGenerator = (shark) => {
  return(
    `
    <article class='shark-card' id='${shark.name}' data-price='${shark.price}'>
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
    $('#show-cart').css('background-color', '#23bca3');
    $('#show-cart').css('border', '2px solid white');
    $('#show-cart').css('border-right', 'none');
  })
}

getSharks();