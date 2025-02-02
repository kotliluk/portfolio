import Link from 'next/link'
import { useState } from 'react'

import styles from './index.module.scss'
import Layout from '@/components/common/layout'
import SignpostArrow from '@/components/home/SignpostArrow'
import { useTranslation } from '@/logic/hooks/useTranslation'
import { classNames } from '@/logic/utils/css'


export default function Home() {
  const { home: t } = useTranslation()

  const [arrowDirection, setArrowDirection] = useState<'left' | 'right' | 'no'>('no')

  return (
    <Layout title={t.title}>
      <div className={styles.signpost}>
        <span className={styles[arrowDirection]}>{t.interestQuestion}</span>
      </div>

      <div className={styles.arrowWrapper}>
        <SignpostArrow
          className={classNames(styles.arrow, styles[arrowDirection])}
          direction={arrowDirection}
          rotationDuration={1}
          arrowWidth={32}
          wrapperWidth='50%'
        />
      </div>

      <div className={styles.typeGroups}>
        <div
          className={classNames(styles.typeGroup, styles.technology)}
          onMouseOver={() => setArrowDirection('left')}
          onMouseLeave={() => setArrowDirection('no')}
        >
          <h1>{t.programming.label}</h1>
          {t.programming.cards.map((card, i) => (
            <Link key={i} className={styles.typeItem} href={card.link}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </Link>
          ))}
        </div>

        <div
          className={classNames(styles.typeGroup, styles.sport)}
          onMouseOver={() => setArrowDirection('right')}
          onMouseLeave={() => setArrowDirection('no')}
        >
          <h1>{t.sport.label}</h1>
          {t.sport.cards.map((card, i) => (
            <Link key={i} className={styles.typeItem} href={card.link}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}
