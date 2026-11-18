/* =========================================================
   CAPA DE DATOS - Sastrería Elegance
   Un solo punto de acceso a los datos: la app solo llama a DB.*
   y esta capa decide si guarda en localStorage o en Supabase.
   ========================================================= */
const DB = (() => {
    const cfg = (typeof DB_CONFIG !== 'undefined') ? DB_CONFIG : { MODE: 'local' };
    const isRemote = cfg.MODE === 'supabase';
    const LS_KEY = 'sastreria_elegance_v1';
    let sb = null;          // cliente de Supabase (solo modo remoto)
    let loggedIn = false;   // sesión activa (solo modo remoto)

    // ---------- Mapeo objetos de la app <-> filas de la base de datos ----------
    const nz = v => (v === '' || v === undefined ? null : v);

    const invoiceToRow = i => ({
        uid: i.uid, code: i.id, client: i.client, date: nz(i.date),
        status: i.status, stage: i.stage, total: i.total, description: i.desc
    });
    const invoiceFromRow = r => ({
        uid: Number(r.uid), id: r.code, client: r.client, date: r.date || '',
        status: r.status, stage: r.stage, total: Number(r.total), desc: r.description
    });

    const clientToRow = c => ({
        id: c.id, name: c.name, phone: c.phone, chest: c.chest, waist: c.waist,
        length: c.length, shoulders: c.shoulders, date: nz(c.date)
    });
    const clientFromRow = r => ({
        id: Number(r.id), name: r.name, phone: r.phone || '', chest: r.chest || '',
        waist: r.waist || '', length: r.length || '', shoulders: r.shoulders || '', date: r.date || ''
    });

    const itemToRow = x => ({
        id: x.id, code: x.code, name: x.name, category: x.category, stock: x.stock,
        unit: x.unit, price: x.price, date: nz(x.date)
    });
    const itemFromRow = r => ({
        id: Number(r.id), code: r.code, name: r.name, category: r.category,
        stock: Number(r.stock), unit: r.unit, price: Number(r.price), date: r.date || ''
    });

    const configToRow = c => ({
        id: 1, brand_name: c.brandName, currency: c.currency, tax_id: c.taxId,
        monthly_goal: c.monthlyGoal, address: c.address
    });
    const configFromRow = r => ({
        brandName: r.brand_name, currency: r.currency, taxId: r.tax_id,
        monthlyGoal: Number(r.monthly_goal), address: r.address
    });

    // ---------- Adaptador localStorage ----------
    const ls = {
        read() {
            try { const raw = localStorage.getItem(LS_KEY); return raw ? JSON.parse(raw) : null; }
            catch (e) { console.error('localStorage no legible:', e); return null; }
        },
        write(state) {
            try { localStorage.setItem(LS_KEY, JSON.stringify(state)); }
            catch (e) { console.error('No se pudo escribir en localStorage:', e); throw e; }
        },
        state() { return this.read() || { invoices: [], clients: [], inventory: [], config: null }; },
        upsert(list, item, key) {
            const s = this.state();
            const idx = s[list].findIndex(x => x[key] === item[key]);
            if (idx > -1) s[list][idx] = item; else s[list].unshift(item);
            this.write(s);
        },
        remove(list, key, value) {
            const s = this.state();
            s[list] = s[list].filter(x => x[key] !== value);
            this.write(s);
        }
    };

    // ---------- Adaptador Supabase ----------
    async function must(query) {
        const { data, error } = await query;
        if (error) throw error;
        return data;
    }
    const byRecent = q => q.order('created_at', { ascending: false }).order('id', { ascending: true });

    // ---------- API pública ----------
    return {
        isRemote,
        isLoggedIn: () => loggedIn,

        async init() {
            if (!isRemote) return;
            if (!window.supabase) throw new Error('No se cargó la librería de Supabase');
            if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) {
                throw new Error('Faltan SUPABASE_URL / SUPABASE_ANON_KEY en js/config.js');
            }
            sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
            const { data } = await sb.auth.getSession();
            loggedIn = !!data.session;
            sb.auth.onAuthStateChange((_evt, session) => { loggedIn = !!session; });
        },

        // ----- Autenticación (solo modo remoto) -----
        async signIn(email, password) {
            const { error } = await sb.auth.signInWithPassword({ email, password });
            if (error) throw error;
            loggedIn = true;
        },
        async signOut() {
            if (!isRemote || !sb) return;
            await sb.auth.signOut();
            loggedIn = false;
        },

        // ----- Lectura inicial -----
        // Devuelve { invoices, clients, inventory, config } o null si no hay nada guardado (solo local)
        async loadAll() {
            if (!isRemote) return ls.read();
            const [inv, cli, itm, set] = await Promise.all([
                must(sb.from('invoices').select('*').order('created_at', { ascending: false }).order('uid', { ascending: true })),
                must(byRecent(sb.from('clients').select('*'))),
                must(byRecent(sb.from('inventory').select('*'))),
                must(sb.from('app_settings').select('*').eq('id', 1).maybeSingle())
            ]);
            return {
                invoices: inv.map(invoiceFromRow),
                clients: cli.map(clientFromRow),
                inventory: itm.map(itemFromRow),
                config: set ? configFromRow(set) : null
            };
        },

        // ----- Facturas -----
        async upsertInvoice(inv) {
            if (!isRemote) return ls.upsert('invoices', inv, 'uid');
            await must(sb.from('invoices').upsert(invoiceToRow(inv), { onConflict: 'uid' }));
        },
        async removeInvoice(uid) {
            if (!isRemote) return ls.remove('invoices', 'uid', uid);
            await must(sb.from('invoices').delete().eq('uid', uid));
        },

        // ----- Clientes -----
        async upsertClient(c) {
            if (!isRemote) return ls.upsert('clients', c, 'id');
            await must(sb.from('clients').upsert(clientToRow(c), { onConflict: 'id' }));
        },
        async removeClient(id) {
            if (!isRemote) return ls.remove('clients', 'id', id);
            await must(sb.from('clients').delete().eq('id', id));
        },

        // ----- Inventario -----
        async upsertItem(x) {
            if (!isRemote) return ls.upsert('inventory', x, 'id');
            await must(sb.from('inventory').upsert(itemToRow(x), { onConflict: 'id' }));
        },
        async removeItem(id) {
            if (!isRemote) return ls.remove('inventory', 'id', id);
            await must(sb.from('inventory').delete().eq('id', id));
        },

        // ----- Ajustes -----
        async saveConfig(c) {
            if (!isRemote) { const s = ls.state(); s.config = c; return ls.write(s); }
            await must(sb.from('app_settings').upsert(configToRow(c), { onConflict: 'id' }));
        },

        // ----- Reemplazar todo (datos de demostración / primera carga local) -----
        async replaceAll(state) {
            if (!isRemote) return ls.write(state);
            await must(sb.from('invoices').delete().neq('uid', -1));
            await must(sb.from('clients').delete().neq('id', -1));
            await must(sb.from('inventory').delete().neq('id', -1));
            if (state.invoices.length)  await must(sb.from('invoices').insert(state.invoices.map(invoiceToRow)));
            if (state.clients.length)   await must(sb.from('clients').insert(state.clients.map(clientToRow)));
            if (state.inventory.length) await must(sb.from('inventory').insert(state.inventory.map(itemToRow)));
            await must(sb.from('app_settings').upsert(configToRow(state.config), { onConflict: 'id' }));
        }
    };
})();
