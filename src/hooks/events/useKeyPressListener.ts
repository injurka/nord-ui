import useEventListener from './useEventListener';

type Handler = (event: KeyboardEvent) => void;

const useKeyPressListener = (handler: Handler): void => {
  useEventListener('keypress', handler);
};

export default useKeyPressListener;
