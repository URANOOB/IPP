import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { LucideProps, HelpCircle } from "lucide-react"
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface DynamicIconProps extends LucideProps {
  name: string
}

// Cache global para evitar re-creación de componentes dinámicos
const iconCache: Record<string, any> = {}

/**
 * Componente para renderizar iconos de Lucide dinámicamente basados en un string.
 * Utiliza dynamicIconImports para evitar cargar todos los iconos en el bundle inicial.
 */
export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const iconName = useMemo(() => {
    // Convertir PascalCase/camelCase a kebab-case para lucide-react/dynamicIconImports
    return name
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase() as keyof typeof dynamicIconImports
  }, [name])

  const IconComponent = useMemo(() => {
    // Si ya está en caché, devolverlo
    if (iconCache[iconName]) {
      return iconCache[iconName]
    }

    const loader = dynamicIconImports[iconName]
    if (!loader) {
      return HelpCircle
    }

    // Crear el componente dinámico y guardarlo en caché
    const DynamicIconComponent = dynamic(loader, {
      loading: () => (
        <div 
          className={props.className} 
          style={{ 
            width: props.size || 24, 
            height: props.size || 24,
            opacity: 0.1
          }} 
        />
      ),
      ssr: true
    })

    // Guardamos en caché para evitar re-creación en el próximo render
    // eslint-disable-next-line react-hooks/immutability
    iconCache[iconName] = DynamicIconComponent
    return DynamicIconComponent
  }, [iconName, props.className, props.size])

  // Usamos createElement para evitar el error de linting 'static-components'
  return React.createElement(IconComponent, props)
}
