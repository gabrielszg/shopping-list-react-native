import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../models/product';

const KEY: string = 'products';

export const storeData = async (products: Product[]) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(products));
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message;
    }
  }
};

export const retrieveData = async () => {
  try {
    return await AsyncStorage.getItem(KEY);
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message;
    }
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message;
    }
  }
};
