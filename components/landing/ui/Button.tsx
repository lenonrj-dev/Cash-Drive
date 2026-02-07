import React from 'react'
import Link from 'next/link'

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ButtonAsLink = ButtonBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type ButtonProps = ButtonAsButton | ButtonAsLink

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children } = props
  const baseStyle =
    'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-200 transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/30',
    secondary: 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 shadow-sm',
    ghost: 'bg-transparent text-teal-700 hover:text-teal-800 hover:bg-teal-50',
    outline: 'border-2 border-teal-200 text-teal-700 hover:bg-teal-50'
  }

  if ('href' in props && props.href) {
    const { href, className: _className, children: _children, ...linkProps } = props as ButtonAsLink
    return (
      <Link className={`${baseStyle} ${variants[variant]} ${className}`} href={href} {...linkProps}>
        {children}
      </Link>
    )
  }

  const { className: _className, children: _children, ...buttonProps } = props as ButtonAsButton
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...buttonProps}>
      {children}
    </button>
  )
}
