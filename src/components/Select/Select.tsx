// import './Select.scss';

// import React, { createRef, forwardRef } from 'react';
// import cn from 'classnames';

// //* Component
// import { Options } from './Options';

// //* Custom hooks
// import { useSelect } from '#/hooks';
// import { useOutsideClick } from '#/hooks/events';

// //* Interfaces
// type SelectValue = string;
// export type Mode = 'single' | 'multiple';
// export type OptionValue = SelectOption | SelectOption[] | null;

// export interface SelectOption {
//   value: SelectValue;
// }

// export interface SelectProps {
//   mode?: Mode;
//   option?: OptionValue;
//   SSS?: (option: OptionValue) => void;
//   options: SelectOption[];
//   noOptionsContent?: React.ReactNode;
//   filterOption?: boolean;
//   isHighlighted?: boolean;
//   loading?: boolean;
//   inputSettings?: { placeholder?: string; focusable?: boolean };
// }

// //* Button ----------------------------------------------------------------- *//
// export const Select = forwardRef<HTMLDivElement, SelectProps>(
//   (
//     {
//       option,
//       SSS: onChange,
//       mode,
//       options,
//       noOptionsContent = <span>Not found</span>,
//       loading = false,
//       isHighlighted = true,
//       filterOption = true,
//       inputSettings = {
//         placeholder: '',
//         focusable: false
//       }
//     },
//     ref
//   ) => {
//     const refWrapper = createRef<HTMLDivElement>();
//     const refInput = createRef<HTMLInputElement>();

//     const {
//       value,
//       filteredOptions,
//       isOpen,
//       setIsOpen,
//       hovered,
//       selected,
//       handleChangeOption,
//       handleClickOption
//     } = useSelect(refInput, filterOption, options, option, undefined, mode);

//     console.log('onChangeOptions', typeof onChange);

//     useOutsideClick(
//       refWrapper,
//       () => {
//         setIsOpen(false);
//       },
//       'mousedown'
//     );

//     return (
//       <div ref={ref} className="select">
//         <div ref={refWrapper} className="select__wrapper">
//           <div
//             onClick={() => {
//               setIsOpen(true);
//               refInput.current?.focus();
//             }}
//             className={cn('select-content', { open: isOpen })}
//             role="list">
//             <div className="select-selector">
//               <input
//                 ref={refInput}
//                 autoFocus={inputSettings.focusable}
//                 value={value}
//                 onChange={handleChangeOption}
//                 placeholder={!selected ? inputSettings?.placeholder : ''}
//                 className="select-selector__input"
//               />
//               {!value && (
//                 <span className="select-selector__placeholder">
//                   {(selected as SelectOption)?.value}
//                 </span>
//               )}
//             </div>
//             <div className={cn('select-chevron', { open: isOpen })}>
//               <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
//                 <path d="M12 14.7 6.7 9.4 7.4 8.675 12 13.275 16.6 8.675 17.3 9.4Z" />
//               </svg>
//             </div>
//           </div>
//           {isOpen ? (
//             <div className="select-list">
//               <div className="select-list__wrapper">
//                 {loading ? (
//                   <div className="select-list__options">
//                     <div className="select-list__options option-item">
//                       <div className="option-item__loading">
//                         <div className="spinner">
//                           <span className="spinner-inner-1" />
//                           <span className="spinner-inner-2" />
//                           <span className="spinner-inner-3" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : null}
//                 {filteredOptions.length === 0 && !loading ? (
//                   <div className="select-list__options">
//                     <div className="select-list__options option-item">
//                       <div className="option-item__none">{noOptionsContent}</div>
//                     </div>
//                   </div>
//                 ) : null}
//                 {filteredOptions.length >= 0 && !loading ? (
//                   <Options
//                     options={filteredOptions}
//                     hovered={hovered}
//                     selected={selected}
//                     value={value}
//                     isHighlighted={isHighlighted}
//                     handleClickOption={handleClickOption}
//                   />
//                 ) : null}
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     );
//   }
// );

import './Select.scss';

import React, { createRef, forwardRef } from 'react';
import cn from 'classnames';

//* Component
import { Options } from './Options';

//* Custom hooks
import { useSelect } from '#/hooks';
import { useOutsideClick } from '#/hooks/events';

//* Interfaces
type SelectValue = string;
export type Mode = 'single' | 'multiple';
export type OptionValue = SelectOption | SelectOption[] | null;

export interface SelectOption {
  value: SelectValue;
}

export interface BaseSelectRef {
  focus: () => void;
  blur: () => void;
}

export interface SelectProps {
  mode?: Mode;
  option?: OptionValue;
  onChange?: (option: OptionValue) => void;
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
    mode,
    options,
    noOptionsContent = <span>Not found</span>,
    loading = false,
    isHighlighted = true,
    filterOption = true,
    placeholder = '',
    focusable = false
  } = props;

  const refWrapper = createRef<HTMLDivElement>();
  const refInput = createRef<HTMLInputElement>();

  const {
    value,
    filteredOptions,
    isOpen,
    setIsOpen,
    hovered,
    selected,
    handleChangeOption,
    handleClickOption
  } = useSelect(refInput, filterOption, options, option, onChange, mode);

  console.log('onChangeOptions', onChange);

  useOutsideClick(
    refWrapper,
    () => {
      setIsOpen(false);
    },
    'mousedown'
  );

  return (
    <div ref={ref} className="select">
      <div ref={refWrapper} className="select__wrapper">
        <div
          onClick={() => {
            setIsOpen(true);
            refInput.current?.focus();
          }}
          className={cn('select-content', { open: isOpen })}
          role="list">
          <div className="select-selector">
            <input
              ref={refInput}
              autoFocus={focusable}
              value={value}
              onChange={handleChangeOption}
              placeholder={!selected ? placeholder : ''}
              className="select-selector__input"
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
});
