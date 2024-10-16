import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import InfoBarCard from '../infoBar'
import { TimelineEvent } from '@/types/timelineEvent'


type TimelineCardProps = {
  timelineEvent: TimelineEvent;
}

const TimelineCard: FunctionComponent<TimelineCardProps> = ({ timelineEvent }) => {
  const { slug, title, shortText } = timelineEvent

  return (
    <Link id={slug} href={`/timeline/${slug}`} className={styles.card}>
      <div>
        <h2>
          {title}
        </h2>

        <InfoBarCard timelineEvent={timelineEvent} />

        <div className={styles.shortText}>
          {documentToReactComponents(shortText)}
        </div>
      </div>
    </Link>
  )
}

export default TimelineCard