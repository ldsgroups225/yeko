import { MMKV } from 'react-native-mmkv';
import { StoreEnum } from './storeEnum';

export const storage = new MMKV();

export const addStoreDataAsync = (
  key: StoreEnum,
  value: string | boolean | number | object
): void => {
  try {
    if (typeof value === 'object') {
      storage.set(key.toString(), JSON.stringify(value));
    } else {
      storage.set(key.toString(), value);
    }
  } catch (e) {
    console.error('Error saving data', e);
  }
};

export const getStoreDataAsync = (key: StoreEnum): unknown => {
  try {
    const value = storage.getString(key.toString());
    if (value !== undefined) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return null;
  } catch (e) {
    console.error('Error getting data', e);
    return null;
  }
};

export const getStoreStringAsync = (key: StoreEnum): string => {
  try {
    const value = storage.getString(key.toString());
    return value ?? '';
  } catch (e) {
    console.error('Error getting string data', e);
    return '';
  }
};

export const removeStoreDataAsync = (key: StoreEnum): void => {
  try {
    storage.delete(key.toString());
  } catch (e) {
    console.error('Error removing data', e);
  }
};
