import { type ReactElement } from 'react'
import { type TopbarProps } from './types'
import { Container } from './styles'
import ArrowLeft from '../../../public/icons/ArrowLeft'
import ArrowRight from '../../../public/icons/ArrowRight'

export default function Topbar({
  topbarDescriptionChild,
  topbarBgColor,
  items = [],
  variant,
  logo,
  centralContent,
  onLogoClick,
  className = 'py-[10px]',
}: TopbarProps): ReactElement {
  return (
    <Container
      style={{
        backgroundColor: topbarBgColor,
        borderBottom: '1px solid #E4E4E7',
      }}
      className={className}
      $variant={variant}
    >
      <nav>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="hover:opacity-75 transition-opacity"
          >
            {item.hasIcon?.isGobackIcon && <ArrowLeft fill="#27272A" />}
            {item.hasIcon?.isNextIcon && <ArrowRight fill="#27272A" />}
            {variant !== 'topbarDefault' && <span>{item.label}</span>}
          </button>
        ))}
        {variant === 'topbarDefault' && logo && (
          <button
            onClick={onLogoClick}
            className="topbarDefaultContainer hover:opacity-75 transition-opacity"
          >
            {logo}
          </button>
        )}
      </nav>

      {variant === 'topbarDefault' && centralContent && (
        <div className="central-content">{centralContent}</div>
      )}

      <div>{topbarDescriptionChild}</div>
    </Container>
  )
}
