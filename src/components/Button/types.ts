export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'underline'
    | 'rounded'
  className?: string
  isFullWidth?: boolean
  disabled?: boolean
  isLoading?: boolean
}
