import { fromFull, FullLocale, Locale } from './locale'
import { Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'


export type ContentfulEntry = Entry

export type SysExtra = {
  id: string,
  locale: Locale,
}

export type WithSys<T> = T & SysExtra

export type WithoutSys<T> = Omit<T, keyof SysExtra>

export type FieldsParser<T> = (raw: unknown) => T

export type ObjectParser<T> = (entry: ContentfulEntry) => T

export const parseObject = <T> (entry: ContentfulEntry, fieldsParser: FieldsParser<WithoutSys<T>>): T => {
  return {
    ...fieldsParser(entry.fields),
    id: entry.sys.id,
    locale: fromFull(entry.sys.locale as FullLocale),
  } as T
}

export type ContentfulRichText = Document
