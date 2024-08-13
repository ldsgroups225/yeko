import {
  addStoreDataAsync,
  getStoreDataAsync,
  getStoreStringAsync,
  removeStoreDataAsync,
  storage,
} from './index';
import { StoreEnum } from './storeEnum';

jest.mock('react-native-mmkv', () => {
  const MMKVMock = {
    set: jest.fn(),
    getString: jest.fn(),
    getBoolean: jest.fn(),
    delete: jest.fn(),
  };
  return { MMKV: jest.fn(() => MMKVMock) };
});

describe('Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addStoreDataAsync', () => {
    it('should store string data in MMKV', () => {
      const key = StoreEnum.ColorMode;
      const value = 'light';

      addStoreDataAsync(key, value);

      expect(storage.set).toHaveBeenCalledWith(key.toString(), value);
    });

    it('should stringify and store object data in MMKV', () => {
      const key = StoreEnum.User;
      const value = { id: 1, name: 'John Doe' };

      addStoreDataAsync(key, value);

      expect(storage.set).toHaveBeenCalledWith(key.toString(), JSON.stringify(value));
    });

    it('should handle errors when saving data', () => {
      const key = StoreEnum.Token;
      const value = 'testToken';

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (storage.set as jest.Mock).mockImplementation(() => {
        throw new Error('Mock error');
      });

      addStoreDataAsync(key, value);

      expect(consoleSpy).toHaveBeenCalledWith('Error saving data', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('getStoreDataAsync', () => {
    it('should retrieve and parse stored JSON data', () => {
      const key = StoreEnum.User;
      const storedValue = JSON.stringify({ id: 1, name: 'John Doe' });
      (storage.getString as jest.Mock).mockReturnValue(storedValue);

      const result = getStoreDataAsync(key);

      expect(storage.getString).toHaveBeenCalledWith(key.toString());
      expect(result).toEqual({ id: 1, name: 'John Doe' });
    });

    it('should return null for non-existent data', () => {
      const key = StoreEnum.Token;
      (storage.getString as jest.Mock).mockReturnValue(undefined);

      const result = getStoreDataAsync(key);

      expect(storage.getString).toHaveBeenCalledWith(key.toString());
      expect(result).toBeNull();
    });

    it('should handle errors when getting data', () => {
      const key = StoreEnum.ColorMode;
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (storage.getString as jest.Mock).mockImplementation(() => {
        throw new Error('Mock error');
      });

      const result = getStoreDataAsync(key);

      expect(consoleSpy).toHaveBeenCalledWith('Error getting data', expect.any(Error));
      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe('getStoreStringAsync', () => {
    it('should retrieve stored string data', () => {
      const key = StoreEnum.ColorMode;
      const storedValue = 'dark';
      (storage.getString as jest.Mock).mockReturnValue(storedValue);

      const result = getStoreStringAsync(key);

      expect(storage.getString).toHaveBeenCalledWith(key.toString());
      expect(result).toBe(storedValue);
    });

    it('should return an empty string for non-existent data', () => {
      const key = StoreEnum.Token;
      (storage.getString as jest.Mock).mockReturnValue(undefined);

      const result = getStoreStringAsync(key);

      expect(storage.getString).toHaveBeenCalledWith(key.toString());
      expect(result).toBe('');
    });

    it('should handle errors when getting string data', () => {
      const key = StoreEnum.User;
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (storage.getString as jest.Mock).mockImplementation(() => {
        throw new Error('Mock error');
      });

      const result = getStoreStringAsync(key);

      expect(consoleSpy).toHaveBeenCalledWith('Error getting string data', expect.any(Error));
      expect(result).toBe('');
      consoleSpy.mockRestore();
    });
  });

  describe('removeStoreDataAsync', () => {
    it('should remove data from MMKV', () => {
      const key = StoreEnum.Token;

      removeStoreDataAsync(key);

      expect(storage.delete).toHaveBeenCalledWith(key.toString());
    });

    it('should handle errors when removing data', () => {
      const key = StoreEnum.User;
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (storage.delete as jest.Mock).mockImplementation(() => {
        throw new Error('Mock error');
      });

      removeStoreDataAsync(key);

      expect(consoleSpy).toHaveBeenCalledWith('Error removing data', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });
});
