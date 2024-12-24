import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import InfoBarCard from '../infoBar'
import YearCard, { YearInfo } from './yearCard'
import { EventTypePickerValue, TimelineEvent } from '@/types/timelineEvent'


export type TimelineEventWithYearInfo = TimelineEvent & {
  firstInYearFrom: YearInfo
}

type TimelineCardProps = {
  timelineEvent: TimelineEventWithYearInfo
  selectedEventType: EventTypePickerValue
}

const TimelineCard: FunctionComponent<TimelineCardProps> = ({ timelineEvent, selectedEventType }) => {
  const { slug, title, shortText, firstInYearFrom, type, thumbnail } = timelineEvent

  return (
    <>
      <YearCard yearInfo={firstInYearFrom} selectedEventType={selectedEventType} />
      <Link
        id={slug}
        href={`/timeline/${slug}`}
        className={`${styles.card} ${styles[type]}`}
      >
        <div>
          <Image
            className={styles.thumbnail}
            alt=''
            src={thumbnail.url}
            width={100}
            height={100}
          />
        </div>
        <div>
          <h2 className={styles.title}>
            {title}
          </h2>

          <InfoBarCard timelineEvent={timelineEvent} />

          <div className={styles.shortText}>
            {documentToReactComponents(shortText)}
          </div>
        </div>
      </Link>
    </>
  )
}

export default TimelineCard