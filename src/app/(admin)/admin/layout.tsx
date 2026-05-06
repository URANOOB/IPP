import { AdminSidebar } from '@/components/layout/admin-sidebar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Obtener el perfil para saber el rol
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <AdminSidebar userRole={profile?.role || 'viewer'} />
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="p-10 max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
