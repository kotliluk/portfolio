import { ObjectParser, SysExtra } from '@/types/contentful'
import { DEFAULT_LOCALE, Locale, toFull } from '@/types/locale'
import { createClient } from 'contentful'


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
