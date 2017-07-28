let sharksData = [
  {
    id: 1,
    name: 'Jennifer',
    description: 'A very good shark. Enjoys basking in sunlit warm waters.',
    img_src: 'http://www.sharkcagediving.net/images/Sharks/SharkFilm300/Shark_diving02.jpg',
    price: 99.99
  },
  {
    id: 2,
    name: 'Marvin',
    description: 'A very focused shark. Slightly insecure. Will play fetch for hours.',
    img_src: 'http://r.ddmcdn.com/s_f/o_1/DSC/uploads/2016/06/reef-sharks-cd_512019.jpg',
    price: 84.99
  },
  {
    id: 3,
    name: 'Fred',
    description: 'A bit of a drama queen. Needs lots of attention but gives great advice.',
    img_src: 'http://www.sharkcagediving.net/images/Sharks/SharkFilm300/Shark_diving04.jpg',
    price: 119.99
  },
  {
    id: 4,
    name: 'Carl',
    description: 'A very mellow, laid-back kind of shark. Enjoys knock knock jokes.',
    img_src: 'http://sharkopedia.discovery.com/wp-content/uploads/2015/05/greatwhite1f-thumb.jpg',
    price: 84.99
  },
  {
    id: 5,
    name: 'Hortence',
    description: 'A friendly shark. Kind of nosy, doesn\'t understand personal space.',
    img_src: 'http://media.npr.org/assets/img/2014/09/04/ap973936852613_sq-b1c77c5d50b03c8e3be48875c9ee44d9f182177e-s300-c85.jpg',
    price: 79.99
  },
  {
    id: 6,
    name: 'Ann Marie',
    description: 'A surprising shark. Enjoys sneak attacks. Keep her well-fed.',
    img_src: 'http://www.sharkcagediving.net/images/Sharks/SharkFilm300/Shark_diving01.jpg',
    price: 109.99
  },
  {
    id: 7,
    name: 'Barry',
    description: 'Has a great personality.',
    img_src: 'http://sharkopedia.discovery.com/wp-content/uploads/2015/06/basking-shark-thumb-9.jpg',
    price: 24.99
  },
  {
    id: 8,
    name: 'Alyssa',
    description: 'A quiet shark. Thoughtful, good listener, prone to ennui.',
    img_src: 'http://fusion.ddmcdn.com/kids/uploads/survive-shark-attack-300.jpg',
    price: 94.99
  },
  {
    id: 9,
    name: 'Tyrone',
    description: 'A cuddly shark. Enjoys snacks and staring contests.',
    img_src: 'https://lh4.ggpht.com/Kk9npmGeU72K1vQBRcy4u01WMq0fbansc7sGeSW4debaBTBMU49Oss80vGwC6RJeHerK=w300',
    price: 89.99
  },
  {
    id: 10,
    name: 'Siobhan',
    description: 'A delightful shark. Energetic, enjoys splashing in the waves and eating seals.',
    img_src: 'https://storage.googleapis.com/ahead4-thegreatprojects/image-cache/s/h/a/r/k/shark-week-2017---why-these-misunderstood-marine-creatures-need-our-help-5506-300x300.jpeg',
    price: 104.99
  },
  {
    id: 11,
    name: 'Todd',
    description: 'A goofy shark. Enjoys singing. Overheats easily and prefers the cold.',
    img_src: 'http://pop.h-cdn.co/assets/cm/15/05/54cb64d29f689_-_sharkattack-300-md.jpg',
    price: 99.99
  },
  {
    id: 12,
    name: 'Vanessa',
    description: 'Very glamorous. Highly social, has all the best gossip.',
    img_src: 'https://i0.wp.com/kickassfacts.com/wp-content/uploads/2013/12/Hammerheadsharks_thumb.jpg?resize=300%2C300',
    price: 124.99
  }
]

const createItem = (knex, shark) => {
  return knex('sharks').insert({
    id: shark.id,
    name: shark.name,
    description: shark.description,
    img_src: shark.img_src,
    price: shark.price
  }, 'id')
};

exports.seed = (knex, Promise) => {
  return knex('sharks').del()
  .then(() => {
    let sharksPromises = [];

    sharksData.forEach((shark) => {
      sharksPromises.push(createItem(knex, shark));
    });

    return Promise.all(sharksPromises);
  })
  .catch(error => console.log(`Error seeding sharks data: ${error}`));
};
