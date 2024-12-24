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
        <span className={styles[arrowDirection]}>Co Vás zajímá?</span>
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
          <h2>Programování</h2>
          <Link className={styles.typeItem} href='/projects'>
            <h3>Projekty</h3>
            <p>Seznam mých programátorských projektů - soukromých i pracovních.</p>
          </Link>
          <Link className={styles.typeItem} href='/timeline?events=technology'>
            <h3>Události</h3>
            <p>Časová osa s událostmi týkajících se mého programátorského života a vzdělání.</p>
          </Link>
        </div>
        <div
          className={classNames(styles.typeGroup, styles.sport)}
          onMouseOver={() => setArrowDirection('right')}
          onMouseLeave={() => setArrowDirection('no')}
        >
          <h2>Sport</h2>
          <Link className={styles.typeItem} href='/timeline?events=sport'>
            <h3>Události</h3>
            <p>Časová osa s událostmi týkajících se mého sportovního života.</p>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
