import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React from 'react';
import cn from 'classnames';
import type { SelectOption } from '.';
import { parse, match } from '#/utils';

interface OptionProps {
  isHighlighted: boolean;
  options: SelectOption[];
  hovered: number;
  selected: SelectOption | SelectOption[] | null;
  value: string;
  handleClickOption: (option: SelectOption) => () => void;
}

export const Options: React.FC<OptionProps> = ({
  isHighlighted,
  value,
  hovered,
  selected,
  options,
  handleClickOption
}) => {
  return (
    <TransitionGroup mode="out-in" className="select-list__options">
      {options.map((option, key) => {
        return (
          <CSSTransition
            key={option.value}
            timeout={100}
            classNames="select-list__options-transition"
            unmountOnExit
            mountOnEnter>
            <li
              className={cn('select-list__options option-item', {
                hovered: key === hovered,
                selected: selected === option
              })}
              onClick={handleClickOption(option)}>
              {isHighlighted ? (
                parse(option.value, match(option.value, value)).map((part) => (
                  <span
                    key={part.text}
                    className={cn('option-item__text', {
                      'option-item__text_highlight': part.highlight
                    })}>
                    {part.text}
                  </span>
                ))
              ) : (
                <span key={option.value} className="option-item__text">
                  {option.value}
                </span>
              )}
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};
