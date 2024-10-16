import { fromFull, FullLocale, Locale } from './locale'
import { Entry, Metadata, EntrySys } from 'contentful'


export type SysExtra = {
  id: string,
  locale: Locale,
}

export type WithSys<T> = T & SysExtra

export const parseObject = <T extends SysExtra> (entry: Entry): T => {
  return {
    ...entry.fields,
    id: entry.sys.id,
    locale: fromFull(entry.sys.locale as FullLocale),
  } as T
}

export type ContentfulObject<T> = {
  metadata: Metadata,
  sys: EntrySys,
  fields: T,
}
