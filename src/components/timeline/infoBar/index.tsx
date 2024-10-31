import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import CalendarIcon from '@/components/common/icons/calendar-16.svg'
import LocationIcon from '@/components/common/icons/map-pin-16.svg'
import { TimelineEvent } from '@/types/timelineEvent'


type InfoBarCardProps = {
  timelineEvent: TimelineEvent;
}

const InfoBarCard: FunctionComponent<InfoBarCardProps> = ({ timelineEvent }) => {
  const { date, place, tags } = timelineEvent

  return (
    <div className={styles.info}>
      <div className={styles.withIcon}>
        <CalendarIcon />
        <span>{date}</span>
      </div>
      <div className={styles.withIcon}>
        <LocationIcon />
        <span>{place}</span>
      </div>
      <span className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>{`#${tag}`}</span>
        ))}
      </span>
    </div>
  )
}

export default InfoBarCard