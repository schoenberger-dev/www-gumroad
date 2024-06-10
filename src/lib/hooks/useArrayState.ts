import { Dispatch, SetStateAction, useState } from 'react';

export default function useArrayState<T>(
  initialValue: Array<T>,
): [
  Array<T>,
  Dispatch<SetStateAction<T[]>>,
  (value: T, identifier?: string) => void,
] {
  const [arrayState, setArrayState] = useState<Array<T>>(initialValue);

  function updateState(value: T, identifier?: string) {
    let action: 'added' | 'removed' = 'added';

    setArrayState((selected) => {
      const index = !!identifier
        ? selected.findIndex(
            (i: T) => i[identifier as keyof T] === value[identifier as keyof T],
          )
        : selected.indexOf(value);
      if (index > -1) {
        action = 'removed';
        return selected.filter((item: T) =>
          !!identifier
            ? item[identifier as keyof T] !== value[identifier as keyof T]
            : item !== value,
        );
      }

      action = 'added';
      return [...selected, value];
    });

    return action;
  }

  return [arrayState, setArrayState, updateState];
}
