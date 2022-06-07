import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React from 'react';
import cn from 'classnames';
import type { OptionValue, SelectOption } from './Select';
import { parse, match } from '#/utils';

interface OptionProps {
  isMutiply: boolean;
  isHighlighted: boolean;
  options: SelectOption[];
  hovered: number;
  selected: OptionValue;
  value: string;
  handleClickOption: (option: SelectOption) => void;
}

export const Options: React.FC<OptionProps> = ({
  isMutiply,
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
            timeout={150}
            classNames="select-list__options-transition"
            unmountOnExit
            mountOnEnter>
            <li
              className={cn('select-list__options option-item', {
                hovered: key === hovered,
                selected: isMutiply
                  ? ((selected || []) as SelectOption[]).find((x) => x === option)
                  : selected === option
              })}
              onClick={() => handleClickOption(option)}>
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
