interface SkeletonVariantProps {
  variant: 'title' | 'subtitle'
  customHorizontalSpacing?: string
}

const SwitchTitleSubtitleSkeleton = ({ variant, customHorizontalSpacing }: SkeletonVariantProps) => {
  const literals = {
    title: {
      width: 'w-3/4',
      height: 'h-2.5',
    },
    subtitle: {
      width: 'w-1/2',
      height: 'h-2',
    },
  }
  return (
    <div className={`flex ${customHorizontalSpacing}`}>
      <div className={`h-2.5 rounded bg-gray-200/50 ${literals[variant].width}`} /> 
    </div>
  )
}

export default SwitchTitleSubtitleSkeleton