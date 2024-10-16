import Link from "next/link"
import { FunctionComponent } from "react"
import LocalePicker from "./localePicker"
import styles from './header.module.scss'


const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}>
          Portfolio - Lukáš Kotlík
        </div>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/timeline">Timeline</Link>
          <Link href="/about">About</Link>
          <LocalePicker />
        </div>
      </div>
    </header>
  )
}

export default Header