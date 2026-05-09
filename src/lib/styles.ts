/**
 * @file styles.ts
 * @description Configuración centralizada de la identidad visual del proyecto.
 * Define los estilos, colores e iconos asociados a cada entidad (principios, metodología, equipo).
 * Esto permite cambios de diseño rápidos sin necesidad de modificar la lógica de los componentes.
 */

/**
 * Estilos específicos para las secciones de la landing page.
 */
export const landingStyles = {
  /** Estilos de la cabecera principal (Hero). */
  hero: {
    titleSize: "72px",
    titleColor: "var(--ipp-coral)",
    subtitleSize: "14px",
    subtitleColor: "rgba(96, 48, 72, 0.7)",
    descriptionSize: "20px",
    descriptionColor: "rgba(96, 48, 72, 0.84)",
    buttonColor: "var(--ipp-olive)",
    buttonShadow: "6px 6px 0 rgba(96, 48, 72, 0.22)",
    cardShadow: "4px 4px 0 rgba(96, 48, 72, 0.08)",
    logoShadow: "drop-shadow(8px 8px 0 rgba(96, 48, 72, 0.12))",
  }
}

/**
 * Mapeo de identidad visual para los principios del proyecto.
 * Cada clave corresponde al título exacto del principio.
 */
export const principleStyles: Record<string, { icon_name: string, surface_color: string, ink_color: string, chip: string, glow: string }> = {
  "Aprendemos desde lo que somos": {
    icon_name: "BookHeart",
    surface_color: "var(--ipp-mint)",
    ink_color: "var(--ipp-plum)",
    chip: "rgba(96, 48, 72, 0.11)",
    glow: "rgba(255, 255, 255, 0.44)",
  },
  "El error también habla": {
    icon_name: "HeartHandshake",
    surface_color: "var(--ipp-cream)",
    ink_color: "var(--ipp-coral)",
    chip: "rgba(192, 96, 72, 0.12)",
    glow: "rgba(255, 255, 255, 0.36)",
  },
  "El idioma se vuelve puente": {
    icon_name: "MapPinHouse",
    surface_color: "var(--ipp-coral)",
    ink_color: "var(--ipp-paper)",
    chip: "rgba(96, 48, 72, 0.1)",
    glow: "rgba(255, 255, 255, 0.3)",
  },
  "Imaginamos otros mundos": {
    icon_name: "Cuboid",
    surface_color: "var(--ipp-earth)",
    ink_color: "var(--ipp-paper)",
    chip: "rgba(255, 248, 232, 0.16)",
    glow: "rgba(255, 255, 255, 0.14)",
  }
}

/**
 * Estilos visuales para los pasos de la metodología.
 */
export const methodologyStyles: Record<string, { icon_name: string, color: string }> = {
  "Welcome Time": {
    icon_name: "HandHeart",
    color: "var(--ipp-yellow)",
  },
  "Story Time": {
    icon_name: "Library",
    color: "var(--ipp-water)",
  },
  "Conversation": {
    icon_name: "MessageCircle",
    color: "var(--ipp-green)",
  },
  "Crafting Time": {
    icon_name: "Palette",
    color: "var(--ipp-coral)",
  },
  "Show Time": {
    icon_name: "Presentation",
    color: "var(--ipp-mint)",
  }
}

/**
 * Configuración de identidad personalizada para cada integrante del equipo.
 * Se utiliza el nombre como clave para vincular datos dinámicos con estilos fijos.
 */
export const teamStyles: Record<string, { icon_name: string, accent_color: string, surface_color: string }> = {
  "Vanessa Peña": {
    icon_name: "Users",
    accent_color: "var(--ipp-coral)",
    surface_color: "rgba(192, 96, 72, 0.12)",
  },
  "Gimena Sosa": {
    icon_name: "Megaphone",
    accent_color: "var(--ipp-water)",
    surface_color: "rgba(144, 192, 192, 0.24)",
  },
  "Daniel Bustos": {
    icon_name: "PenSquare",
    accent_color: "var(--ipp-yellow)",
    surface_color: "rgba(255, 200, 74, 0.18)",
  },
  "Santiago Agudelo": {
    icon_name: "Handshake",
    accent_color: "var(--ipp-green)",
    surface_color: "rgba(120, 168, 120, 0.2)",
  },
  "Diego Guerrero": {
    icon_name: "Sparkles",
    accent_color: "var(--ipp-earth)",
    surface_color: "rgba(255, 240, 192, 0.95)",
  },
  "Lorena Ayala": {
    icon_name: "BookOpen",
    accent_color: "var(--ipp-plum)",
    surface_color: "rgba(96, 48, 72, 0.1)",
  },
  "Andrés Pabón": {
    icon_name: "PenSquare",
    accent_color: "var(--ipp-coral)",
    surface_color: "rgba(192, 96, 72, 0.12)",
  },
  "William Galeano": {
    icon_name: "Code2",
    accent_color: "var(--ipp-yellow)",
    surface_color: "rgba(255, 200, 74, 0.18)",
  },
  "Walter Ardila": {
    icon_name: "MonitorCog",
    accent_color: "var(--ipp-water)",
    surface_color: "rgba(144, 192, 192, 0.24)",
  },
  "Tatiana Martínez": {
    icon_name: "ClipboardList",
    accent_color: "var(--ipp-green)",
    surface_color: "rgba(120, 168, 120, 0.2)",
  },
  "Johan Mellizo": {
    icon_name: "BookOpen",
    accent_color: "var(--ipp-plum)",
    surface_color: "rgba(96, 48, 72, 0.1)",
  }
}

/**
 * Estilos para las tarjetas de experiencias (Bento Grid).
 */
export const experienceStyles: Record<string, { icon_name: string, accent: string, tint: string }> = {
  "little-readers": {
    icon_name: "BookOpen",
    accent: "var(--ipp-cream)",
    tint: "rgba(255, 200, 74, 0.28)",
  },
  "bridges-memory": {
    icon_name: "Map",
    accent: "var(--ipp-sky)",
    tint: "rgba(168, 200, 216, 0.34)",
  },
  "voices-community": {
    icon_name: "Mic",
    accent: "var(--ipp-mint)",
    tint: "rgba(120, 168, 120, 0.22)",
  }
}
