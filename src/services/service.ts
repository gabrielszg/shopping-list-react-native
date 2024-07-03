import {Product} from '../models/product';
import {storeData, retrieveData, removeData} from '../repositories/api';

export const findAllProducts = async () => {
  try {
    const response = await retrieveData();
    return response;
  } catch (error) {
    throw error;
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

const generateId = () => Number(Math.random() * 100);

const isQuantityEqualToZero = (value: number): boolean =>
  value <= 0 ? true : false;
