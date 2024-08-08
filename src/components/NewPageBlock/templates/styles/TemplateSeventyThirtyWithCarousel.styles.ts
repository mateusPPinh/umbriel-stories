import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const LeftSection = styled.div`
  width: 70%;
  padding-right: 10px;
  border-right: 1px solid #dfdfdf;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid #dfdfdf;
  }
`

export const RightSection = styled.div`
  width: 30%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;

  .articleContainer__border_bottom {
    border-bottom: 1px solid #dfdfdf;
    margin-bottom: 19px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;

    .articleContainer__border_bottom {
      margin-bottom: 0;
    }
  }
`

export const VideoBlock = styled.div`
  margin-bottom: 20px;

  .video__border_bottom {
    border-bottom: 1px solid #dfdfdf;
    margin-top: 19px;
    margin-bottom: 19px;
  }

  video {
    width: 100%;
    height: 100%;
    min-height: 216px;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    margin-top: 2rem;

    .video__border_bottom {
      margin: 10px 0;
    }
  }
`

export const ArticleContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 19px;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:not(:last-child) {
      border-right: 1px solid #dfdfdf;
      padding-right: 14px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    margin-top: 10px;

    > div {
      width: 100%;
      border-right: none;
      padding-right: 0;
      border-bottom: none;
      padding-bottom: 10px;
      margin-bottom: 10px;
      &:not(:last-child) {
        border-right: none;
        padding: 0;
        padding-bottom: 1rem;
        border-bottom: none;
      }
    }
  }
`

export const ArticleBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 6px;
  }

  h3 {
    font-size: 1rem;
    line-height: 130%;
    font-family: ${(props) => props.theme.fonts.dmSans};
    width: 100%;
    font-weight: bold;
  }

  p {
    font-size: 14px;
    color: #555;
    font-family: ${(props) => props.theme.fonts.dmSans};
  }

  @media (max-width: 768px) {
    img {
      width: 100%;
    }

    h3 {
      font-size: 1rem;
      line-height: 140%;
    }

    p {
      font-size: 14px;
    }
  }
`

export const BottomBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 9px;
  margin-bottom: 9px;

  .text-content {
    flex: 1;
    margin-right: 10px;

    h3 {
      font-size: 1rem;
      line-height: 130%;
      font-family: ${(props) => props.theme.fonts.dmSans};
      width: calc(325px - 101px);
      font-weight: bold;
    }

    p {
      font-size: 13px;
      color: #555;
      line-height: 140%;
      width: calc(325px - 101px);
      font-family: ${(props) => props.theme.fonts.dmSans};
      margin-top: 6px;
    }
  }

  img {
    width: 100%;
    max-width: 150px;
    max-height: 100px;
    height: auto;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;

    .text-content {
      width: 100%;
      margin-right: 0;
      margin-bottom: 10px;

      h3,
      p {
        width: 100%;
      }
    }

    img {
      width: 97px;
      max-width: 97px;
    }
  }
`

export const CarrouselControlls = styled.div`
  position: absolute;
  top: 40%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);

  &:first-child {
    margin-left: 20px;
  }

  &:last-child {
    margin-right: 20px;
  }
`

export const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0, rgba(0, 0, 0, 0.9), transparent 80%);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 375px) {
    padding: 6px;
  }

  @media (max-width: 320px) {
    padding: 5px;
  }
`

export const TextOverlay = styled.div`
  color: white;
  max-width: 785px;
  width: 100%;
  margin-bottom: 3rem;
  margin-left: 25px;

  h2 {
    margin: 0;
    font-size: 48px;
    font-weight: bold;
    line-height: 120%;
    font-family: ${(props) => props.theme.fonts.dmSans};
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    margin: 5px 0 0;
    font-size: 16px;
    font-family: ${(props) => props.theme.fonts.dmSans};
    line-height: 140%;
    font-weight: 400;
    max-width: 655px;
  }

  @media (max-width: 768px) {
    margin-left: 10px;
    margin-bottom: 3rem;

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    margin-left: 10px;
    margin-bottom: 0;
    h2 {
      font-size: 19px;
    }

    p {
      font-size: 11px;
    }
  }

  @media (max-width: 375px) {
    margin-left: 5px;
    margin-bottom: 0;
    h2 {
      font-size: 18px;
    }

    p {
      font-size: 10px;
      width: 100%;
    }
  }

  @media (max-width: 320px) {
    h2 {
      font-size: 16px;
    }

    p {
      font-size: 9px;
    }
  }
`

export const Carousel = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;

  .carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
  }

  .carousel-item {
    min-width: 100%;
    box-sizing: border-box;
    position: relative;

    img {
      border-radius: 6px;
    }
  }
`
