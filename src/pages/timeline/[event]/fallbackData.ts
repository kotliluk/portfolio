import { ContentfulRichText } from '@/types/contentful'
import { TimelineEvent } from '@/types/timelineEvent'


export const FALLBACK_EVENT: TimelineEvent = {
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
}
