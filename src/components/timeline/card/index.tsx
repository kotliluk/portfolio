import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import CalendarIcon from '@/components/common/icons/calendar-16.svg'
import LocationIcon from '@/components/common/icons/map-pin-16.svg'
import { TimelineEvent } from '@/types/timelineEvent'


type TimelineCardProps = {
  timelineEvent: TimelineEvent;
}

const TimelineCard: FunctionComponent<TimelineCardProps> = ({ timelineEvent }) => {
  const { slug, title, date, place, tags, shortText } = timelineEvent

  return (
    <Link href={`/timeline/${slug}`} className={styles.card}>
      <div>
        <h2>
          {title}
        </h2>

        <div className={styles.info}>
          <div className={styles.withIcon}>
            <CalendarIcon />
            <span>{date}</span>
          </div>
          <div className={styles.withIcon}>
            <LocationIcon />
            <span>{place}</span>
          </div>
          <span>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{`#${tag}`}</span>
            ))}
          </span>
        </div>

        <div className={styles.shortText}>
          {documentToReactComponents(shortText)}
        </div>
      </div>
    </Link>
  )
}

export default TimelineCard