import { type ReactElement } from 'react'
import { Container, BlockItem } from './styles'
import { type BlockItemCardsProps } from './types'

export default function BlockItemCards ({ blocks }: BlockItemCardsProps): ReactElement {
  return (
    <Container>
      {blocks?.map((block, index) => (
        <BlockItem key={index}>
          <main>
            <span>{block.title}</span>
            <p>{block.description}</p>
          </main>
          <img src={block.img} alt={block.title} />
        </BlockItem>
      ))}
    </Container>
  )
}
