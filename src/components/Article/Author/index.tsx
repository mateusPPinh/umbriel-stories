/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ReactElement } from 'react'
import {
  AuthorContainer,
  AuthorImage,
  AuthorNameSection,
  AuthorNameParagraph,
  PublicationDateParagraph,
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
  fontWeight,
  publicationDate,
  showPublicationDate,
  shouldDisableAuthorNameClick,
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
          $borderColor={borderColor ?? 'gray300'}
          $borderWidth={borderWidth}
          $imageWidth={imageWidth}
          $imageHeight={imageHeight}
        />
      )}
      <AuthorNameSection
        $color={color}
        $fontSize={fontSize}
        $lineHeight={lineHeight}
        $fontWeight={fontWeight}
        $showPublicationDate={showPublicationDate}
      >
        <Link
          href={authorPageLink ?? ''}
          target="_blank"
          hover="opacity:45"
          shouldDisableClick={shouldDisableAuthorNameClick}
        >
          <AuthorNameParagraph
            $color={color}
            $fontFamily={fontFamily ?? 'dm'}
            $fontSize={fontSize}
            $lineHeight={lineHeight}
            $authorNameMarginLeft={authorNameMarginLeft ?? ''}
            $fontWeight={fontWeight}
          >
            {value}
          </AuthorNameParagraph>
        </Link>
        {showPublicationDate && (
          <PublicationDateParagraph>
            {publicationDate ?? ''}
          </PublicationDateParagraph>
        )}
      </AuthorNameSection>
    </AuthorContainer>
  )
}

export default AuthorSection
