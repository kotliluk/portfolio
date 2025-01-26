import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent, ReactNode, createContext, useContext } from 'react'

import styles from './localePicker.module.scss'
import { flagIconComponents } from '../icons/flags'
import GlobeIcon from '@/components/common/icons/globe-20.svg'
import { useLocale } from '@/logic/hooks/useLocale'
import { useOnClickOutside } from '@/logic/hooks/useOnClickOutside'
import { useToggle } from '@/logic/hooks/useToggle'
import { Locale } from '@/types/locale'


type LocalePickerContextType = {
  onLocaleChange?: (oldLocale: Locale, oldPathname: string, newLocale: Locale) => string
}

export const LocalePickerContext = createContext<LocalePickerContextType>({
  onLocaleChange: undefined
})

type LocalePickerContextProviderProps = LocalePickerContextType & {
  children: ReactNode | ReactNode[]
}

export const LocalePickerContextProvider: FunctionComponent<LocalePickerContextProviderProps> = ({ onLocaleChange, children }) => {
  return (
    <LocalePickerContext.Provider value={{ onLocaleChange }}>
      {children}
    </LocalePickerContext.Provider>
  )
}

const LOCALE_PICKER_ID = 'locale-picker'

const LocalePicker: FunctionComponent = () => {
  const { locale, locales } = useLocale()
  const pathname = usePathname()
  const [opened, toggleOpened, setOpened] = useToggle(false)

  const { onLocaleChange } = useContext(LocalePickerContext)

  useOnClickOutside(LOCALE_PICKER_ID, () => setOpened(false))

  return (
    <div id={LOCALE_PICKER_ID} className={styles.picker}>
      <span className={styles.icon} onClick={toggleOpened}>
        <GlobeIcon />
      </span>
      <div className={`${styles.options} ${opened ? styles.opened : styles.closed}`}>
        {locales.map((l) => {
          const Flag = flagIconComponents[l]
          const newPathname = onLocaleChange?.(locale, pathname ?? '', l) ?? pathname ?? ''

          return (
            <Link
              key={l}
              className={styles.option}
              href={newPathname ?? ''}
              locale={l}
              onClick={() => setOpened(false)}
            >
              <Flag />
              <span>{l}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LocalePicker