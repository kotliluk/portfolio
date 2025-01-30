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
    },
    months: {
      '01': 'leden',
      '02': 'únor',
      '03': 'březen',
      '04': 'duben',
      '05': 'květen',
      '06': 'červen',
      '07': 'červenec',
      '08': 'srpen',
      '09': 'září',
      '10': 'říjen',
      '11': 'listopad',
      '12': 'prosinec',
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
