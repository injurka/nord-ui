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
  isFiltering?: boolean;
  isHighlighted?: boolean;
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
      isHighlighted = true,
      isFiltering = true,
      inputSettings
    },
    ref
  ) => {
    const {
      value,
      filteredOptions,
      isOpen,
      setIsOpen,
      hovered,
      selected,
      handleChangeOption,
      handleClickOption
    } = useSelect(options, isFiltering);

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
      <div ref={ref} className="select">
        <div ref={refWrapper} className="select__wrapper">
          <div className={cn('select-content', { open: isOpen })}>
            <div className="select-selector">
              <input
                value={value}
                onChange={handleChangeOption}
                placeholder={!selected ? inputSettings?.placeholder : ''}
                className="select-selector__input"
                onClick={() => setIsOpen(true)}
              />
              {!value && (
                <span className="select-selector__placeholder">
                  {(selected as SelectOption)?.value}
                </span>
              )}
            </div>
            <div className={cn('select-chevron', { open: isOpen })}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M12 14.7 6.7 9.4 7.4 8.675 12 13.275 16.6 8.675 17.3 9.4Z" />
              </svg>
            </div>
          </div>
          {isOpen ? (
            <div className="select-list">
              <div className="select-list__wrapper">
                {loading ? (
                  <div className="select-list__options">
                    <div className="select-list__options option-item">
                      <span className="option-item__loading">{loadingText}</span>
                    </div>
                  </div>
                ) : null}
                {filteredOptions.length === 0 && !loading ? (
                  <div className="select-list__options">
                    <div className="select-list__options option-item">
                      <span className="option-item__none">{noOptionsText}</span>
                    </div>
                  </div>
                ) : null}
                {filteredOptions.length >= 0 && !loading ? (
                  <Options
                    options={filteredOptions}
                    hovered={hovered}
                    selected={selected}
                    value={value}
                    isHighlighted={isHighlighted}
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
