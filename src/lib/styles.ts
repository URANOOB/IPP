/**
 * CONFIGURACIÓN DE ESTILOS LOCALES
 * 
 * Aquí definimos la identidad visual de cada entidad para no depender
 * de la base de datos para cambios de diseño (colores, iconos, etc).
 */

export const landingStyles = {
  hero: {
    titleSize: "72px",
    titleColor: "var(--ipp-coral)",
    subtitleSize: "14px",
    subtitleColor: "rgba(96, 48, 72, 0.7)",
    descriptionSize: "20px",
    descriptionColor: "rgba(96, 48, 72, 0.84)",
    buttonColor: "var(--ipp-olive)",
  }
}

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

export const experienceStyles: Record<string, { icon_name: string, accent: string, tint: string }> = {
  "little-readers": {
    icon_name: "BookOpen",
    accent: "var(--ipp-cream)",
    tint: "rgba(255, 200, 74, 0.28)",
  },
  "bridges-memory": {
    icon_name: "Globe2",
    accent: "var(--ipp-sky)",
    tint: "rgba(168, 200, 216, 0.34)",
  },
  "voices-community": {
    icon_name: "Mic",
    accent: "var(--ipp-mint)",
    tint: "rgba(120, 168, 120, 0.22)",
  }
}
