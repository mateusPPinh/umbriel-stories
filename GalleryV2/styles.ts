import styled, { css } from 'styled-components'
import { type FontProps } from './types'

const customCSSFont = css<FontProps>`
  font-size: ${props => props.fontSize}px;
  font-weight: ${props => props.fontWeight};
  line-height: ${props => props.fontLineHeight}px;
`

const Container = styled.div`

`

const GalleryTitle = styled.h1<FontProps>`
  font-family: 'Rubik Variable';
  margin-bottom: 8px;
  ${customCSSFont}
`

const GallerySubtitle = styled.span<FontProps>`
  font-family: 'Rubik Variable';
  ${customCSSFont}
`

const EmblaOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255,255,255, 0.45);
  border-radius: 50%;
  padding: 8px;
  width: 32px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.65;
  }
`

const Embla = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  img {
    border-radius: 8px;
    width: 100%;
    max-width: 1200px;
    height: auto;
  }
`

const EmblaContainer = styled.div`
  display: flex;
`

const EmblaSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ArrowButton = styled.button<{ left?: boolean, right?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.95);
  border-radius: 50%;
  width: 90px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;

  ${props => (props.left ?? false) && `
    left: 16px;
  `}
  ${props => (props.right ?? false) && `
    right: 16px;
  `}
  &:hover {
    opacity: 0.65;
  }
`
export { Container, GalleryTitle, GallerySubtitle, CloseButton, Embla, EmblaContainer, EmblaSlide, ArrowButton, EmblaOverlay }
