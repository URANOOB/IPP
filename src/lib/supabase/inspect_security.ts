import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function inspectPolicies() {
  console.log('🔍 Inspeccionando Políticas RLS en la tabla "profiles"...\n')

  try {
    // Intentamos consultar pg_policies a través de rpc o una consulta directa si fuera posible
    // Pero como no tenemos rpc configurado para esto, intentaremos hacer una consulta SQL directa 
    // si el cliente lo permitiera (no lo permite directamente).
    
    // Sin embargo, podemos intentar deducir si RLS está activo intentando una operación 
    // que fallaría sin políticas si estuviéramos usando la anon key, 
    // pero aquí tenemos la service role key que salta RLS.

    // La mejor forma de saber las políticas es consultar la tabla pg_policies.
    // Usaremos un truco: ejecutar una consulta SQL a través de la API de PostgREST 
    // suele ser difícil sin una función RPC.
    
    console.log('Intentando obtener políticas vía consulta SQL (si hay permisos)...')
    
    // En Supabase, normalmente no puedes ejecutar SQL arbitrario vía JS client 
    // a menos que tengas una función RPC que lo haga.
    
    // Intentaremos ver si existe una tabla de perfiles y qué datos tiene.
    const { data: profiles, error: pError } = await supabase.from('profiles').select('*').limit(1)
    if (pError) {
      console.error('Error al acceder a la tabla profiles:', pError.message)
    } else {
      console.log('✅ Acceso a "profiles" exitoso.')
      if (profiles && profiles.length > 0) {
        console.log('Columnas en profiles:', Object.keys(profiles[0]).join(', '))
      }
    }

    console.log('\nNota: No puedo consultar pg_policies directamente sin una función RPC "exec_sql" o similar.')
    console.log('Sin embargo, basándome en el código actual, parece que el control se hace en la capa de aplicación.')
  } catch (err) {
    console.error('Error durante la inspección:', err)
  }
}

inspectPolicies()
