import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-areas: 
    "image"
    "caption"
    "textArea"
    "divider"
    "vertical-divider-wrapper";
  
  @media (min-width: 768px) {
    grid-template-areas: 
      "image image"
      "caption caption"
      "textArea textArea"
      "divider divider"
      "vertical-divider-wrapper vertical-divider-wrapper";
  }
`

export const ImageArea = styled.div`
  grid-area: image;
`

export const Caption = styled.div`
  grid-area: caption;
  text-align: right;
  font-size: 12px;
  color: #888;
`

export const ArticleTextArea = styled.div`
  grid-area: textArea;
  padding: 10px;
`

export const Title = styled.div`
   h2 {
    font-size: 23px;
    font-family: ${(props) => props.theme.fonts.mvpFont};
    line-height: 120%;
  }
`

export const Description = styled.div`
    p {
    font-size: 13px;
    font-family: ${(props) => props.theme.fonts.mvpFont};
    line-height: 140%;
    color: #5A5A5A;
    margin-top: 1rem;
  }
`

export const VerticalDividerWrapper = styled.div`
  grid-area: vertical-divider-wrapper;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ArticlePreview = styled.div`
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  
  @media (min-width: 768px) {
    border-left: 1px solid #ddd;
  }

  h2,
  p {
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

export const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`

export const Divider = styled.div`
  grid-area: divider;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`

export const DividerVertical = styled.div`
  border-left: 1px solid #ccc;
  margin: 0 20px;
`
