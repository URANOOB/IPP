/**
 * @file data.ts
 * @description Almacén central de datos estáticos y configuraciones de contenido.
 * Contiene los textos, rutas e identificadores que estructuran la landing page y el blog.
 * Actúa como respaldo (fallback) cuando no hay datos dinámicos disponibles.
 */

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
 * Textos y configuraciones predeterminadas para las secciones de la landing page.
 */
export const landingDefaults = {
  /** Sección Hero: Cabecera principal. */
  hero: {
    title: "Inglés Pa' la Paz",
    subtitle: "Proyecto educativo y comunitario en Colombia",
    description: "Usamos relatos, diálogo y experiencias creativas para que niñas, niños y comunidades vivan el inglés como una herramienta cercana para aprender, expresarse y construir paz desde su historia y su territorio.",
    buttonText: "Conoce el proyecto",
    imageUrl: "/images/ipp/logo_png3.png",
    bgImage: "/images/ipp/butterflies_banner3.png",
    cards: [
      { text: "Círculos de lectura", icon: "BookOpen" },
      { text: "Paz y emociones", icon: "HandHeart" },
      { text: "Comunidad y territorio", icon: "MapPin" },
    ]
  },
  /** Sección Info: "Quiénes Somos" y Misión. */
  info: {
    title: "Inglés para la paz desde la lectura, la conversación y el territorio.",
    description: "En Inglés Pa' la Paz creamos experiencias de aprendizaje donde el inglés emerge desde la lectura, la conversación y la creación colectiva. Usamos relatos, preguntas, recursos emocionales y actividades artísticas para que niñas, niños y comunidades vivan el inglés como una herramienta cercana para expresar lo que son, lo que sienten y lo que imaginan.",
    imageUrl: "/images/ipp/banner-referencia.jpg",
  },
  /** Sección Process: Metodología y pasos del encuentro. */
  process: {
    title: "Así vivimos cada encuentro de Inglés pa' la Paz",
    description: "En Inglés Pa' la Paz buscamos enseñar inglés desde la lectura, la conversación y la creación de piezas bilingües a partir de experiencias reales del territorio y la participación comunitaria.",
    subtitle: "Ruta de cada encuentro",
    summary: "Cada momento del encuentro tiene una intención pedagógica clara y una forma distinta de acercarse al idioma, la emoción y la creación colectiva.",
  },
  /** Sección Integrantes: Equipo de trabajo. */
  integrantes: {
    title: "Quiénes hacen posible Inglés Pa' la Paz",
    description: "Un equipo colombiano que une pedagogía, memoria, tecnología, cultura y trabajo comunitario.",
  },
  /** Sección Experiences: Galerías y proyectos específicos. */
  experiences: {
    title: "Así se vive el inglés cuando nace desde el territorio",
    subtitle: "Explora nuestras experiencias",
  }
}

/**
 * Elementos de navegación global utilizados en el Header y Sidebar.
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

/**
 * Principios fundamentales del proyecto que se muestran en la sección Info.
 */
export const principles: Partial<Principle>[] = [
  {
    id: "1",
    title: "Aprendemos desde lo que somos",
    description: "El inglés se construye desde nuestras historias, nuestros contextos y lo que vivimos cada día.",
  },
  {
    id: "2",
    title: "El error también habla",
    description: "Creamos espacios seguros donde equivocarse es parte del proceso y aprender se siente libre.",
  },
  {
    id: "3",
    title: "El idioma se vuelve puente",
    description: "Usamos el inglés para conectar realidades, compartir voces y cruzar fronteras simbólicas.",
  },
  {
    id: "4",
    title: "Imaginamos otros mundos",
    description: "A través del idioma creamos futuros posibles, sueños colectivos y nuevas formas de nombrarnos.",
  },
]

/**
 * Definición de las experiencias (proyectos) del colectivo.
 * Cada una vincula una carpeta de recursos en el sistema de archivos.
 */
export const experiences: Partial<ExperienceItem>[] = [
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
    resource_folder: "Little-reader",
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
    resource_folder: "bridges",
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
    resource_folder: "voices",
  },
]

/**
 * Pasos detallados de la metodología pedagógica.
 */
export const methodSteps: Partial<MethodStep>[] = [
  {
    id: "1",
    title: "Welcome Time",
    summary:
      "Nos reconocemos como grupo, compartimos nombres y abrimos el encuentro desde la confianza.",
    items: [
      "Damos la bienvenida a quienes participan.",
      "Compartimos nombres y formas de presentarnos.",
      "Reconocemos cómo llega el grupo al encuentro.",
      "Activamos la escucha y la disposición para aprender.",
    ],
    keywords: ["Bienvenida", "Confianza", "Escucha", "Participación"],
  },
  {
    id: "2",
    title: "Story Time",
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

/**
 * Datos del equipo de trabajo utilizados como fallback.
 */
export const integrantes: Partial<Integrante>[] = [
  {
    id: "1",
    name: "Vanessa Peña",
    role: "Líder",
    focus: "Gestiona proyectos y convocatorias enfocadas en la cultura, la memoria y la construcción de paz.",
    photo_url: "",
  },
  {
    id: "2",
    name: "Gimena Sosa",
    role: "Líder de redes",
    focus: "Diseña e impulsa estrategias de difusión para que la voz del colectivo llegue a más personas.",
    photo_url: "",
  },
  {
    id: "3",
    name: "Daniel Bustos",
    role: "Líder de redes y apoyo administrativo",
    focus: "Acompaña los procesos administrativos y de gestión para sostener el trabajo de la organización.",
    photo_url: "",
  },
  {
    id: "4",
    name: "Santiago Agudelo",
    role: "Líder de alianzas",
    focus: "Construye alianzas y convenios con otras agrupaciones para ampliar el impacto comunitario.",
    photo_url: "",
  },
  {
    id: "5",
    name: "Diego Guerrero",
    role: "Diseñador",
    focus: "Cuida la imagen del proyecto y traduce la identidad de la iniciativa en piezas visuales claras y cercanas.",
    photo_url: "",
  },
  {
    id: "6",
    name: "Lorena Ayala",
    role: "Docente",
    focus: "Lidera conversatorios y experiencias pedagógicas con enfoque en paz, memoria y escucha sensible.",
    photo_url: "",
  },
  {
    id: "7",
    name: "Andrés Pabón",
    role: "Docente",
    focus: "Diseña e implementa talleres que conectan el idioma con procesos de expresión y reflexión colectiva.",
    photo_url: "",
  },
  {
    id: "8",
    name: "William Galeano",
    role: "Ingeniero de software",
    focus: "Desarrolla herramientas web digitales que apoyan el trabajo comunitario del proyecto.",
    photo_url: "",
  },
  {
    id: "9",
    name: "Walter Ardila",
    role: "Ingeniero de tecnologías y de software",
    focus: "Desarrolla herramientas web y garantiza el uso y funcionamiento de los recursos tecnológicos en encuentros, talleres y eventos.",
    photo_url: "",
  },
  {
    id: "10",
    name: "Tatiana Martínez",
    role: "Administradora",
    focus: "Aporta en la gestión legal y administrativa para que los procesos del colectivo sigan avanzando.",
    photo_url: "",
  },
  {
    id: "11",
    name: "Johan Mellizo",
    role: "Docente",
    focus: "Diseña clases, conversatorios y planeadores desde una mirada pedagógica situada y participativa.",
    photo_url: "",
  },
]

/**
 * Enlaces a redes sociales oficiales.
 */
export const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ingles.pa.lapaz/",
    icon: Instagram,
  },
]

/**
 * Información de contacto general.
 */
export const contactInfo = {
  email: "inglespalapaz@gmail.com",
  tiktok: "https://www.tiktok.com/@ingles.pa.lapaz",
}
