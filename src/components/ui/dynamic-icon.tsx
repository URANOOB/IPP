import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { HelpCircle, type LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface DynamicIconProps extends LucideProps {
  name?: string
}

export const DynamicIcon = ({ name = 'help-circle', ...props }: DynamicIconProps) => {
  const iconName = useMemo(() => {
    if (!name) return 'help-circle' as keyof typeof dynamicIconImports

    const lowercase = name.toLowerCase() as keyof typeof dynamicIconImports
    if (dynamicIconImports[lowercase]) return lowercase

    return name
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase() as keyof typeof dynamicIconImports
  }, [name])

  const IconComponent = useMemo(() => {
    const loader = dynamicIconImports[iconName]
    if (!loader) return HelpCircle

    return dynamic(loader, {
      loading: () => (
        <div
          className={props.className}
          style={{
            width: props.size || 24,
            height: props.size || 24,
            opacity: 0.1,
          }}
        />
      ),
      ssr: true,
    })
  }, [iconName, props.className, props.size])

  return React.createElement(IconComponent, props)
}
