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
  const baseStyle = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-200 transform active:scale-95'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30',
    secondary: 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 shadow-sm',
    ghost: 'bg-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50',
    outline: 'border-2 border-white text-white hover:bg-white/10'
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
