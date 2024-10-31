import styled from 'styled-components'

const PageArticleContainer = styled.div<{
  $articleBodyWidth: string | null
  $articleBodyMaxWidth: string | null
}>`
  width: ${(props) => props.$articleBodyWidth};
  max-width: ${(props) => props.$articleBodyMaxWidth};

  @media (min-width: ${(props) => props.theme.queries.xs}) {
    width: 550px;
    margin-left: 2rem;
    margin-right: 1rem;
  }

  @media (min-width: 320px) {
    width: 550px;
    margin-left: 2rem;
    margin-right: 1rem;
  }

  @media (min-width: ${(props) => props.theme.queries.xl}) {
    width: 100%;
    min-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: ${(props) => props.theme.queries.lg}) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: ${(props) => props.theme.queries.md}) {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: ${(props) => props.theme.queries.md}) {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`

const AuthorAndShareContainer = styled.section<{
  $authorAndShareContainerTop?: string
  $authorAndShareContainerBottom?: string
  $authorContainerWidth?: string
  $authorContainerMaxWidth?: string
}>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: ${(props) => props.$authorAndShareContainerTop};
  margin-bottom: ${(props) => props.$authorAndShareContainerBottom};
  width: ${(props) => props.$authorContainerWidth};
  max-width: ${(props) => props.$authorContainerMaxWidth};
`

export { PageArticleContainer, AuthorAndShareContainer }
