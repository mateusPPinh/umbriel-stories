/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from 'react'
import { type ReactElement } from 'react'
import { Container } from './styles'
import { type SideMenuProps } from './types'

export default function SideMenu({
  menu,
  className,
  customListStyle,
  customTitleStyle = '',
  hiddeSideMenu,
}: SideMenuProps): ReactElement {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const handleToggleItem = (childrenUniqueId: string, hasChildren: boolean) => {
    if (!hasChildren) return
    const isItemExpanded = expandedItems.includes(childrenUniqueId)

    setExpandedItems((prev) =>
      isItemExpanded
        ? prev.filter((itemId) => itemId !== childrenUniqueId)
        : [...prev, childrenUniqueId]
    )
  }

  const handleClick = (
    item: {
      label: string
      onClick?: () => void
      children?: Array<{ label: string; onClick?: () => void }>
      childrenUniqueId: string
    },
    hasChildren: boolean
  ): void => {
    if (!hasChildren && item.onClick) {
      item.onClick()
    } else {
      handleToggleItem(item.childrenUniqueId, hasChildren)
    }
  }

  return (
    <Container className={className} $hiddeSideMenu={hiddeSideMenu}>
      {menu.map((section, index) => (
        <ul key={index} className={customListStyle}>
          <li className="font-heading">{section.title}</li>
          {section.items.map((item, itemIndex) => (
            <div key={itemIndex}>
              {item.children &&
              expandedItems.includes(item.childrenUniqueId) ? (
                <div className="isChildren">
                  <span
                    className={`${customTitleStyle} ${
                      expandedItems.includes(item.childrenUniqueId)
                        ? 'highlight'
                        : ''
                    }`}
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
                      // @ts-ignore
                      handleClick(item, !!item.children)
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ) : (
                <span
                  className={customTitleStyle}
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
                    // @ts-ignore
                    handleClick(item, !!item.children)
                  }}
                >
                  {item.label}
                </span>
              )}

              {item.children && (
                <ul
                  className={`submenu ${
                    expandedItems.includes(item.childrenUniqueId) ? 'open' : ''
                  }`}
                >
                  {item.children.map((child, childIndex) => (
                    <li
                      key={childIndex}
                      className="submenu-item"
                      onClick={child.onClick}
                    >
                      {child.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      ))}
    </Container>
  )
}
