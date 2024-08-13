import Routes from '@utils/Routes';
import { goBack, navigate, navigationRef, pop, push } from './index';

jest.mock('@react-navigation/native', () => ({
  createNavigationContainerRef: jest.fn(() => ({
    isReady: jest.fn(),
    current: {
      dispatch: jest.fn(),
      navigate: jest.fn(),
      goBack: jest.fn(),
    },
  })),
  StackActions: {
    push: jest.fn((name, params) => ({ name, params })),
    pop: jest.fn((count) => ({ count })),
  },
}));

describe('Navigation Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (navigationRef.isReady as jest.Mock).mockReturnValue(true);
  });

  describe('push', () => {
    it('should call navigationRef.current?.dispatch with the provided route name', () => {
      const name = Routes.Home;
      push(name);
      expect(navigationRef.isReady).toHaveBeenCalled();
      expect(navigationRef.current?.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ name })
      );
    });

    it('should not dispatch if navigationRef is not ready', () => {
      (navigationRef.isReady as jest.Mock).mockReturnValue(false);
      push(Routes.Home);
      expect(navigationRef.current?.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('pop', () => {
    it('should call navigationRef.current?.dispatch with the provided count', () => {
      const count = 2;
      pop(count);
      expect(navigationRef.isReady).toHaveBeenCalled();
      expect(navigationRef.current?.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ count })
      );
    });

    it('should not dispatch if navigationRef is not ready', () => {
      (navigationRef.isReady as jest.Mock).mockReturnValue(false);
      pop(1);
      expect(navigationRef.current?.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('navigate', () => {
    it('should call navigationRef.current?.navigate with the provided route name', () => {
      const name = 'Home';
      navigate(name);
      expect(navigationRef.isReady).toHaveBeenCalled();
      expect(navigationRef.current?.navigate).toHaveBeenCalledWith(name, undefined);
    });

    it('should not navigate if navigationRef is not ready', () => {
      (navigationRef.isReady as jest.Mock).mockReturnValue(false);
      navigate('Home');
      expect(navigationRef.current?.navigate).not.toHaveBeenCalled();
    });
  });

  describe('goBack', () => {
    it('should call navigationRef.current?.goBack', () => {
      goBack();
      expect(navigationRef.isReady).toHaveBeenCalled();
      expect(navigationRef.current?.goBack).toHaveBeenCalled();
    });

    it('should not call goBack if navigationRef is not ready', () => {
      (navigationRef.isReady as jest.Mock).mockReturnValue(false);
      goBack();
      expect(navigationRef.current?.goBack).not.toHaveBeenCalled();
    });
  });
});
