import { FunctionComponent, ReactNode } from 'react'

import Footer from './footer'
import PageHead from './head'
import Header from './header'
import styles from './index.module.scss'
import { LocalePickerContextProvider } from './localePicker'
import { useTranslation } from '@/logic/hooks/useTranslation'
import { Locale } from '@/types/locale'


type LayoutProps = {
  title: string,
  exactTitle?: boolean,
  metaDescription?: string,
  onLocaleChange?: (oldLocale: Locale, oldPathname: string, newLocale: Locale) => string,
  children: ReactNode,
}

const Layout: FunctionComponent<LayoutProps> = ({ title, exactTitle, metaDescription, onLocaleChange, children }) => {
  const { common: t } = useTranslation()

  const titleToUse = exactTitle ? title : `${t.pageTitle} | ${title}`

  return (
    <LocalePickerContextProvider onLocaleChange={onLocaleChange}>
      <PageHead
        title={titleToUse}
        metaDescription={metaDescription ?? titleToUse}
      />

      <Header />

      <main className={styles.pageBody}>
        {children}
      </main>

      <Footer />
    </LocalePickerContextProvider>
  )
}

export default Layout