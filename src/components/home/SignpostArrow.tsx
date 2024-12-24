import { FunctionComponent, useMemo, useRef } from 'react'


interface SignpostArrowProps {
  className: string
  direction: 'left' | 'right' | 'no'
  rotationDuration: number
  arrowWidth: number
  wrapperWidth: string
}

const SignpostArrow: FunctionComponent<SignpostArrowProps> = ({ className, direction, rotationDuration, arrowWidth, wrapperWidth }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [rotation, length] = useMemo(() => {
    if (!ref.current || direction === 'no') {
      return [0, 0]
    }

    const bounds = ref.current.getBoundingClientRect()
    const a = bounds.height + arrowWidth / 2
    const b = bounds.width / 2
    const c = Math.sqrt(a * a + b * b)
    const angleRad = Math.acos(a / c)
    const angleDeg = angleRad / Math.PI * 180

    return (direction === 'left') ? [angleDeg, c] : [-angleDeg, c]
  }, [ref, direction, arrowWidth])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: wrapperWidth,
        height: '100%',
        margin: `0 calc((100% - ${wrapperWidth}) / 2)`
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0px',
          left: `calc(50% - ${arrowWidth / 2}px)`,
          height: `${length}px`,
          width: `${arrowWidth}px`,
          transformOrigin: 'top center',
          transform: `rotate(${rotation}deg)`,
          transition: `all ${rotationDuration}s`,
          borderBottomLeftRadius: `${arrowWidth / 4}px`,
          borderBottomRightRadius: `${arrowWidth / 4}px`,
        }}
        className={className}
      />
    </div>
  )
}

export default SignpostArrow