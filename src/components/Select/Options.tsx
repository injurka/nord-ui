import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React from 'react';
import cn from 'classnames';
import type { SelectOption } from '.';
import { parse, match } from '#/utils';
import { useKeyPressListener } from '#/hooks/events';

interface OptionProps {
  options: SelectOption[];
  value: string;
  handleClickOption: (option: SelectOption) => () => void;
}

export const Options: React.FC<OptionProps> = ({ value, options, handleClickOption }) => {
  useKeyPressListener(() => {
    console.log('ad');
  });

  return (
    <TransitionGroup mode="out-in" className="select-list__options">
      {options.map((option) => {
        const matches = match(option.value, value);
        const parts = parse(option.value, matches);

        return (
          <CSSTransition
            key={option.value}
            timeout={100}
            classNames="select-list__options-transition"
            unmountOnExit
            mountOnEnter>
            <li className="select-list__options option-item" onClick={handleClickOption(option)}>
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
  );
};
