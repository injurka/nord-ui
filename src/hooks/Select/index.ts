import type React from 'react';
import { useMemo, useState } from 'react';
import type { SelectOption } from '#C/Select';

export const useSelect = (options: SelectOption[]) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const filteredOptions = useMemo(() => {
    return options.filter((x) => x.value.toLowerCase().includes(value.toLowerCase(), 0));
  }, [value, options]);

  console.log('f', filteredOptions);

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickOption = (option: SelectOption) => () => {
    setValue(option.value);
    setIsOpen(false);
  };

  const handleKeyPress = (
    e: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLDivElement>, HTMLDivElement>
  ) => {
    console.log('handleKeyPressEnter');
    if (e.key === 'Enter') console.log('handleKeyPressEnter');
  };

  return {
    value,
    filteredOptions,
    isOpen,
    setIsOpen,
    handleClickOption,
    handleChangeOption,
    handleKeyPress
  };
};
