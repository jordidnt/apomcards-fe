import {useState, useEffect} from 'react';

export const useTimer = (length: number, active: boolean) => {
  const [timer, setTimer] = useState(length);

  useEffect(() => {
    if (timer === 0) {
        return;
    }
    const ref = setTimeout(() => active && setTimer(timer - 1), 1000);
    return () => {
        clearTimeout(ref);
    }
  }, [active, timer]);

  return timer;
};
