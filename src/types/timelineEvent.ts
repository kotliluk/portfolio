import { WithSys } from "./contentful"
import { DateString } from "./date"


export type TimelineEventType = 'sport' | 'technology'

export type BaseTimelineEvent = {
  title: string,
  slug: string,
  type: TimelineEventType,
  date: DateString,
  place: string,
  tags: string[],
  // shortText: [Object],
  // longText: [Object],
}

export type TimelineEvent = WithSys<BaseTimelineEvent>
