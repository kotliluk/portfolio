import { FunctionComponent } from "react"
import styles from './footer.module.scss'


const Footer: FunctionComponent = () => {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          Portfolio - Lukáš Kotlík
        </div>
        <div>
          &copy; Lukáš Kotlík {year}
        </div>
      </div>
    </footer>
  )
}

export default Footer