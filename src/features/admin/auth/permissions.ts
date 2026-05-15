import type { createClient } from '@/lib/supabase/server'

export type AdminRole = 'admin' | 'editor' | 'viewer'

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

export async function requireRole(
  supabase: SupabaseServerClient,
  allowedRoles: AdminRole[],
): Promise<{ success: true; userId: string; role: AdminRole } | { success: false; error: string }> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'No autenticado' }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile?.role) {
    return { success: false, error: 'No se pudo verificar el rol del usuario' }
  }

  const role = profile.role as AdminRole

  if (!allowedRoles.includes(role)) {
    return { success: false, error: 'No tienes permisos para realizar esta acción' }
  }

  return { success: true, userId: user.id, role }
}
