import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { ContentfulEntry, ContentfulImage, ContentfulRawImage, ContentfulRichText, ObjectParser, WithSys, parseImage, parseObject } from './contentful'
import { DateString } from './date'
import { Locale } from './locale'


export type TimelineEventType = 'sport' | 'technology'

export type BaseTimelineEvent = {
  title: string,
  slug: string,
  type: TimelineEventType,
  date: DateString,
  place: string,
  tags: string[],
  shortText: ContentfulRichText,
  longText: ContentfulRichText,
  thumbnail: ContentfulImage,
}

type RawTimelineEvent = Omit<BaseTimelineEvent, 'thumbnail'> & {
  thumbnail: ContentfulRawImage,
}

export type TimelineEvent = WithSys<BaseTimelineEvent>

export const parseTimelineEvent: ObjectParser<TimelineEvent> = (entry: ContentfulEntry): TimelineEvent => {
  return parseObject(entry, (raw: RawTimelineEvent) => ({
    ...raw,
    thumbnail: parseImage(raw.thumbnail),
  }))
}

export type EventTypePickerValue = TimelineEventType | 'all'

export const useEventTypeQueryParam = () => {
  const router = useRouter()

  return useMemo(() => {
    if (!router.query.events) {
      return 'all'
    }

    if (router.query.events !== 'technology' && router.query.events !== 'sport') {
      return 'all'
    }

    return router.query.events as EventTypePickerValue
  }, [router.query.events])
}

export type TimelineEventLocaleSlugs = Record<Locale, string>[]

export const createTimelineEventLocaleSlugs = (allLocalesEvents: Record<Locale, TimelineEvent[]>): TimelineEventLocaleSlugs => {
  const timelineEventLocaleSlugs = [] as TimelineEventLocaleSlugs

  let isFirstLocale = true

  for (const locale in allLocalesEvents) {
    const localeEntries = allLocalesEvents[locale as Locale]
    if (isFirstLocale) {
      localeEntries.forEach((entry) => {
        timelineEventLocaleSlugs.push({ [locale]: entry.slug } as Record<Locale, string>)
      })
    } else {
      localeEntries.forEach((entry, index) => {
        timelineEventLocaleSlugs[index][locale as Locale] = entry.slug
      })
    }
    isFirstLocale = false
  }

  return timelineEventLocaleSlugs
}
