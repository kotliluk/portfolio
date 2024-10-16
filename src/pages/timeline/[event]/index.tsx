import { getEntries } from '@/logic/contentful'
import { parseTimelineEvent, TimelineEvent as TimelineEventT } from '@/types/timelineEvent'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import { Locale } from '@/types/locale'


export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const timelineEvents: TimelineEventT[] = []

  for (const locale of (locales ?? [])) {
    const localeTimelineEvents = await getEntries<TimelineEventT>('timelineEvent', parseTimelineEvent, locale as Locale)
    timelineEvents.push(...localeTimelineEvents)
  }

  return {
    paths: timelineEvents.map((item) => ({
      params: {
        event: item.slug,
      },
      locale: item.locale,
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const res = await getEntries('timelineEvent', parseTimelineEvent, locale as Locale, { 'fields.slug': params?.event })

  return {
    props: {
      timelineEvent: res[0]
    }
  }
}

type TimelineEventProps = {
  timelineEvent: TimelineEventT;
}

const TimelineEvent: FunctionComponent<TimelineEventProps> = ({ timelineEvent }) => {
  console.log('timelineEvent', timelineEvent);
  
  return (
    <div>
      {timelineEvent.title}
    </div>
  );
}
 
export default TimelineEvent;