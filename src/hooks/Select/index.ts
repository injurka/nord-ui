import type React from 'react';
import { useMemo, useState, useEffect } from 'react';
import type { SelectOption } from '#C/Select';
import { useKeyDownListener } from '#/hooks/events';

export const useSelect = (options: SelectOption[], isFiltering: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [selected, setSelected] = useState<SelectOption | SelectOption[] | null>(null);
  const [hovered, setHovered] = useState<number>(0);

  const filteredOptions = useMemo(() => {
    setHovered(0);
    if (!isFiltering) return options;
    return options.filter((x) => x.value.toLowerCase().includes(value.toLowerCase(), 0));
  }, [value, options]);

  useKeyDownListener(({ key }) => {
    if (!isOpen) return;

    if (key === 'ArrowDown' && filteredOptions.length - 1 !== hovered) {
      setHovered(hovered + 1);
    }
    if (key === 'ArrowUp' && hovered !== 0) setHovered(hovered - 1);
    if (key === 'Enter') {
      setSelected(filteredOptions[hovered]);
      setValue(filteredOptions[hovered].value);
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (!isOpen) {
      setValue('');
    }
  }, [isOpen]);

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickOption = (option: SelectOption) => () => {
    setSelected(option);
    setValue(option.value);
    setIsOpen(false);
  };

  return {
    selected,
    hovered,
    value,
    filteredOptions,
    isOpen,
    setIsOpen,
    handleClickOption,
    handleChangeOption
  };
};
