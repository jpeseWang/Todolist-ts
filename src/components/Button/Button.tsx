import React from 'react';

interface ButtonProps {
  className: string
  children?: React.ReactNode
  type?: 'submit'
  completed?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = (props: ButtonProps): JSX.Element => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      type={props.type}
      disabled={props.completed}
    >
      {props.children}
    </button>
  );
};
