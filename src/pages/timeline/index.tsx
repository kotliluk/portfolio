import { parseTimelineEvent, TimelineEvent } from '@/types/timelineEvent'
import TimelineCard from '@/components/timeline/card'
import { getEntries } from '@/logic/contentful'
import { Locale } from '@/types/locale'
import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Layout from '@/components/common/layout'


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
  return (
    <Layout title='Timeline'>
      <div>
        <h1>
          Timeline
        </h1>
        
        {timelineEvents.map((event) => (
          <TimelineCard key={event.id} timelineEvent={event} />
        ))}
      </div>
    </Layout>
  )
}

export default Timeline;