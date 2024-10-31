import { type ReactElement } from 'react'
import { Container, Heading } from './subtitle.styles'
import { type theme } from '../../../styles/index'

interface SubtitleProps {
  subtitle: string
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
  containerMaxWidth?: string
}
const Subtitle = ({
  subtitle,
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
  containerMaxWidth,
}: SubtitleProps): ReactElement => {
  return (
    <Container
      $containerWidth={containerWidth}
      $marginBottom={marginBottom}
      $containerMaxWidth={containerMaxWidth}
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
        {subtitle}
      </Heading>
    </Container>
  )
}

export default Subtitle
