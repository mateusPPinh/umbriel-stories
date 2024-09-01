import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: transparent;
  padding: 0 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 275px) minmax(0, auto) minmax(0, 300px);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
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

  h2,
  p {
    font-family: 'Lora Variable';
    margin-top: 0.5rem;
    font-size: 13px;
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

  span {
    font-size: 11px;
    color: #5a5a5a;
  }
`

export const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  height: auto;
`

export const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .captions {
    font-size: 12px;
    color: #5a5a5a;
  }

  @media (max-width: 1024px) {
    order: -1;
  }
`

export const LiveBadge = styled.div`
  color: #d0021b;
  font-size: 12px;
  font-weight: bold;
`

export const UpdatesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    font-size: 12px;
  }
`

export const Update = styled.div`
  background-color: black;
  color: white;
  border-radius: 25px;
  width: 20px;
  padding: 0px;
  font-size: 11px;
  text-align: center;
`

export const ArticleRowContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`

export const ArticleRow = styled.div`
  flex: 1;
  background-color: transparent;
  padding: 10px;

  h2 {
    font-family: 'Lora Variable';
    font-weight: bold;
    line-height: 140%;
    font-size: 14px;
  }

  p {
    font-size: 13px;
    color: #5a5a5a;
    margin-top: 0.5rem;
    font-family: 'Lora Variable';
  }

  &:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;

    &:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
    }
  }
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 10px 0;
`

export const DividerBottom = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 0;
`

export const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100% !important;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    border-left: none;
  }
`

export const NewsletterSection = styled.section`
  padding-left: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  /* @media (max-width: 1024px) {
    > :first-child {
      display: flex;
      align-items: center;
    }
  } */

  h3 {
    font-family: 'Lora Variable';
    font-weight: bold;
    line-height: 140%;
    font-size: 1.2rem;
  }

  img {
    margin-top: 1rem;
  }
`

export const NewsletterPreview = styled.div`
  h2 {
    font-size: 1rem;
    font-family: 'Lora Variable';
    margin-left: 0.8rem;
  }
`
export const NewSletterPreviewSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const NewSletterPreviewImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #f87171;
`
export const BorderLeft = styled.div`
  border-left-width: 1px;
  border-color: #d1d5db;
`
