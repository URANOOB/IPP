-- SCRIPT DE CONFIGURACIÓN PARA EL CMS INLINE
-- Copia y pega este contenido en el SQL Editor de Supabase y dale a "Run".

-- 1. Crear la tabla de contenido si no existe
-- Esta tabla guardará textos, tamaños de fuente y colores.
CREATE TABLE IF NOT EXISTS public.landing_content (
    key TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar Seguridad de Nivel de Fila (RLS)
ALTER TABLE public.landing_content ENABLE ROW LEVEL SECURITY;

-- 3. Crear Políticas de Seguridad
-- Permite que cualquier visitante (incluso no logueados) vea el contenido de la web
DROP POLICY IF EXISTS "Public can view landing content" ON public.landing_content;
CREATE POLICY "Public can view landing content" 
ON public.landing_content FOR SELECT 
USING (true);

-- Permite que solo Administradores y Editores modifiquen el contenido
-- IMPORTANTE: Requiere que la función public.is_admin() haya sido creada previamente.
DROP POLICY IF EXISTS "Admins can update landing content" ON public.landing_content;
CREATE POLICY "Admins can update landing content" 
ON public.landing_content FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 4. Cargar valores iniciales de diseño para el HERO
-- Esto evita que los textos aparezcan sin estilo la primera vez que abres el editor.
INSERT INTO public.landing_content (key, content) VALUES
-- Tamaños por defecto (Hero)
('hero_title_size', '72px'),
('hero_subtitle_size', '14px'),
('hero_description_size', '20px'),
-- Colores por defecto (Hero)
('hero_title_color', '#c06048'), -- Coral
('hero_subtitle_color', '#603048'), -- Plum
('hero_description_color', '#603048'), -- Plum
-- Texto y color del botón
('hero_button_text', 'Conoce el proyecto'),
('hero_button_color', '#90a878') -- Olive
ON CONFLICT (key) DO UPDATE SET content = EXCLUDED.content;

-- 5. Asegurar que los disparadores de tiempo funcionen
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_landing_content_updated_at ON public.landing_content;
CREATE TRIGGER update_landing_content_updated_at
    BEFORE UPDATE ON public.landing_content
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
