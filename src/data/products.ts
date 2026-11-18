export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  price1L: number;
  price3L: number;
}

export const products: Product[] = [
  {
    id: 'lypovyi',
    name: 'Липовий мед',
    shortDesc: 'Насичений мед з яскравим ароматом липового цвіту й виразним смаком із легкою пікантністю.',
    price1L: 380,
    price3L: 1100,
  },
  {
    id: 'sonyashnykovy',
    name: 'Соняшниковий мед',
    shortDesc: 'Золотисто-жовтий, м\'який і солодкий. Швидко густішає — це природна кристалізація.',
    price1L: 300,
    price3L: 840,
  },
  {
    id: 'riznotravya',
    name: 'Мед з різнотрав\'я',
    shortDesc: 'Універсальний мед з нектару лугових трав і квітів. Смак і відтінок залежать від того, що цвіло.',
    price1L: 340,
    price3L: 920,
  },
];
