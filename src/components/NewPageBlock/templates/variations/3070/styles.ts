import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: transparent;
  padding: 0 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
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
  color: #D0021B;
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

  span {
    font-size: 11px;
    color: #5a5a5a;
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
