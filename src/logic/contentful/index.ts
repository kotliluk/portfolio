import { createClient } from 'contentful'

import { ObjectParser, SysExtra } from '@/types/contentful'
import { DEFAULT_LOCALE, Locale, Locales, toFull } from '@/types/locale'


export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
})

export const getEntries = async <T extends SysExtra> (
  entryType: string,
  parseObject: ObjectParser<T>,
  locale: Locale = DEFAULT_LOCALE,
  search: Record<string, unknown> = {},
): Promise<T[]> => {
  const res = await contentfulClient.getEntries({ content_type: entryType, locale: toFull(locale), ...search })
  return res.items.map(parseObject)
}

export const getAllLocalesEntries = async <T extends SysExtra> (
  entryType: string,
  parseObject: ObjectParser<T>,
): Promise<Record<Locale, T[]>> => {
  const res = {} as Record<Locale, T[]>
  for (const locale of Locales) {
    const entries = await contentfulClient.getEntries({ content_type: entryType, locale: toFull(locale) })
    res[locale] = entries.items.map(parseObject)
  }
  return res
}
