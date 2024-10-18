import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import Layout from '@/components/common/layout'
import InfoBarCard from '@/components/timeline/infoBar'
import { getEntries } from '@/logic/contentful'
// import { ContentfulRichText } from '@/types/contentful'
import { Locale } from '@/types/locale'
import { TimelineEvent as TimelineEventT, parseTimelineEvent } from '@/types/timelineEvent'


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
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const res = await getEntries('timelineEvent', parseTimelineEvent, locale as Locale, { 'fields.slug': params?.event })

  return {
    props: {
      timelineEvent: res[0],
    },
    revalidate: 5,
  }
}

// const FALLBACK_EVENT: TimelineEventT = {
//   title: 'Timeline Event',
//   slug: '',
//   type: 'technology',
//   date: '2000-01-01',
//   place: 'Prague, Czechia',
//   tags: [],
//   shortText: {} as ContentfulRichText,
//   longText: {
//     nodeType: 'document',
//     data: {},
//     content: [
//       {
//         nodeType: 'paragraph',
//         data: {},
//         content: [
//           {
//             nodeType: 'text',
//             data: {},
//             marks: [],
//             value: 'The event is loading...'
//           },
//         ],
//       },
//     ],
//   } as ContentfulRichText,
// }

type TimelineEventProps = {
  timelineEvent: TimelineEventT
}

const TimelineEvent: FunctionComponent<TimelineEventProps> = ({ timelineEvent }) => {
  if (!timelineEvent) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const { title, longText } = timelineEvent

  return (
    <Layout title='Timeline'>
      <div className={styles.body}>
        <h1>
          {title}
        </h1>

        <InfoBarCard timelineEvent={timelineEvent} />

        <div className={styles.longText}>
          {documentToReactComponents(longText)}
        </div>
      </div>
    </Layout>
  )
}

export default TimelineEvent