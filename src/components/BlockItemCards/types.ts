interface Block {
  title: string
  description: string
  img: string
  onClick?: () => void
}

export interface BlockItemCardsProps {
  blocks?: Block[]
  onCardSelect: (cardType: string) => void
}
