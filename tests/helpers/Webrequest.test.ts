import { Webrequest } from '../../src/scripts/helpers/WebRequest';
import { IProductResponse } from '../../src/types/models/IProductResponse';
import { IProduct } from '../../src/types/models/IProduct';
import fetch from 'node-fetch';

describe('Webrequest tests', () => {
  const product: IProduct = {
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
  const data: IProductResponse = {
    products: [product],
    limit: 0,
    skip: 0,
    total: 1,
  };

  it('should get Mock products', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(data),
      })
    ) as jest.Mock;
    const result = await Webrequest.get<IProductResponse>('https://dummyjson.com/products?limit=100');
    expect(result).toHaveProperty('products');
    expect(result.products[0].description).toStrictEqual(data.products[0].description);
  });

  it('should get products', async () => {
    global.fetch = fetch as never;
    const result = await Webrequest.get<IProductResponse>('https://dummyjson.com/products?limit=100');
    expect(result).toHaveProperty('products');
  }, 20000);
});
