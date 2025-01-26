import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent, useCallback } from 'react'

import styles from './index.module.scss'
import FallbackImage from '@/components/common/fallbackImage'
import Layout from '@/components/common/layout'
import InfoBarCard from '@/components/timeline/infoBar'
import { getAllLocalesEntries, getEntries } from '@/logic/contentful'
import { renderRichText } from '@/logic/contentful/renderRichText'
import { useTranslation } from '@/logic/hooks/useTranslation'
import NotFoundPage from '@/pages/404'
import { ContentfulRichText } from '@/types/contentful'
import { Locale } from '@/types/locale'
import { TimelineEvent as TimelineEventT, TimelineEventLocaleSlugs, createTimelineEventLocaleSlugs, parseTimelineEvent } from '@/types/timelineEvent'


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
  const event = await getEntries('timelineEvent', parseTimelineEvent, locale as Locale, { 'fields.slug': params?.event })

  if (event.length === 0) {
    return {
      props: {
        notFound: true,
        timelineEvent: null,
        timelineEventLocaleSlugs: [],
      },
      revalidate: 5,
    }
  }

  const allLocalesEvents = await getAllLocalesEntries('timelineEvent', parseTimelineEvent)
  const timelineEventLocaleSlugs = createTimelineEventLocaleSlugs(allLocalesEvents)

  return {
    props: {
      notFound: false,
      timelineEvent: event[0] ?? null,
      timelineEventLocaleSlugs,
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
  timelineEventLocaleSlugs: TimelineEventLocaleSlugs
}

const TimelineEvent: FunctionComponent<TimelineEventProps> = ({ notFound, timelineEvent, timelineEventLocaleSlugs }) => {
  const { timelineEvent: t } = useTranslation()

  // rewrites the slug in URL when locale changes
  const handleLocaleChange = useCallback((oldLocale: Locale, oldPathname: string, newLocale: Locale) => {
    const pathnameParts = oldPathname.split('/')
    const oldSlug = pathnameParts[pathnameParts.length - 1]
    const newSlug = timelineEventLocaleSlugs.find((slugs) => slugs[oldLocale] === oldSlug)?.[newLocale]
    return newSlug ?? oldSlug
  }, [timelineEventLocaleSlugs])

  if (notFound) {
    return <NotFoundPage
      redirectTo='/timeline'
      title={t.notFoundTitle}
      text={t.notFoundText}
    />
  }

  if (!timelineEvent) {
    timelineEvent = FALLBACK_EVENT
  }

  const { title, longText, thumbnail } = timelineEvent

  return (
    <Layout
      title={`Timeline | ${title}`}
      onLocaleChange={handleLocaleChange}
    >
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
          {renderRichText(longText, { image: { max: 640 }})}
        </div>
      </div>
    </Layout>
  )
}

export default TimelineEvent