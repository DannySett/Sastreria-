/* =========================================================
   Configuración de la capa de datos
   ---------------------------------------------------------
   MODE: 'local'    -> guarda en el navegador (localStorage). No requiere nada más.
         'supabase' -> guarda en tu base de datos Supabase (requiere login).

   Para usar Supabase: cambia MODE y pega tu URL y tu clave "anon / publishable"
   (Project Settings -> API). NUNCA pegues aquí la clave "service_role".
   ========================================================= */
const DB_CONFIG = {
    MODE: 'Supabase',
    SUPABASE_URL: 'https://nluixkggbtkcsvzggdur.supabase.co',        // ej: https://abcdefghij.supabase.co
    SUPABASE_ANON_KEY: 'sb_publishable_v2-gplZ84udmsnh4NRKvAw_U5-fevKF'    // clave pública (anon / publishable)
};
