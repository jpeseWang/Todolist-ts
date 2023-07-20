import React from 'react';

interface InputProps {
  className: string
  type: string
  placeholder?: string
  value?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const Input = (props: InputProps): JSX.Element => {
  return (
    <input {...props} className={props.className} type={props.type} />
  );
};
