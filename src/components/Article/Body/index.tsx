import { type ReactElement } from 'react'
import { BodyContainer } from './paragraph.styles'
import { type theme } from '../../../styles/examples/midia.theme'

interface ArticleBodyProps {
  articleBodyCustomCss: string
  blocks?: Array<{
    html: string
    id: string
    type: string
  }>
  fontFamily?: keyof typeof theme.fonts
  fontSize?: string
  lineHeight?: string
  mt?: string
  mb?: string
  ml?: string
  mr?: string
  color: keyof typeof theme.colors
  fontWeight?: string
  imgProps: {
    width: string
    height: string
    maxWidth: string
    maxHeight: string
    customAlt: string
    borderRadius: string
  }
  figcaptionProps: {
    fontSize?: string
    fontFamily?: keyof typeof theme.fonts
    color?: keyof typeof theme.colors
    linHeight?: string
    width?: string
    maxWidth?: string
    height?: string
    maxHeight?: string
    pt?: string
    pb?: string
    pr?: string
    pl?: string
    mt?: string
    mb?: string
    mr?: string
    ml?: string
    align?: string
  }
  // articleImages: Array<{
  //   url: string
  //   figcaption: string
  // }>
}

const ArticleBody = ({
  articleBodyCustomCss,
  blocks,
  fontFamily,
  fontSize,
  lineHeight,
  mt,
  mb,
  ml,
  mr,
  color,
  fontWeight,
  imgProps,
  figcaptionProps,
}: ArticleBodyProps): ReactElement => {
  const articleBodyContent = blocks?.map((block) => block.html).join('')

  // const extractImageAndCaption = (html: string) => {
  //   const imageUrlMatch = html.match(/<img[^>]*src="([^"]*)"/)
  //   const figCaptionMatch = html.match(/<figcaption[^>]*>(.*?)<\/figcaption>/)

  //   const imageUrl = imageUrlMatch ? imageUrlMatch[1] : ''

  //   // Remove todas as tags HTML da figcaption para extrair apenas o texto
  //   const figCaption = figCaptionMatch
  //     ? figCaptionMatch[1].replace(/<[^>]*>/g, '').trim()
  //     : ''

  //   return { imageUrl, figCaption }
  // }

  // // Extrair todas as imagens e legendas
  // const imagesWithCaptions = blocks
  //   ?.map((block) => extractImageAndCaption(block.html))
  //   .filter(({ imageUrl }) => imageUrl !== '')

  // // Atualizar o array `articleImages`
  // const allImages =
  //   imagesWithCaptions?.map(({ imageUrl, figCaption }) => ({
  //     url: imageUrl,
  //     figcaption: figCaption,
  //   })) ?? []

  // console.log({ allImages })

  return (
    <BodyContainer
      className={articleBodyCustomCss}
      $fontFamily={fontFamily}
      $fontSize={fontSize}
      $lineHeight={lineHeight}
      $mt={mt}
      $mb={mb}
      $ml={ml}
      $mr={mr}
      $color={color}
      $fontWeight={fontWeight}
      dangerouslySetInnerHTML={{ __html: articleBodyContent ?? '' }}
      $imgProps={{
        $width: imgProps?.width ?? '',
        $height: imgProps?.height ?? '',
        $maxWidth: imgProps?.maxWidth ?? '',
        $maxHeight: imgProps?.maxHeight ?? '',
        $borderRadius: imgProps?.borderRadius ?? '',
      }}
      $figcaptionProps={{
        $fontSize: figcaptionProps?.fontSize ?? '',
        $fontFamily: figcaptionProps?.fontFamily,
        $color: figcaptionProps?.color,
        $linHeight: figcaptionProps?.linHeight,
        $width: figcaptionProps?.width,
        $maxWidth: figcaptionProps?.maxWidth,
        $height: figcaptionProps?.height,
        $maxHeight: figcaptionProps?.maxHeight,
        $pt: figcaptionProps?.pt,
        $pb: figcaptionProps?.pb,
        $pr: figcaptionProps?.pr,
        $pl: figcaptionProps?.pl,
        $mt: figcaptionProps?.mt,
        $mb: figcaptionProps?.mb,
        $mr: figcaptionProps?.mr,
        $ml: figcaptionProps?.ml,
        $align: figcaptionProps?.align,
      }}
    />
  )
}

export default ArticleBody
