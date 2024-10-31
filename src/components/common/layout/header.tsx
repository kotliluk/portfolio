import Link from 'next/link'
import { FunctionComponent } from 'react'

import styles from './header.module.scss'
import LocalePicker from './localePicker'
import { useTranslation } from '@/logic/hooks/useTranslation'


const Header: FunctionComponent = () => {
  const { common: { navigation: t } } = useTranslation()

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}>
          Lukáš Kotlík
        </div>
        <div className={styles.links}>
          <Link href="/">{t.home}</Link>
          <Link href="/timeline">{t.timeline}</Link>
          <Link href="/about">{t.about}</Link>
          <LocalePicker />
        </div>
      </div>
    </header>
  )
}

export default Header