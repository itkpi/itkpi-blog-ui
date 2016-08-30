import { range } from 'utils/collection';

const article = {
  image: 'https://pp.vk.me/c7008/v7008296/4ad29/mO7ls1KcejQ.jpg',
  postedAt: 1472159478703,
  title: 'DeltaMaker – The new kid on the block. An Elegant 3D Printer and a new wicked',
  description: 'Products were inspired by Behance\'s research of especially productive teams in the creative industry. Hundreds of individuals and teams were interviewed, and Behance chronicled the work habits and best practices of creative leaders. Products were inspired by Behances research of especially productive teams in the creative industry.',
  author: {
    firstName: 'Ольга',
    lastName: 'Власова',
    image: 'https://pp.vk.me/c7008/v7008296/4ad29/mO7ls1KcejQ.jpg',
  }
};

export default [...range(0, 10)].reduce(acc => [...acc, article], []);
