import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const BlockTitle = styled.h2`
  font-size: 13px;
  line-height: 140%;
  margin-bottom: 1rem;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.heading2};
  color: #121212
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  &:not(:last-child) {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -10px;
      bottom: 0;
      width: 1px;
      background-color: #ddd;
    }
  }
`

export const ArticlePreview = styled.div`
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;

  h2,
  p {
    font-family: ${(props) => props.theme.fonts.mvpFont};
  }

  h2 {
    font-weight: bold;
    line-height: 140%;
    font-size: 19px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  p {
    font-size: 13px;
    line-height: 140%;
    color: #5a5a5a;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`

export const Image = styled.img`
  width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    max-height: 150px;
  }
`

export const DividerVertical = styled.div`
  border-left: 1px solid #ddd;
  height: 100%;
`
