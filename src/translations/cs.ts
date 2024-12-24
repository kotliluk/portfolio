import { Translation } from '.'
import { placeholder } from '@/logic/utils/string'


export const cs: Translation = {
  common: {
    pageTitle: 'Lukáš Kotlík',
    navigation: {
      home: 'Home',
      projects: 'Projekty',
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
      technology: 'Technologie',
      sport: 'Sport',
      all: 'Vše',
    },
  },
  timelineEvent: {
    notFoundTitle: '404: Event nenalezen',
    notFoundText: `Přesměrování na timeline za ${placeholder('countdown')} vteřin...`,
  },
  projects: {
    title: 'Projekty',
  },
  about: {
    title: 'About',
  },
  notFound: {
    title: '404: Stránka nenalezena',
    text: `Přesměrování na domovskou stránku za ${placeholder('countdown')} vteřin...`,
  },
}
