import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import FallbackImage from '@/components/common/fallbackImage'
import Layout from '@/components/common/layout'
import InfoBarCard from '@/components/timeline/infoBar'
import { getEntries } from '@/logic/contentful'
import { placeholder } from '@/logic/utils/string'
import NotFoundPage from '@/pages/404'
import { ContentfulRichText } from '@/types/contentful'
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

  if (res.length === 0) {
    return {
      props: {
        notFound: true,
        timelineEvent: null,
      },
      revalidate: 5,
    }
  }

  return {
    props: {
      notFound: false,
      timelineEvent: res[0] ?? null,
    },
    revalidate: 5,
  }
}

const FALLBACK_EVENT: TimelineEventT = {
  id: '',
  locale: 'en',
  title: 'Timeline Event',
  slug: '',
  type: 'technology',
  date: '2000-01-01',
  place: 'Prague, Czechia',
  tags: [],
  shortText: {} as ContentfulRichText,
  longText: {
    nodeType: 'document',
    data: {},
    content: [
      {
        nodeType: 'paragraph',
        data: {},
        content: [
          {
            nodeType: 'text',
            data: {},
            marks: [],
            value: 'The event is loading...'
          },
        ],
      },
    ],
  } as ContentfulRichText,
  thumbnail: {
    url: '',
    width: 100,
    height: 100,
  },
}

type TimelineEventProps = {
  notFound: boolean
  timelineEvent: TimelineEventT
}

const TimelineEvent: FunctionComponent<TimelineEventProps> = ({ notFound, timelineEvent }) => {
  if (notFound) {
    return <NotFoundPage
      redirectTo='/timeline'
      title='404: Event not found'
      text={`Redirecting to the timeline in ${placeholder('countdown')} seconds...`}
    />
  }

  if (!timelineEvent) {
    timelineEvent = FALLBACK_EVENT
  }

  const { title, longText, thumbnail } = timelineEvent

  return (
    <Layout title='Timeline'>
      <div className={styles.body}>
        <div className={styles.header}>
          <div>
            <FallbackImage
              className={styles.thumbnail}
              src={thumbnail.url}
              width={100}
              height={100}
            />
          </div>

          <div>
            <h1>
              {title}
            </h1>

            <InfoBarCard timelineEvent={timelineEvent} />
          </div>
        </div>

        <div className={styles.longText}>
          {documentToReactComponents(longText)}
        </div>
      </div>
    </Layout>
  )
}

export default TimelineEvent