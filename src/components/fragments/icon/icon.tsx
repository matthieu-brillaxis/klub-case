// ImageWithFallback.tsx
import React, { ImgHTMLAttributes, useState } from 'react'

type Props = ImgHTMLAttributes<any>

const Icon: React.FC<Props> = ({ src, ...props }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  const onError = (): void => setImgSrc(undefined)

  if (!imgSrc) {
    return <div />
  }

  return <img src={imgSrc} onError={onError} {...props} />
}

Icon.displayName = 'Icon'

export default Icon
