import type React from 'react';
import type { RefObject } from 'react';
import { useMemo, useState, useEffect } from 'react';
import type { Mode, OptionValue, SelectOption } from '#/components/Select/Select';
import { useKeyDownListener } from '#/hooks/events';

export const useSelect = <T extends HTMLElement | null>(
  refInput: RefObject<T>,
  filterOption: boolean,
  options: SelectOption[],
  option?: OptionValue,
  onChangeOption?: (option: OptionValue) => void,
  mode?: Mode
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [hovered, setHovered] = useState<number>(0);
  const [selected, setSelected] = useState<OptionValue>(null);

  const onChange = (newOption: OptionValue) => {
    if (onChangeOption) onChangeOption(newOption);
    else setSelected(newOption);
  };

  const filteredOptions = useMemo(() => {
    setHovered(0);
    if (!filterOption) return options;
    return options;
    // return options.filter((x) => x.value.toLowerCase().includes(value.toLowerCase(), 0));
  }, [filterOption, options]);

  useKeyDownListener(({ key }) => {
    if (!isOpen) return;

    if (key === 'ArrowDown' && filteredOptions.length - 1 !== hovered) {
      setHovered(hovered + 1);
    }
    if (key === 'ArrowUp' && hovered !== 0) setHovered(hovered - 1);
    if (key === 'Enter') {
      refInput.current?.blur();
      onChange(filteredOptions[hovered]);
      setValue(filteredOptions[hovered].value);
      setIsOpen(false);
    }
    if (key === 'Escape') {
      setIsOpen(false);
    }
  });

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickOption = (newOption: SelectOption) => () => {
    onChange(newOption);
    setValue(newOption.value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) setValue('');
  }, [isOpen]);

  return {
    selected: option || selected,
    hovered,
    value,
    filteredOptions,
    isOpen,
    setIsOpen,
    handleClickOption,
    handleChangeOption
  };
};
