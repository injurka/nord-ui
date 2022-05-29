import './Select.scss';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { forwardRef, useState } from 'react';
import cn from 'classnames';

import parse from '#/utils/parse';
import match from '#/utils/match';

//* Custom hooks
import { useSelect } from '#/hooks';

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
  ({ options, noOptionsText = 'Nothings', loading = false, loadingText = 'loading', inputSettings }, ref) => {
    const { filteredOptions, isOpen, setIsOpen, handleClickOption, handleKeyPress } = useSelect(options);

    const [term, setTerm] = useState<string>('');

    const RhandleClickOption = (option: SelectOption) => () => {
      setTerm(option.value);
    };

    return (
      <div ref={ref} className={cn('select', { open: isOpen })}>
        <div className="select-content">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder={inputSettings?.placeholder}
            className="select-content__input"
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          />
        </div>
        {isOpen ? (
          <div className="select-list">
            <div className="select-list__wrapper">
              {loading ? <div className="select-list__loading">{loadingText}</div> : null}
              {filteredOptions.length === 0 && !loading ? (
                <div className="select-list__none-options">{noOptionsText}</div>
              ) : null}
              {filteredOptions.length >= 0 && !loading ? (
                <TransitionGroup mode="out-in" className="select-list__options">
                  {options
                    .filter((x) => x.value.toLowerCase().includes(term, 0))
                    .map((option) => {
                      const matches = match(option.value, term);
                      const parts = parse(option.value, matches);

                      return (
                        <CSSTransition
                          key={option.value}
                          timeout={100}
                          classNames="select-list__options-transition"
                          unmountOnExit
                          mountOnEnter>
                          <li
                            className="select-list__options option-item"
                            onKeyPress={handleKeyPress}
                            onClick={RhandleClickOption(option)}>
                            {parts.map((part) => (
                              <span
                                key={part.text}
                                className={cn('option-item__text', {
                                  'option-item__text_highlight': part.highlight
                                })}>
                                {part.text}
                              </span>
                            ))}
                          </li>
                        </CSSTransition>
                      );
                    })}
                </TransitionGroup>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);
