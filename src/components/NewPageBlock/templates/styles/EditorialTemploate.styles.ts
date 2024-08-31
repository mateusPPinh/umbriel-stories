import styled from 'styled-components'

export const Container = styled.div``

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 34.5% 64%;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

export const ArticlePreview = styled.div`
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;

  h2,
  p {
    font-family: 'Lora Variable';
  }

  h2 {
    font-weight: bold;
    line-height: 140%;
    font-size: 19px;
  }

  p {
    color: #5a5a5a;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.375rem;
  }

  .articleAuthor {
    margin-top: 1rem;
  }

  span {
    font-size: 11px;
    color: #5a5a5a;
  }
`
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: center;
`

export const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  vertical-align: top;
`
export const BottomSection = styled.div`
  display: flex;

  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }

  main {
    margin-top: 1.5rem;
    border: none;
    border-right: 1px solid #dfdfdf;
    box-sizing: content-box;
    flex-grow: 1;
    margin-top: 15px;
    padding: 0 15px 15px;
    width: 30.4%;

    @media (max-width: 425px) {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0;
      border: none;
    }

    figure {
      margin-bottom: 15px;

      img {
        border-radius: 0;
      }
    }

    h3 {
      font-size: 1.4375rem;
      font-weight: 700;
      line-height: 1.6875rem;
      font-family: 'Lora Variable';
      font-feature-settings: 'kern';
      margin-bottom: 7px;
    }

    p {
      font-size: 0.9375rem;
      font-weight: 500;
      line-height: 1.375rem;
      font-family: 'Lora Variable';
    }

    small {
      font-size: 0.6875rem;
      font-weight: 500;
      line-height: 0.75rem;
      margin-top: 5px;
      font-family: 'Lora Variable';
    }
  }
`
