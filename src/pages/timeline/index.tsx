import { GetStaticProps } from 'next'
import { FunctionComponent, useMemo, useState } from 'react'

import styles from './index.module.scss'
import Layout from '@/components/common/layout'
import TimelineCard, { TimelineEventWithYearInfo } from '@/components/timeline/card'
import { YearInfo } from '@/components/timeline/card/yearCard'
import EventTypePicker, { EventTypePickerValue } from '@/components/timeline/eventTypePicker'
import { getEntries } from '@/logic/contentful'
import { Locale } from '@/types/locale'
import { TimelineEvent, parseTimelineEvent } from '@/types/timelineEvent'


const yearInfo = (year: string, all: boolean): YearInfo => ({
  year,
  all,
  technology: false,
  sport: false,
})

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const parsedTimelineEvents = await getEntries<TimelineEvent>('timelineEvent', parseTimelineEvent, locale as Locale)

  parsedTimelineEvents.sort((a, b) => -(a.date as string).localeCompare(b.date as string))

  const foundTypesInYears: Record<string, Record<EventTypePickerValue, boolean>> = {}

  const timelineEvents: TimelineEventWithYearInfo[] = parsedTimelineEvents.map((event) => {
    const year = (event.date as string).slice(0, 4)
    const firstInYearFrom: YearInfo = yearInfo(year, false)
    let foundTypesInCurYear = foundTypesInYears[year]

    if (!foundTypesInCurYear) {
      foundTypesInCurYear = yearInfo(year, true)
      foundTypesInYears[year] = foundTypesInCurYear
      firstInYearFrom.all = true
    }

    if (!foundTypesInCurYear[event.type]) {
      foundTypesInCurYear[event.type] = true
      firstInYearFrom[event.type] = true
    }

    return {
      ...event,
      firstInYearFrom,
    }
  })

  return {
    props: {
      timelineEvents,
    },
  }
}

type TimelineProps = {
  timelineEvents: TimelineEventWithYearInfo[],
}

const Timeline: FunctionComponent<TimelineProps> = ({ timelineEvents }: TimelineProps) => {
  const [selectedEventType, setSelectedEventType] = useState<EventTypePickerValue>('all')

  const filteredEvents = useMemo(() => {
    if (selectedEventType === 'all') {
      return timelineEvents
    }
    return timelineEvents.filter((event) => event.type === selectedEventType)
  }, [timelineEvents, selectedEventType])

  return (
    <Layout title='Timeline'>
      <div className={styles.body}>
        <div className={styles.header}>
          <h1>
            Timeline
          </h1>
          <EventTypePicker selectedType={selectedEventType} onSelect={setSelectedEventType} />
        </div>

        {filteredEvents.map((event) => (
          <TimelineCard key={event.id} timelineEvent={event} selectedEventType={selectedEventType} />
        ))}
      </div>
    </Layout>
  )
}

export default Timeline