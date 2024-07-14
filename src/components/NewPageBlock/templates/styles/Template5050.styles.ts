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
    "title title title title"
    "col1 divider1 col2 divider2"
    "divider divider divider divider"
    "col3 divider3 col4 divider4";
  grid-template-columns: 1fr auto 1fr auto;
  gap: 20px;
`

const Title = styled.div`
 :first-child {
    font-size: 13px;
    line-height: 140%;
    margin-bottom: 1rem;
    font-weight: bold;
    font-family: ${(props) => props.theme.fonts.heading2};
    color: #121212
  }
`

const Description = styled.div`
  margin-bottom: 2px;

  .paragraph {
    font-size: 9px;
    font-family: ${(props) => props.theme.fonts.mvpFont};
    line-height: 140%;
    color: #999;
    font-weight: 600;
    text-transform: uppercase;
  }
`

const Divider = styled.div`
  grid-area: divider;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`

const Column = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: flex;
  flex-direction: column;
  gap: 20px;
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
`

const Image = styled.img`
  max-width: 146px;
  width: 100%;
  height: auto;
  border-radius: 8px;
`

const VerticalDivider = styled.div`
  border-left: 1px solid #ccc;
  height: 100%;
`

export { ArticlePreview, Column, Container, Description, Divider, Image, Title, VerticalDivider, TextContainer }
