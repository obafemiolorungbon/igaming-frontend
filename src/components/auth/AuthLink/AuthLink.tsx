'use client'

import { memo } from 'react'
import styles from './AuthLink.module.css'
import Link from 'next/link'
import { ROUTES } from '@/config/routes'

interface AuthLinkProps {
  type: 'login' | 'register'
}

const AuthLinkComponent = ({ type }: AuthLinkProps) => {
  const isLogin = type === 'login'

  return (
    <div className={styles.container}>
      <span className={styles.text}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
      </span>
      <Link href={isLogin ? ROUTES.auth.register : ROUTES.auth.login} className={styles.link}>
        {isLogin ? 'Register now' : 'Login here'}
      </Link>
    </div>
  )
}

export const AuthLink = memo(AuthLinkComponent)
