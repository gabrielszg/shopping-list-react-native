import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../models/product';

export const storeData = async (productList: Product[]) => {
  try {
    await AsyncStorage.setItem('products', JSON.stringify(productList));
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message;
    }
  }
};

export const retrieveData = async () => {
  try {
    const products = await AsyncStorage.getItem('products');
    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message;
    }
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem('products');
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message;
    }
  }
};
