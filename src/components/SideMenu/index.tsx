import { type ReactElement } from 'react'
import { Container } from './styles'
import { type SideMenuProps } from './types'

export default function SideMenu({
  menu,
  className,
}: SideMenuProps): ReactElement {
  return (
    <Container className={className}>
      {menu.map((section, index) => (
        <ul key={index}>
          <li className="font-heading">{section.title}</li>
          {section.items.map((item, itemIndex) => (
            <span
              className="font-heading"
              key={itemIndex}
              onClick={item.onClick}
            >
              {item.label}
            </span>
          ))}
        </ul>
      ))}
    </Container>
  )
}
