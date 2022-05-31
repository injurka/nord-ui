import './Select.scss';

import React, { createRef, forwardRef } from 'react';
import cn from 'classnames';

//* Component
import { Options } from './Options';

//* Custom hooks
import { useSelect } from '#/hooks';
import { useOutsideClick } from '#/hooks/events';

//* Interfaces
export interface SelectOption {
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  noOptionsText?: string;
  loading?: boolean;
  loadingText?: string;
  inputSettings?: { placeholder?: string };
  // children?: ReactNode;
  // renderInput: (params: any) => ReactNode;
}

//* Button ----------------------------------------------------------------- *//
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      noOptionsText = 'Nothings',
      loading = false,
      loadingText = 'loading',
      inputSettings
    },
    ref
  ) => {
    const {
      value,
      filteredOptions,
      isOpen,
      setIsOpen,
      handleKeyPress,
      handleChangeOption,
      handleClickOption
    } = useSelect(options);

    const refWrapper = createRef<HTMLInputElement>();
    useOutsideClick(
      refWrapper,
      () => {
        console.log('closed');
        setIsOpen(false);
      },
      'mousedown'
    );

    return (
      <div ref={ref} className={cn('select', { open: isOpen })}>
        <div ref={refWrapper} className="select__wrapper">
          <div className="select-content">
            <input
              value={value}
              onChange={handleChangeOption}
              placeholder={inputSettings?.placeholder}
              className="select-content__input"
              onClick={() => setIsOpen(true)}
            />
          </div>
          {isOpen ? (
            <div role="listitem" onKeyPress={handleKeyPress} className="select-list">
              <div className="select-list__wrapper">
                {loading ? <div className="select-list__loading">{loadingText}</div> : null}
                {filteredOptions.length === 0 && !loading ? (
                  <div className="select-list__none-options">{noOptionsText}</div>
                ) : null}
                {filteredOptions.length >= 0 && !loading ? (
                  <Options
                    options={filteredOptions}
                    value={value}
                    handleClickOption={handleClickOption}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
