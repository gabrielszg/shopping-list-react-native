import {Product} from '../models/product';
import {storeData, retrieveData, removeData} from '../repositories/api';

export const findAllProducts = async () => {
  try {
    const response = await retrieveData();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const saveProduct = (
  products: Product[],
  product: Product,
): Product[] => {
  product.id = generateId();

  if (isQuantityEqualToZero(product.quantity)) {
    const minimumQuantity: number = 1;
    product.quantity = minimumQuantity;
  }

  const newProducts: Product[] = [...products, product];
  storeData(newProducts);
  return newProducts;
};

export const updateProduct = (
  products: Product[],
  product: Product,
  isChecked: boolean,
): Product[] => {
  const index = products.indexOf(product);
  let newArray = [...products];

  product.isChecked = isChecked;
  newArray[index] = product;
  storeData(newArray);
  return newArray;
};

export const removeProduct = (products: Product[], index: number) => {
  const product = products[index];
  products.splice(index, 1);
  const newArray = products.filter(item => item !== product);
  storeData(newArray);
  return newArray;
};

export const removeAllproducts = () => removeData();

export const normalizeQuantity = (value: unknown): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 1;
  }
  return parsed;
};

export const editProduct = async (
  products: Product[],
  updatedProduct: Product,
): Promise<Product[]> => {
  const productIndex = products.findIndex(
    item => item.id === updatedProduct.id,
  );
  if (productIndex === -1) {
    throw new Error('Produto não encontrado.');
  }

  const validQuantity = normalizeQuantity(updatedProduct.quantity);
  const validName = updatedProduct.name.trim().toUpperCase();

  const newProducts: Product[] = products.map((item, index) =>
    index === productIndex
      ? {
          ...item,
          name: validName,
          quantity: validQuantity,
        }
      : item,
  );

  await storeData(newProducts);
  return newProducts;
};

const generateId = () => Number(Math.random() * 100);

const isQuantityEqualToZero = (value: number): boolean =>
  value <= 0 ? true : false;
