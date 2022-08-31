import React, { InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import style from './style.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'number'
}

const Input: React.FC<Props> = ({
  type,
  className,
  ...rest
}) => {
  return (
    <input className={classNames(style.input, className)} type={type} {...rest}/>
  )
}

Input.displayName = 'Input'

export default Input
