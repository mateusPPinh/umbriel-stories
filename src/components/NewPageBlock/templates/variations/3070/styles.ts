import styled, { css } from 'styled-components'

export const Container = styled.div<{
  $t3070ContainerProps?: {
    backgroundColor?: string
    padding?: string
    paddingBottom?: string
    paddingTop?: string
    width?: string
    maxWidth?: string
    height?: string
    maxHeight?: string
    tailwindClasses?: string
    mr?: string
    ml?: string
    mt?: string
    mb?: string
    radius?: string
  }
}>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  ${({ $t3070ContainerProps }) => {
    const {
      backgroundColor = 'transparent',
      padding = '0 20px',
      paddingBottom,
      paddingTop,
      width = 'auto',
      maxWidth = 'none',
      height = 'auto',
      maxHeight = 'none',
      tailwindClasses = '',
      mr = 'none',
      ml = 'none',
      mt = 'none',
      mb = 'none',
      radius = 'none',
    } = $t3070ContainerProps ?? {}

    return css`
      background-color: ${backgroundColor};
      padding: ${padding};
      ${paddingTop &&
      css`
        padding-top: ${paddingTop};
      `}
      ${paddingBottom &&
      css`
        padding-bottom: ${paddingBottom};
      `}
      width: ${width};
      max-width: ${maxWidth};
      height: ${height};
      max-height: ${maxHeight};
      margin-right: ${mr};
      margin-left: ${ml};
      margin-top: ${mt};
      margin-bottom: ${mb};
      border-radius: ${radius} ${tailwindClasses};
    `
  }}

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

export const ArticleRowBorderTop = styled.div<{
  $rowColumnBorderTopColor?: string
  $isDarkMode?: boolean | null
}>`
  border-top-width: 1px;
  ${({ $rowColumnBorderTopColor, $isDarkMode }) => {
    if ($isDarkMode) {
      return `background-color: ${$rowColumnBorderTopColor}`
    } else {
      return css`
        background-color: #d1d5db;
      `
    }
  }};
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

export const ArticlePreview = styled.div<{
  $isDarkMode?: boolean | null
  $columnCSSProps?: {
    $titleColor: string
    $subtitleColor: string
  }
}>`
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;

  h2 + p {
    margin-top: 0.8rem;
  }

  h2 {
    font-weight: bold;
    line-height: 140%;
    font-size: 19px;
    ${({ $isDarkMode, $columnCSSProps }) => {
      if ($isDarkMode) {
        return css`
          color: ${$columnCSSProps?.$titleColor ?? '#FFFFFF'};
        `
      }
    }}
  }

  p {
    font-size: 16px;
    line-height: 140%;
    color: ${({ $columnCSSProps }) =>
      $columnCSSProps?.$subtitleColor || '#5a5a5a'};
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

export const ArticleRowContainer = styled.div<{
  $articlesPerRow: number | boolean
  $articleRowContainerProps: {
    direction?: string
    bgColor?: string
  }
}>`
  display: flex;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }

  ${({ $articlesPerRow }) => {
    if ($articlesPerRow === 6) {
      return css`
        gap: 20px;
        flex-direction: row;
        justify-content: space-between;
      `
    } else {
      return null
    }
  }};

  ${({ $articleRowContainerProps }) => {
    const { direction = 'row', bgColor = 'transparent' } =
      $articleRowContainerProps ?? {}

    return css`
      flex-direction: ${direction};
      background-color: ${bgColor};
    `
  }}
`

export const ArticleRow = styled.div<{
  $articlesPerRow: number
  $rowColumnCSSProps?: {
    titleColor: string
  }
}>`
  flex: 1;
  background-color: transparent;
  padding: 10px;
  display: flex;
  flex-direction: column; /* Organiza artigos em coluna */

  h2 {
    font-weight: bold;
    line-height: 140%;
    font-size: 14px;
    color: ${({ $rowColumnCSSProps }) =>
      $rowColumnCSSProps?.titleColor || '#5a5a5a'};
  }

  span {
    font-size: 11px;
    color: #5a5a5a;
  }

  &:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }

  /* Se for 6 artigos, remove o border-right e aplica o espaçamento vertical */
  ${({ $articlesPerRow }) =>
    $articlesPerRow === 6 &&
    `
      border-right: none;
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 20px; /* Adiciona espaçamento vertical entre os artigos */
    `}

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
