import { useLocale } from "@/logic/hooks/useLocale"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FunctionComponent } from "react"
import styles from './localePicker.module.scss'
import { useToggle } from "@/logic/hooks/useToggle"
import { useOnClickOutside } from "@/logic/hooks/useOnClickOutside"


const LOCALE_PICKER_ID = 'locale-picker'

const LocalePicker: FunctionComponent = () => {
  const { locale, locales } = useLocale()
  const pathname = usePathname()
  const [opened, toggleOpened, setOpened] = useToggle(false)

  useOnClickOutside(LOCALE_PICKER_ID, () => setOpened(false))

  return (
    <div id={LOCALE_PICKER_ID} className={styles.picker}>
      <span className={styles.icon} onClick={toggleOpened}>{locale}</span>
      <div className={`${styles.options} ${opened ? styles.opened : styles.closed}`}>
        {locales.map((l) => (
          <Link
            key={l}
            className={styles.option}
            href={pathname}
            locale={l}
          >
            {l}
          </Link>
        ))}
      </div>
    </div>
  );
}
 
export default LocalePicker;