import { type ReactElement } from 'react'
import { Container } from './styles'
import { type SideMenuProps } from './types'

export default function SideMenu ({ menu }: SideMenuProps): ReactElement {
  return (
    <Container>
      {menu.map((section, index) => (
        <ul key={index}>
          <li>{section.title}</li>
          {section.items.map((item, itemIndex) => (
            <span key={itemIndex} onClick={item.onClick}>
              {item.label}
            </span>
          ))}
        </ul>
      ))}
    </Container>
  )
}
