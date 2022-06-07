import './Select.scss';

import React, { createRef, forwardRef, useRef } from 'react';
import cn from 'classnames';

//* Component
import { Options } from './Options';

//* Custom hooks
import { useSelect } from '#/hooks';
import { useElementSize, useOutsideClick } from '#/hooks/events';

//* Interfaces
type SelectValue = string;
export type Mode = 'single' | 'multiple' | 'tags';
export type OptionValue = SelectOption | SelectOption[] | null;

export interface SelectOption {
  label?: string;
  value: SelectValue;
}

export interface SelectProps {
  mode?: Mode;
  option?: OptionValue;
  onChange?: (option: OptionValue) => void;
  onSearch?: (value: SelectValue) => void;
  options: SelectOption[];
  noOptionsContent?: React.ReactNode;
  filterOption?: boolean;
  isHighlighted?: boolean;
  loading?: boolean;
  placeholder?: string;
  focusable?: boolean;
}

//* Button ----------------------------------------------------------------- *//
export const Select = forwardRef((props: SelectProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    option,
    onChange,
    onSearch,
    mode = 'single',
    options,
    noOptionsContent = <span>Not found</span>,
    loading = false,
    isHighlighted = true,
    filterOption = true,
    placeholder = '',
    focusable = false
  } = props;

  const refInput = createRef<HTMLInputElement>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [{ height }] = useElementSize(wrapperRef);

  const {
    value,
    filteredOptions,
    isOpen,
    setIsOpen,
    hovered,
    selected,
    isMutiply,
    handleRemoveOption,
    handleChangeOption,
    handleClickOption
  } = useSelect(refInput, filterOption, options, option, onChange, onSearch, mode);

  useOutsideClick(wrapperRef, () => setIsOpen(false), 'mousedown');

  return (
    <div ref={ref} className="select">
      <div ref={wrapperRef} className="select__wrapper">
        <div
          onClick={() => {
            setIsOpen(true);
            refInput.current?.focus();
          }}
          className={cn('select-content', { open: isOpen })}
          role="list">
          <div className="select-selector">
            {!isMutiply ? (
              <div className="select-selector__search search-content">
                <input
                  ref={refInput}
                  autoFocus={focusable}
                  value={value}
                  onChange={handleChangeOption}
                  placeholder={!selected ? placeholder : ''}
                  className="search-content__input"
                />
                {!value && (
                  <span className="search-content__placeholder">
                    {(selected as SelectOption)?.value}
                  </span>
                )}
              </div>
            ) : (
              <div className="select-selector__overflow overflow-content">
                {(selected as SelectOption[]).map((val) => {
                  return (
                    <div
                      onClick={(e) => {
                        handleRemoveOption(val);
                        e.stopPropagation();
                      }}
                      key={val.value}
                      className="overflow-content__item">
                      <div className="overflow-content__wrapper">
                        <span>{val.value}</span>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                            <path d="M5.375 15.271 4.729 14.625 9.354 10 4.729 5.375 5.375 4.729 10 9.354 14.625 4.729 15.271 5.375 10.646 10 15.271 14.625 14.625 15.271 10 10.646Z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="overflow-content__item">
                  <input
                    ref={refInput}
                    autoFocus={focusable}
                    value={value}
                    onChange={handleChangeOption}
                    placeholder={placeholder || ''}
                    className="overflow-content__input"
                  />
                </div>
              </div>
            )}
          </div>
          <div className={cn('select-chevron', { open: isOpen })}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="M12 14.7 6.7 9.4 7.4 8.675 12 13.275 16.6 8.675 17.3 9.4Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="M12 14.7 6.7 9.4 7.4 8.675 12 13.275 16.6 8.675 17.3 9.4Z" />
            </svg>
          </div>
        </div>
        {isOpen ? (
          <div style={{ top: `${(height || 35) + 5}px` }} className="select-list">
            <div className="select-list__wrapper">
              {loading ? (
                <div className="select-list__options">
                  <div className="select-list__options option-item">
                    <div className="option-item__loading">
                      <div className="spinner">
                        <span className="spinner-inner-1" />
                        <span className="spinner-inner-2" />
                        <span className="spinner-inner-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {filteredOptions.length === 0 && !loading ? (
                <div className="select-list__options">
                  <div className="select-list__options option-item">
                    <div className="option-item__none">{noOptionsContent}</div>
                  </div>
                </div>
              ) : null}
              {filteredOptions.length >= 0 && !loading ? (
                <Options
                  isMutiply={isMutiply}
                  isHighlighted={isHighlighted}
                  options={filteredOptions}
                  hovered={hovered}
                  selected={selected}
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
});
