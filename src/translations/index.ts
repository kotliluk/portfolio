import { cs } from './cs'
import { en } from './en'
import { Locale } from '@/types/locale'


export type Translation = {
  common: {
    pageTitle: string
    navigation: {
      home: string
      projects: string
      timeline: string
      about: string
    }
    months: {
      '01': string
      '02': string
      '03': string
      '04': string
      '05': string
      '06': string
      '07': string
      '08': string
      '09': string
      '10': string
      '11': string
      '12': string
    }
  }
  home: {
    title: string
    programming: {
      label: string
      cards: {
        title: string
        text: string
        link: string
      }[]
    }
    sport: {
      label: string
      cards: {
        title: string
        text: string
        link: string
      }[]
    }
  }
  timeline: {
    title: string
    types: {
      technology: string
      sport: string
      all: string
    }
  }
  timelineEvent: {
    notFoundTitle: string
    notFoundText: string // with countdown placeholder
  }
  projects: {
    title: string
    untilNow: string
  }
  about: {
    title: string
  }
  notFound: {
    title: string
    text: string // with countdown placeholder
  }
}

export type Translations = Record<Locale, Translation>

export const translations: Translations = {
  cs,
  en,
}
