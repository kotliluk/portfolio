import { ContentfulEntry, ContentfulRichText, ObjectParser, WithSys, parseObject } from './contentful'
import { DateString } from './date'


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
}

export type TimelineEvent = WithSys<BaseTimelineEvent>

export const parseTimelineEvent: ObjectParser<TimelineEvent> = (entry: ContentfulEntry): TimelineEvent => {
  return parseObject(entry, (raw) => raw as BaseTimelineEvent)
}
