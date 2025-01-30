import { ContentfulEntry, ContentfulImage, ContentfulRawImage, ContentfulRichText, ObjectParser, WithSys, parseImage, parseObject } from './contentful'
import { DateString } from './date'

export type BaseProject = {
  title: string
  fromDate: DateString
  toDate?: DateString
  stack: string[]
  text: ContentfulRichText
  link?: string
  thumbnail: ContentfulImage
  colorOne: string
  colorTwo?: string
  colorText: string
}

type RawProject = Omit<BaseProject, 'thumbnail'> & {
  thumbnail: ContentfulRawImage,
}

export type Project = WithSys<BaseProject>

export const parseProject: ObjectParser<Project> = (entry: ContentfulEntry): Project => {
  return parseObject(entry, (raw: RawProject) => ({
    ...raw,
    thumbnail: parseImage(raw.thumbnail),
  }))
}