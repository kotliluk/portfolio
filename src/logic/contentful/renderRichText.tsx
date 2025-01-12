import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document } from '@contentful/rich-text-types'
import { ReactNode } from 'react'

import FallbackImage from '@/components/common/fallbackImage'

type RenderRichTextOptions = {
  image?: {
    width?: number
    height?: number
  }
}

export const renderRichText = (document: Document, options?: RenderRichTextOptions): ReactNode => {
  return documentToReactComponents(document, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const size = {
          width: node.data.target.fields.file.details.image.width as number,
          height: node.data.target.fields.file.details.image.height as number,
        }

        if (options?.image) {
          const width = options.image.width
          const height = options.image.height

          if (width && height) {
            size.width = width
            size.height = height
          }

          if (width) {
            const ratio = width / size.width
            size.width = width
            size.height *= ratio
          }

          if (height) {
            const ratio = height / size.height
            size.height = height
            size.width *= ratio
          }
        }

        return <p style={{textAlign: 'center'}}>
          <FallbackImage
            src={'https:' + node.data.target.fields.file.url}
            {...size}
          />
        </p>
      }
    }
  })
}
