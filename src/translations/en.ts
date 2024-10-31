import { Translation } from '.'
import { placeholder } from '@/logic/utils/string'


export const en: Translation = {
  common: {
    pageTitle: 'Lukáš Kotlík',
    navigation: {
      home: 'Home',
      timeline: 'Timeline',
      about: 'About',
    }
  },
  home: {
    title: 'Home',
  },
  timeline: {
    title: 'Timeline',
    types: {
      technology: 'Technology',
      sport: 'Sport',
      all: 'All',
    },
  },
  timelineEvent: {
    notFoundTitle: '404: Event not found',
    notFoundText: `Redirecting to the timeline in ${placeholder('countdown')} seconds...`,
  },
  about: {
    title: 'About',
  },
  notFound: {
    title: '404: Page not found',
    text: `Redirecting to the homepage in ${placeholder('countdown')} seconds...`,
  },
}
