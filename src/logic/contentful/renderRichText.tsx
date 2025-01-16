import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Block, Document, Inline } from '@contentful/rich-text-types'
import { ReactNode } from 'react'

import FallbackImage from '@/components/common/fallbackImage'

type RenderRichTextOptions = {
  image?: {
    // fixes larger from width/height sizes, "width" and "height" options are ignored when "max" is set
    max?: number
    // fixes width of the image, if "height" option is not set, size ratio is preserved
    width?: number
    // fixes height of the image, if "width" option is not set, size ratio is preserved
    height?: number
  }
}

const getImageProps = (node: Block | Inline, options?: RenderRichTextOptions) => {
  const props = {
    width: node.data.target.fields.file.details.image.width as number,
    height: node.data.target.fields.file.details.image.height as number,
    src: 'https:' + node.data.target.fields.file.url,
  }

  if (options?.image) {
    const width = options.image.width
    const height = options.image.height
    const max = options.image.max

    if (max) {
      if (props.width >= props.height) {
        const ratio = max / props.width
        props.width = max
        props.height *= ratio
      } else {
        const ratio = max / props.height
        props.height = max
        props.width *= ratio
      }
    } else if (width !== undefined || height !== undefined) {
      if (width && height) {
        props.width = width
        props.height = height
      }

      if (width) {
        const ratio = width / props.width
        props.width = width
        props.height *= ratio
      }

      if (height) {
        const ratio = height / props.height
        props.height = height
        props.width *= ratio
      }
    }
  }

  return props
}

export const renderRichText = (document: Document, options?: RenderRichTextOptions): ReactNode => {
  return documentToReactComponents(document, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const props = getImageProps(node, options)

        return (
          <p style={{textAlign: 'center'}}>
            <FallbackImage {...props} />
          </p>
        )
      }
    }
  })
}
