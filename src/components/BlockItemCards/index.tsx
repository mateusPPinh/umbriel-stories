import { type ReactElement } from 'react'
import { Container, BlockItem } from './styles'
import { type BlockItemCardsProps } from './types'

export default function BlockItemCards({
  blocks,
  onCardSelect,
  customImgCSS,
  customMainCss,
  customParagraphCSS,
  customSpanCSS,
}: BlockItemCardsProps & {
  onCardSelect: (cardType: string) => void
}): ReactElement {
  return (
    <Container>
      {blocks?.map((block, index) => (
        <BlockItem
          key={index}
          onClick={() => {
            onCardSelect(block.title)
          }}
        >
          <main className={customMainCss}>
            <span className={customSpanCSS}>{block.title}</span>
            <p className={customParagraphCSS}>{block.description}</p>
          </main>
          <img className={customImgCSS} src={block.img} alt={block.title} />
        </BlockItem>
      ))}
    </Container>
  )
}
