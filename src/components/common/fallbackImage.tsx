import Image from 'next/image'
import { FunctionComponent } from 'react'

interface FallbackImageProps {
  className: string
  src: string
  width: number
  height: number
}

const FallbackImage: FunctionComponent<FallbackImageProps> = ({ className, src, width, height }) => {
  if (!src) {
    return (
      <div
        className={className}
        style={{ width, height, backgroundColor: 'lightgray' }}
      />
    )
  }

  return (
    <Image
      className={className}
      alt=''
      src={src}
      width={width}
      height={height}
    />
  )
}

export default FallbackImage