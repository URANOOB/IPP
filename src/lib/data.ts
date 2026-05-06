import {
  BookOpen,
  Sprout,
  UsersRound,
  HandHeart,
  Instagram,
} from "lucide-react"
import type { 
  NavItem, 
  Principle, 
  ExperienceItem, 
  MethodStep, 
  Integrante 
} from "@/types/landing"

/**
 * DATOS ESTATICOS Y DE RESPALDO (FALLBACK)
 * 
 * Este archivo sirve como fuente para la carga inicial de la base de datos (seed)
 * y como respaldo en caso de que la conexión con Supabase falle.
 */

export const navItems: NavItem[] = [
  { 
    name: "Inicio", 
    href: "#hero",
    description: "Presentación del proyecto y su propósito.",
    icon: Sprout 
  },
  { 
    name: "Quiénes somos", 
    href: "#project",
    description: "Lectura, comunidad y construcción de paz.",
    icon: UsersRound 
  },
  { 
    name: "Experiencias", 
    href: "#experiences",
    description: "Galerías, relatos y recursos del territorio.",
    icon: BookOpen 
  },
  { 
    name: "Metodología", 
    href: "#method",
    description: "Ruta pedagógica de cada encuentro.",
    icon: HandHeart 
  },
  { 
    name: "Blog", 
    href: "/blog",
    description: "Historias, crónicas y reflexiones del territorio.",
    icon: BookOpen 
  },
]

export const principles: Principle[] = [
  {
    id: "1",
    icon_name: "BookHeart",
    title: "Aprendemos desde lo que somos",
    description: "El inglés se construye desde nuestras historias, nuestros contextos y lo que vivimos cada día.",
    surface_color: "var(--ipp-mint)",
    ink_color: "var(--ipp-plum)",
    chip: "rgba(96, 48, 72, 0.11)",
    glow: "rgba(255, 255, 255, 0.44)",
  },
  {
    id: "2",
    icon_name: "HeartHandshake",
    title: "El error también habla",
    description: "Creamos espacios seguros donde equivocarse es parte del proceso y aprender se siente libre.",
    surface_color: "var(--ipp-cream)",
    ink_color: "var(--ipp-coral)",
    chip: "rgba(192, 96, 72, 0.12)",
    glow: "rgba(255, 255, 255, 0.36)",
  },
  {
    id: "3",
    icon_name: "MapPinHouse",
    title: "El idioma se vuelve puente",
    description: "Usamos el inglés para conectar realidades, compartir voces y cruzar fronteras simbólicas.",
    surface_color: "var(--ipp-coral)",
    ink_color: "var(--ipp-paper)",
    chip: "rgba(96, 48, 72, 0.1)",
    glow: "rgba(255, 255, 255, 0.3)",
  },
  {
    id: "4",
    icon_name: "Cuboid",
    title: "Imaginamos otros mundos",
    description: "A través del idioma creamos futuros posibles, sueños colectivos y nuevas formas de nombrarnos.",
    surface_color: "var(--ipp-earth)",
    ink_color: "var(--ipp-paper)",
    chip: "rgba(255, 248, 232, 0.16)",
    glow: "rgba(255, 255, 255, 0.14)",
  },
]

export const experiences: ExperienceItem[] = [
  {
    id: "little-readers",
    title: "Little Readers Pa' la Paz",
    folder: "Lectura Viva",
    eyebrow: "Niñas y niños de 7 a 13 años",
    summary:
      "Círculos de lectura en inglés para niñas y niños, donde los cuentos, las emociones y la creación manual abren espacio para aprender en comunidad.",
    description:
      "Experiencia de lectura en inglés para niñas y niños, donde los cuentos, las emociones y la creación manual fortalecen el aprendizaje en comunidad.",
    image: "/images/ipp/logo_png3.png",
    icon_name: "BookOpen",
    resource_folder: "Little-reader",
    resources: [
      {
        title: "Portada de la experiencia",
        type: "Imagen",
        image: "/images/ipp/logo_png3.png",
      },
    ],
    accent: "var(--ipp-cream)",
    tint: "rgba(255, 200, 74, 0.28)",
  },
  {
    id: "bridges-memory",
    title: "Bridges of Memory",
    folder: "Memoria y Territorio",
    eyebrow: "Conversación crítica",
    summary:
      "Club conversacional en inglés para narrar memoria, paz territorial y procesos comunitarios desde una mirada crítica.",
    description:
      "Espacio conversacional en inglés para explorar memoria, territorio y construcción de paz desde preguntas críticas y experiencias compartidas.",
    image: "/images/ipp/logo_png3.png",
    icon_name: "Globe2",
    resource_folder: "bridges",
    resources: [
      {
        title: "Portada de la experiencia",
        type: "Imagen",
        image: "/images/ipp/logo_png3.png",
      },
    ],
    accent: "var(--ipp-sky)",
    tint: "rgba(168, 200, 216, 0.34)",
  },
  {
    id: "voices-community",
    title: "Voices of the Community",
    folder: "Creación Colectiva",
    eyebrow: "Creación colectiva",
    summary:
      "Galerías, relatos, audios y piezas bilingües creadas desde experiencias reales del territorio y la participación comunitaria.",
    description:
      "Proceso de creación colectiva donde relatos, imágenes y piezas bilingües nacen de las voces, emociones y vivencias del territorio.",
    image: "/images/ipp/logo_png3.png",
    icon_name: "Mic",
    resource_folder: "voices",
    resources: [
      {
        title: "Portada de la experiencia",
        type: "Imagen",
        image: "/images/ipp/logo_png3.png",
      },
    ],
    accent: "var(--ipp-mint)",
    tint: "rgba(120, 168, 120, 0.22)",
  },
]

export const methodSteps: MethodStep[] = [
  {
    id: "1",
    title: "Welcome Time",
    icon_name: "HandHeart",
    color: "var(--ipp-yellow)",
    summary:
      "Nos reconocemos como grupo, compartimos nombres y abrimos el encuentro desde la confianza.",
    items: [
      "Damos la bienvenida a quienes participan.",
      "Compartimos nombres y formas de presentarnos.",
      "Reconocemos cómo llega el grupo al encuentro.",
      "Activamos la escucha and la disposición para aprender.",
    ],
    keywords: ["Bienvenida", "Confianza", "Escucha", "Participación"],
  },
  {
    id: "2",
    title: "Story Time",
    icon_name: "Library",
    color: "var(--ipp-water)",
    summary:
      "Leemos en inglés con imágenes, preguntas, objetos y sonidos que acompañan la historia.",
    items: [
      "Presentamos el cuento y activamos la curiosidad del grupo.",
      "Exploramos vocabulario clave con apoyos visuales y sonoros.",
      "Hacemos preguntas para conectar la historia con la experiencia propia.",
    ],
    keywords: ["Lectura", "Vocabulario", "Imágenes", "Comprensión"],
  },
  {
    id: "3",
    title: "Conversation",
    icon_name: "MessageCircle",
    color: "var(--ipp-green)",
    summary:
      "Hablamos sobre emociones, acciones y experiencias que nacen del cuento y de la vida cotidiana.",
    items: [
      "Abrimos un diálogo breve a partir de lo leído.",
      "Nombramos emociones, acciones y relaciones en inglés y español.",
      "Escuchamos diferentes voces y conectamos ideas del grupo.",
    ],
    keywords: ["Diálogo", "Emociones", "Escucha", "Reflexión"],
  },
  {
    id: "4",
    title: "Crafting Time",
    icon_name: "Palette",
    color: "var(--ipp-coral)",
    summary:
      "Transformamos la experiencia en dibujos, mariposas, postales, máscaras, murales u otras piezas colectivas.",
    items: [
      "Convertimos ideas y palabras en una creación visual o manual.",
      "Trabajamos con materiales sencillos y propuestas abiertas.",
      "Relacionamos la expresión artística con el vocabulario del encuentro.",
    ],
    keywords: ["Creación", "Juego", "Expresión", "Imaginación"],
  },
  {
    id: "5",
    title: "Show Time",
    icon_name: "Presentation",
    color: "var(--ipp-mint)",
    summary:
      "Socializamos lo creado, compartimos en voz alta y reflexionamos sobre la experiencia vivida.",
    items: [
      "Presentamos las creaciones del grupo.",
      "Compartimos palabras, frases o ideas que quedaron del encuentro.",
      "Cerramos con una breve celebración de lo vivido en comunidad.",
    ],
    keywords: ["Cierre", "Voz", "Comunidad", "Celebración"],
  },
]

export const integrantes: Integrante[] = [
  {
    id: "1",
    name: "Vanessa Peña",
    role: "Líder",
    focus: "Gestiona proyectos y convocatorias enfocadas en la cultura, la memoria y la construcción de paz.",
    icon_name: "Users",
    photo_url: "",
    accent_color: "var(--ipp-coral)",
    surface_color: "rgba(192, 96, 72, 0.12)",
  },
  {
    id: "2",
    name: "Gimena Sosa",
    role: "Líder de redes",
    focus: "Diseña e impulsa estrategias de difusión para que la voz del colectivo llegue a más personas.",
    icon_name: "Megaphone",
    photo_url: "",
    accent_color: "var(--ipp-water)",
    surface_color: "rgba(144, 192, 192, 0.24)",
  },
  {
    id: "3",
    name: "Daniel Bustos",
    role: "Líder de redes y apoyo administrativo",
    focus: "Acompaña los procesos administrativos y de gestión para sostener el trabajo de la organización.",
    icon_name: "PenSquare",
    photo_url: "",
    accent_color: "var(--ipp-yellow)",
    surface_color: "rgba(255, 200, 74, 0.18)",
  },
  {
    id: "4",
    name: "Santiago Agudelo",
    role: "Líder de alianzas",
    focus: "Construye alianzas y convenios con otras agrupaciones para ampliar el impacto comunitario.",
    icon_name: "Handshake",
    photo_url: "",
    accent_color: "var(--ipp-green)",
    surface_color: "rgba(120, 168, 120, 0.2)",
  },
  {
    id: "5",
    name: "Diego Guerrero",
    role: "Diseñador",
    focus: "Cuida la imagen del proyecto y traduce la identidad de la iniciativa en piezas visuales claras y cercanas.",
    icon_name: "Sparkles",
    photo_url: "",
    accent_color: "var(--ipp-earth)",
    surface_color: "rgba(255, 240, 192, 0.95)",
  },
  {
    id: "6",
    name: "Lorena Ayala",
    role: "Docente",
    focus: "Lidera conversatorios y experiencias pedagógicas con enfoque en paz, memoria y escucha sensible.",
    icon_name: "BookOpen",
    photo_url: "",
    accent_color: "var(--ipp-plum)",
    surface_color: "rgba(96, 48, 72, 0.1)",
  },
  {
    id: "7",
    name: "Andrés Pabón",
    role: "Docente",
    focus: "Diseña e implementa talleres que conectan el idioma con procesos de expresión y reflexión colectiva.",
    icon_name: "PenSquare",
    photo_url: "",
    accent_color: "var(--ipp-coral)",
    surface_color: "rgba(192, 96, 72, 0.12)",
  },
  {
    id: "8",
    name: "William Galeano",
    role: "Ingeniero de software",
    focus: "Desarrolla herramientas web digitales que apoyan el trabajo comunitario del proyecto.",
    icon_name: "Code2",
    photo_url: "",
    accent_color: "var(--ipp-yellow)",
    surface_color: "rgba(255, 200, 74, 0.18)",
  },
  {
    id: "9",
    name: "Walter Ardila",
    role: "Ingeniero de tecnologías y de software",
    focus: "Desarrolla herramientas web y garantiza el uso y funcionamiento de los recursos tecnológicos en encuentros, talleres y eventos.",
    icon_name: "MonitorCog",
    photo_url: "",
    accent_color: "var(--ipp-water)",
    surface_color: "rgba(144, 192, 192, 0.24)",
  },
  {
    id: "10",
    name: "Tatiana Martínez",
    role: "Administradora",
    focus: "Aporta en la gestión legal y administrativa para que los procesos del colectivo sigan avanzando.",
    icon_name: "ClipboardList",
    photo_url: "",
    accent_color: "var(--ipp-green)",
    surface_color: "rgba(120, 168, 120, 0.2)",
  },
  {
    id: "11",
    name: "Johan Mellizo",
    role: "Docente",
    focus: "Diseña clases, conversatorios y planeadores desde una mirada pedagógica situada y participativa.",
    icon_name: "BookOpen",
    photo_url: "",
    accent_color: "var(--ipp-plum)",
    surface_color: "rgba(96, 48, 72, 0.1)",
  },
]

export const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ingles.pa.lapaz/",
    icon: Instagram,
  },
]

export const contactInfo = {
  email: "inglespalapaz@gmail.com",
  tiktok: "https://www.tiktok.com/@ingles.pa.lapaz",
}
