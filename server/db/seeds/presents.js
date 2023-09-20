/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('presents').del()
  await knex('presents').insert([
    {
      present_name: 'Scented Candle',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Candle.jpg/800px-Candle.jpg',
    },
    {
      present_name: 'Coffee Mug',
      image_url:
        'https://www.knoxengravers.co.nz/wp-content/uploads/2022/11/Coffee-Friends.jpg',
    },
    {
      present_name: 'Board Game',
      image_url: 'https://media.timeout.com/images/105627949/image.jpg',
    },
    {
      present_name: 'Headphones',
      image_url:
        'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch520_Primary_image?$categorypdpnav$&fmt=png-alpha',
    },
    {
      present_name: 'Socks',
      image_url:
        'https://raven.contrado.app/resources/images/2022-10/207368/personalised-christmas-socks1508252_l.jpg?w=700&h=700&auto=format&fit=crop',
    },
  ])
}
