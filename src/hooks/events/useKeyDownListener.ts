import useEventListener from './useEventListener';

type Handler = (event: KeyboardEvent) => void;

const useKeyDownListener = (handler: Handler): void => {
  useEventListener('keydown', handler);
};

export default useKeyDownListener;
