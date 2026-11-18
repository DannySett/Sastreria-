/* =========================================================
   Configuración de la capa de datos
   ---------------------------------------------------------
   MODE: 'local'    -> guarda en el navegador (localStorage). No requiere nada más.
         'supabase' -> guarda en tu base de datos Supabase (requiere login).

   Para usar Supabase: cambia MODE y pega tu URL y tu clave "anon / publishable"
   (Project Settings -> API). NUNCA pegues aquí la clave "service_role".
   ========================================================= */
const DB_CONFIG = {
    MODE: 'local',
    SUPABASE_URL: '',        // ej: https://abcdefghij.supabase.co
    SUPABASE_ANON_KEY: ''    // clave pública (anon / publishable)
};
