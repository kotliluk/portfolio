import { Document } from '@contentful/rich-text-types'
import { Entry } from 'contentful'

import { FullLocale, Locale, fromFull } from './locale'


export type ContentfulEntry = Entry

export type SysExtra = {
  id: string,
  locale: Locale,
}

export type WithSys<T> = T & SysExtra

export type WithoutSys<T> = Omit<T, keyof SysExtra>

export type FieldsParser<In, Out> = (raw: In) => WithoutSys<Out>

export type ObjectParser<T> = (entry: ContentfulEntry) => T

export const parseObject = <In, Out> (entry: ContentfulEntry, fieldsParser: FieldsParser<In, Out>): Out => {
  return {
    ...fieldsParser(entry.fields as In),
    id: entry.sys.id,
    locale: fromFull(entry.sys.locale as FullLocale),
  } as Out
}

export type ContentfulRichText = Document

export type ContentfulRawImage = {
  fields: {
    file: {
      details: {
        image: {
          height: number,
          width: number,
        },
      },
      url: string,
    },
  },
}

export type ContentfulImage = {
  height: number,
  width: number,
  url: string,
}

export const parseImage = (raw: ContentfulRawImage): ContentfulImage => ({
  height: raw.fields.file.details.image.height,
  width: raw.fields.file.details.image.width,
  url: `https:${raw.fields.file.url}`,
})
