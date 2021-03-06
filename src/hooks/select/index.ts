import type React from 'react';
import type { RefObject } from 'react';
import { useMemo, useState, useEffect } from 'react';
import type { Mode, OptionValue, SelectOption, SelectValue } from '#/components/select/Select';
import { useKeyDownListener } from '#/hooks/events';

//* - USE SELECT HOOK ------------------------------------------------------------------------- *//
export const useSelect = <T extends HTMLElement | null>(
  refInput: RefObject<T>,
  filterOption: boolean,
  options: SelectOption[],
  option: OptionValue,
  onChange: (option: OptionValue) => void,
  onSearch?: (value: SelectValue) => void,
  mode?: Mode
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<SelectValue>('');
  const [hovered, setHovered] = useState<number>(0);

  const isMutiply = useMemo(() => mode === 'multiple' || mode === 'tags', [mode]);

  const filteredOptions = useMemo(() => {
    setHovered(0);
    if (!filterOption) return options;
    return options.filter((x) =>
      x.value.toString().toLowerCase().includes(value.toString().toLowerCase(), 0)
    );
  }, [filterOption, options, value]);

  const onChangeOption = (newOption: OptionValue) => onChange(newOption);

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) onSearch(e.target.value);
    setValue(e.target.value);
  };

  const handleClearOption = (e: React.MouseEvent<unknown>) => {
    e.stopPropagation();
    onChangeOption(null);
    setValue('');
    setIsOpen(false);
  };

  const handleRemoveOption = (targetOption: OptionValue) => {
    onChangeOption(
      isMutiply
        ? [...((option as SelectOption[]) || []).filter((x) => x !== targetOption)]
        : targetOption
    );
  };

  const handleClickOption = (newOption: SelectOption) => {
    if (isMutiply) {
      if (((option || []) as SelectOption[]).find((x) => x === newOption)) {
        handleRemoveOption(newOption);
        setIsOpen(false);
        return;
      }

      onChangeOption([newOption, ...((option || []) as SelectOption[])]);
    } else onChangeOption(newOption);

    onChangeOption(isMutiply ? [newOption, ...((option || []) as SelectOption[])] : newOption);
    setValue(newOption.value);
    setIsOpen(false);
  };

  useKeyDownListener(({ key }) => {
    if (!isOpen && key === 'Enter') setIsOpen(true);
    if (!isOpen || !filteredOptions?.length) return;

    if (key === 'ArrowDown' && filteredOptions.length - 1 !== hovered) {
      setHovered(hovered + 1);
    }
    if (key === 'ArrowUp' && hovered !== 0) setHovered(hovered - 1);
    if (key === 'Enter') {
      refInput.current?.blur();
      handleClickOption(filteredOptions[hovered]);
    }
    if (key === 'Escape') {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (!isOpen) setValue('');
  }, [isOpen]);

  return {
    isMutiply,
    selected: option,
    hovered,
    value,
    filteredOptions,
    isOpen,
    setIsOpen,
    handleClearOption,
    handleRemoveOption,
    handleClickOption,
    handleChangeOption
  };
};
