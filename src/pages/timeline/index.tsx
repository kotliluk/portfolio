import { GetStaticProps } from 'next'
import { FunctionComponent, useMemo, useState } from 'react'

import styles from './index.module.scss'
import Layout from '@/components/common/layout'
import TimelineCard from '@/components/timeline/card'
import EventTypePicker, { EventTypePickerValue } from '@/components/timeline/eventTypePicker'
import { getEntries } from '@/logic/contentful'
import { Locale } from '@/types/locale'
import { TimelineEvent, parseTimelineEvent } from '@/types/timelineEvent'


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const timelineEvents = await getEntries<TimelineEvent>('timelineEvent', parseTimelineEvent, locale as Locale)

  timelineEvents.sort((a, b) => -(a.date as string).localeCompare(b.date as string))

  return {
    props: {
      timelineEvents,
    },
  }
}

type TimelineProps = {
  timelineEvents: TimelineEvent[],
}

const Timeline: FunctionComponent<TimelineProps> = ({ timelineEvents }: TimelineProps) => {
  const [eventsType, setEventsType] = useState<EventTypePickerValue>('all')

  const filteredEvents = useMemo(() => {
    if (eventsType === 'all') {
      return timelineEvents
    }
    return timelineEvents.filter((event) => event.type === eventsType)
  }, [timelineEvents, eventsType])

  return (
    <Layout title='Timeline'>
      <div className={styles.body}>
        <div className={styles.header}>
          <h1>
            Timeline
          </h1>
          <EventTypePicker selectedType={eventsType} onSelect={setEventsType} />
        </div>

        {filteredEvents.map((event) => (
          <TimelineCard key={event.id} timelineEvent={event} />
        ))}
      </div>
    </Layout>
  )
}

export default Timeline