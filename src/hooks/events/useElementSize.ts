import { useCallback, useLayoutEffect, useState } from 'react';

import useEventListener from './useEventListener';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

interface Size {
  width: number;
  height: number;
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(
  refInitial?: React.RefObject<T>
): [Size, (node: T | null) => void] {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0
  });

  const handleSize = useCallback(() => {
    setSize({
      width: ref?.getBoundingClientRect().width || 0,
      height: ref?.getBoundingClientRect().height || 0
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  useEventListener('resize', handleSize);

  useLayoutEffect(() => {
    setRef(refInitial?.current || null);
  }, []);

  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  return [size, setRef];
}

export default useElementSize;
