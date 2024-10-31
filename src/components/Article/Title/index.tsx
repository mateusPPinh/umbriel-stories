import { type ReactElement } from 'react'
import { Container, Heading } from './title.styles'
import { type theme } from '../../../styles/index'

interface TitleProps {
  title: string
  containerWidth: string
  marginBottom: string
  fontFamily: keyof typeof theme.fonts
  fontWeight: string
  lineHeight: string
  fontSize: string
  letterSpacing: string
  color: keyof typeof theme.colors
  customContainerCSS?: string
  customHeadingCSS?: string
}
const Title = ({
  title,
  containerWidth,
  fontFamily,
  fontWeight,
  lineHeight,
  marginBottom,
  fontSize,
  letterSpacing,
  color,
  customContainerCSS,
  customHeadingCSS,
}: TitleProps): ReactElement => {
  return (
    <Container
      $containerWidth={containerWidth}
      $marginBottom={marginBottom}
      style={
        typeof customContainerCSS === 'object' ? customContainerCSS : undefined
      }
      className={
        typeof customContainerCSS === 'string' ? customContainerCSS : undefined
      }
    >
      <Heading
        $fontFamily={fontFamily}
        $fontWeight={fontWeight}
        $lineHeight={lineHeight}
        $fontSize={fontSize}
        $letterSpacing={letterSpacing}
        $color={color}
        style={
          typeof customHeadingCSS === 'object' ? customHeadingCSS : undefined
        }
        className={
          typeof customHeadingCSS === 'string' ? customHeadingCSS : undefined
        }
      >
        {title}
      </Heading>
    </Container>
  )
}

export default Title
