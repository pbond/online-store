import { Webrequest } from '../../src/scripts/helpers/WebRequest';
import { ProductResponse } from '../../src/types/models/ProductResponse';
import { Product } from '../../src/types/models/Product';
//import fetch from 'node-fetch';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
describe('Webrequest tests', () => {
  //global.fetch = fetch as any;
  // global.fetch = jest.fn(() =>
  //   Promise.resolve({
  //     ok: true,
  //     status: 200,
  //     json: () => Promise.resolve(data),
  //   })
  // ) as jest.Mock;
  beforeEach(async () => {
    const data = await Webrequest.get<ProductResponse>('https://dummyjson.com/products?limit=100');
  });
  const product: Product = {
    id: 3,
    title: 'Samsung Universe 9',
    description: "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: 'Samsung',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
    images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
  };
  const data: ProductResponse = {
    products: [product],
  };

  it('should get products', async () => {
    const result = await Webrequest.get<ProductResponse>('https://dummyjson.com/products?limit=100');
    expect(data).toHaveProperty('products');
  });
});
