import { Link } from 'react-router-dom'
import React from 'react'
import classNames from 'classnames'
import style from './style.module.scss'

interface Props {
  to: string
  label: string
  className?: string
}

const NavigationButton: React.FC<Props> = ({
  to,
  label,
  className
}) => {
  return (
    <Link className={classNames(style.link, className)} to={to} >
      {label}
    </Link>
  )
}

NavigationButton.displayName = 'NavigationButton'

export default NavigationButton
