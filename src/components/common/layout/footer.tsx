import { FunctionComponent } from 'react'

import styles from './footer.module.scss'
import { useTranslation } from '@/logic/hooks/useTranslation'


const Footer: FunctionComponent = () => {
  const { common: t } = useTranslation()

  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          {t.pageTitle}
        </div>
        <div>
          &copy; Lukáš Kotlík {year}
        </div>
      </div>
    </footer>
  )
}

export default Footer