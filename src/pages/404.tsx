import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'

import styles from './404.module.scss'
import Layout from '@/components/common/layout'


const AUTO_REDIRECT_DELAY = 5 // in seconds

const NotFoundPage: FunctionComponent = () => {
  const [countdown, setCountdown] = useState(AUTO_REDIRECT_DELAY)
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
      router.push('/')
    }
  }, [countdown])

  return (
    <Layout title='Not found'>
      <div className={styles.body}>
        <h1>404: Page not found</h1>
        <p>Redirecting to the homepage in {countdown} seconds...</p>
      </div>
    </Layout>
  )
}

export default NotFoundPage