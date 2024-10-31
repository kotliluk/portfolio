import { FunctionComponent, ReactNode } from 'react'

import Footer from './footer'
import PageHead from './head'
import Header from './header'
import styles from './index.module.scss'
import { useTranslation } from '@/logic/hooks/useTranslation'


type LayoutProps = {
  title: string,
  exactTitle?: boolean,
  metaDescription?: string,
  children: ReactNode,
}

const Layout: FunctionComponent<LayoutProps> = ({ title, exactTitle, metaDescription, children }) => {
  const { common: t } = useTranslation()

  const titleToUse = exactTitle ? title : `${t.pageTitle} | ${title}`

  return (
    <>
      <PageHead
        title={titleToUse}
        metaDescription={metaDescription ?? titleToUse}
      />

      <Header />

      <main className={styles.pageBody}>
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout