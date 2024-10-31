import { type ReactElement } from 'react'
import {
  AuthorContainer,
  AuthorImage,
  AuthorNameSection,
  AuthorNameParagraph,
} from './author.styles'
import { type AuthorProps } from './types'
import Link from '../../../components/Link'

const AuthorSection = ({
  borderWidth,
  alignItems,
  authorPageLink,
  authorThumb,
  borderColor,
  borderRadius,
  color,
  email,
  flexDirection,
  fontFamily,
  fontSize,
  height,
  justifyContent,
  lineHeight,
  maxWidth,
  mb,
  ml,
  mr,
  mt,
  value,
  width,
  imageHeight,
  imageWidth,
  authorNameMarginLeft,
}: AuthorProps): ReactElement => {
  return (
    <AuthorContainer
      $width={width}
      $maxWidth={maxWidth}
      $mt={mt}
      $mr={mr}
      $mb={mb}
      $ml={ml}
      $flexDirection={flexDirection}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
    >
      {authorThumb && (
        <AuthorImage
          src={authorThumb}
          alt="Author"
          $hasThumb={Boolean(authorThumb)}
          $borderRadius={borderRadius}
          $height={height}
          $borderColor={borderColor}
          $borderWidth={borderWidth}
          $imageWidth={imageWidth}
          $imageHeight={imageHeight}
        />
      )}
      <AuthorNameSection
        $color={color}
        $fontFamily={fontFamily}
        $fontSize={fontSize}
        $lineHeight={lineHeight}
      >
        <Link href={authorPageLink ?? ''} target="_blank" hover="opacity:45">
          <AuthorNameParagraph
            $color={color}
            $fontFamily={fontFamily}
            $fontSize={fontSize}
            $lineHeight={lineHeight}
            $authorNameMarginLeft={authorNameMarginLeft ?? ''}
          >
            {value}
          </AuthorNameParagraph>
        </Link>
      </AuthorNameSection>
    </AuthorContainer>
  )
}

export default AuthorSection
