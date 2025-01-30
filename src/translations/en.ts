import { Translation } from '.'
import { placeholder } from '@/logic/utils/string'


export const en: Translation = {
  common: {
    pageTitle: 'Lukáš Kotlík',
    navigation: {
      home: 'Home',
      projects: 'Projects',
      timeline: 'Timeline',
      about: 'About',
    },
    months: {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
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
  projects: {
    title: 'Projects',
    untilNow: 'until now',
  },
  about: {
    title: 'About',
  },
  notFound: {
    title: '404: Page not found',
    text: `Redirecting to the homepage in ${placeholder('countdown')} seconds...`,
  },
}
