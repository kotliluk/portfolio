// language locales used in app

export type Locale = 'en' | 'cs'

export const EN_LOCALE: Locale = 'en'

export const CS_LOCALE: Locale = 'cs'

export const DEFAULT_LOCALE: Locale = 'cs'

export const Locales: Locale[] = ['en', 'cs']

// language+country locales used in contentful

export type FullLocale = 'en-US' | 'cs'

export const DEFAULT_FULL_LOCALE: FullLocale = 'cs'

export const fromFull = (locale: FullLocale): Locale => {
  switch (locale) {
    case 'en-US':
      return 'en'
    case 'cs':
      return 'cs'
    default:
      return DEFAULT_LOCALE
  }
}

export const toFull = (locale: Locale): FullLocale => {
  switch (locale) {
    case 'en':
      return 'en-US'
    case 'cs':
      return 'cs'
    default:
      return DEFAULT_FULL_LOCALE
  }
}
