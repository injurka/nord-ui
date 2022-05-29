import type React from 'react';
import { useState } from 'react';
import type { SelectOption } from '#C/Select';

export const useSelect = (options: SelectOption[]) => {
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOption = (option: SelectOption) => () => {
    console.log('handleClickOption > ', option);
  };

  const handleKeyPress = (e: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) => {
    if (e.key === 'Enter') console.log('handleKeyPressEnter');
  };

  return { filteredOptions, isOpen, setIsOpen, handleClickOption, handleKeyPress };
};
