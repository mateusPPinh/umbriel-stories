import styled from 'styled-components'

interface CSSProps {
  headingsProps?: {
    fontSize: string | number
    fontWeight: string | number
    transform: string
  }
}

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'title title title title'
    'col1 divider1 col2 divider2'
    'divider divider divider divider'
    'col3 divider3 col4 divider4';
  grid-template-columns: 1fr auto 1fr auto;
  gap: 20px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    grid-template-areas:
      'title'
      'col1'
      'divider'
      'col2'
      'divider'
      'col3'
      'divider'
      'col4';
    grid-template-columns: 1fr;
  }
`

const Title = styled.div`
  grid-area: title;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;

  h2 {
    font-size: inherit;
    font-weight: inherit;
  }
`

const Description = styled.div`
  margin-bottom: 10px;

  .paragraph {
    font-size: 12px;
    font-family: ${(props) => props.theme.fonts.mvpFont};
    line-height: 140%;
    color: #999;
    font-weight: bold;
    text-transform: uppercase;
  }
`

const Divider = styled.div`
  grid-area: divider;
  border-top: 1px solid #ccc;
  margin: 20px 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const Column = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    align-items: center;
  }
`

const ArticlePreview = styled.div<CSSProps>`
  display: flex;
  gap: 20px;
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;

  h2, h3, p {
    font-family: ${(props) => props.theme.fonts.mvpFont};
  }

  h2 {
    font-weight: bold;
    line-height: 140%;
    font-size: 19px;
  }

  p {
    font-size: 13px;
    line-height: 140%;
    color: #5a5a5a;
  }

`

const TextContainer = styled.div`
   flex: 1;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    text-align: center;
  }
`

const Image = styled.img`
  max-width: 146px;
  width: 100%;
  height: auto;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const VerticalDivider = styled.div`
  border-left: 1px solid #ccc;
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`

export {
  ArticlePreview,
  Column,
  Container,
  Description,
  Divider,
  Image,
  Title,
  VerticalDivider,
  TextContainer
}
