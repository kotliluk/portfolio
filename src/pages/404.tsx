import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'

import styles from './404.module.scss'
import Layout from '@/components/common/layout'
import { placeholder, replacePlaceholders } from '@/logic/utils/string'


type NotFoundPageProps = {
  redirectTo?: string
  redirectIn?: number
  title?: string
  text?: string // with countdown placeholder
}

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({
  redirectTo = '/',
  redirectIn = 5,
  title = '404: Page not found',
  text = `Redirecting to the homepage in ${placeholder('countdown')} seconds...`,
}) => {
  const [countdown, setCountdown] = useState(redirectIn)
  const router = useRouter()

  useEffect(() => {
    const countdownIntervalId = setInterval(() => {
      setCountdown((v) => v - 1)
    }, 1000)

    return () => {
      clearInterval(countdownIntervalId)
    }
  }, [setCountdown])

  useEffect(() => {
    if (countdown === 0) {
      setCountdown(-1)
      router.push(redirectTo)
    }
  }, [countdown, redirectTo])

  return (
    <Layout title='Not found'>
      <div className={styles.body}>
        <h1>{title}</h1>
        <p>{replacePlaceholders(text, { countdown: countdown > 0 ? countdown : 1 })}</p>
      </div>
    </Layout>
  )
}

export default NotFoundPage