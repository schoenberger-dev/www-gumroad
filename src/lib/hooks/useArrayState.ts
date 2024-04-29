import { Dispatch, SetStateAction, useState } from 'react';

export default function useArrayState<T>(
  initialValue: Array<T>,
): [Array<T>, Dispatch<SetStateAction<T[]>>, (value: T) => void] {
  const [arrayState, setArrayState] = useState<Array<T>>(initialValue);

  function updateState(value: T) {
    setArrayState((selected) => {
      const index = selected.indexOf(value);
      if (index > -1) return selected.filter((item) => item !== value);
      return [...selected, value];
    });
  }

  return [arrayState, setArrayState, updateState];
}
