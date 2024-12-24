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
  }
  home: {
    title: string
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
