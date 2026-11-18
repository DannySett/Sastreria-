// Configuración general editable desde la vista Ajustes
let appConfig = {
    brandName: 'Sastrería Elegance',
    currency: 'Q',
    taxId: 'CF-9084721-8',
    monthlyGoal: 3500,
    address: 'Av. Reforma 12-45, Zona 10 • Alta Costura Hecha a Medida'
};

// Datos iniciales de Facturas (Con fecha ISO YYYY-MM-DD para <input type="date">)
const initialInvoices = [
    {
        uid: 1,
        id: '#0123',
        client: 'Juan Pérez',
        date: '2023-10-25',
        status: 'Pagado',
        stage: 'Entregado',
        total: 1450.00,
        desc: 'Traje Sastre Azul Marino 3 Piezas (Casimir Inglés)'
    },
    {
        uid: 2,
        id: '#0124',
        client: 'María Gómez',
        date: '2023-10-24',
        status: 'Pendiente',
        stage: 'Prueba',
        total: 890.00,
        desc: 'Conjunto Sastre Femenino Lino Beige a Medida'
    },
    {
        uid: 3,
        id: '#0125',
        client: 'Juan Pérez',
        date: '2023-10-25',
        status: 'Pagado',
        stage: 'Corte',
        total: 890.00,
        desc: '2 Camisas Oxford de Puño Francés con Iniciales Bordadas'
    }
];

// Datos iniciales de Clientes con Medidas de Sastrería
const initialClients = [
    {
        id: 101,
        name: 'Juan Pérez',
        phone: '5541-8890',
        chest: '42R',
        waist: '34 in',
        length: '65 cm',
        shoulders: '48 cm',
        date: '2023-10-25'
    },
    {
        id: 102,
        name: 'María Gómez',
        phone: '4412-3309',
        chest: '36S',
        waist: '28 in',
        length: '59 cm',
        shoulders: '40 cm',
        date: '2023-10-24'
    },
    {
        id: 103,
        name: 'Carlos Alvarado',
        phone: '5890-1122',
        chest: '44L',
        waist: '38 in',
        length: '67 cm',
        shoulders: '50 cm',
        date: '2023-10-20'
    },
    {
        id: 104,
        name: 'Roberto Mendoza',
        phone: '3319-7740',
        chest: '40R',
        waist: '32 in',
        length: '63 cm',
        shoulders: '46 cm',
        date: '2023-10-18'
    }
];

// Datos iniciales de Inventario de Sastrería
const initialInventory = [
    {
        id: 201,
        code: 'TEL-001',
        name: 'Casimir Inglés Super 130s Azul Marino',
        category: 'Telas',
        stock: 18,
        unit: 'Metros',
        price: 280.00,
        date: '2023-10-15'
    },
    {
        id: 202,
        code: 'TEL-002',
        name: 'Lino Italiano Imperial Beige Natural',
        category: 'Telas',
        stock: 4,
        unit: 'Metros',
        price: 210.00,
        date: '2023-10-18'
    },
    {
        id: 203,
        code: 'ACC-010',
        name: 'Botones de Corozo y Carrete Hilo Dorado',
        category: 'Accesorios',
        stock: 25,
        unit: 'Sets',
        price: 45.00,
        date: '2023-10-20'
    },
    {
        id: 204,
        code: 'PRN-004',
        name: 'Smoking de Gala Negro Solapa de Seda',
        category: 'Prendas Terminadas',
        stock: 2,
        unit: 'Trajes',
        price: 1650.00,
        date: '2023-10-25'
    }
];

let invoices = JSON.parse(JSON.stringify(initialInvoices));
let clients = JSON.parse(JSON.stringify(initialClients));
let inventory = JSON.parse(JSON.stringify(initialInventory));
let splashTimers = [];

// Convierte fecha YYYY-MM-DD a formato legible "25 Oct 2023" igual a la foto
function formatReadableDate(isoDate) {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length !== 3) return isoDate;
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    return `${day} ${months[monthIdx] || 'Oct'} ${year}`;
}

// Formatea moneda según el símbolo elegido en Ajustes (Por defecto Q1,450.00)
function formatCurrency(val) {
    return appConfig.currency + Number(val || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Control de la animación Pre-Login (Aguja e hilo girando)
function startSplashAnimation() {
    clearSplashTimers();
    const splash = document.getElementById('splash-screen');
    const progress = document.getElementById('splash-progress');
    const status = document.getElementById('splash-status');

    splash.classList.remove('hidden', 'opacity-0');
    progress.style.width = '15%';
    status.textContent = 'Enhebrando aguja e hilo de oro...';

    splashTimers.push(setTimeout(() => {
        progress.style.width = '55%';
        status.textContent = 'Cargando moldes y registro de facturas...';
    }, 850));

    splashTimers.push(setTimeout(() => {
        progress.style.width = '100%';
        status.textContent = '¡Bienvenido a ' + appConfig.brandName + '!';
    }, 1800));

    splashTimers.push(setTimeout(() => {
        goToLogin();
    }, 2500));
}

function clearSplashTimers() {
    splashTimers.forEach(t => clearTimeout(t));
    splashTimers = [];
}

function replaySplash() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('flex');
    document.getElementById('app-container').classList.add('hidden');
    startSplashAnimation();
}

function goToLogin() {
    clearSplashTimers();
    const splash = document.getElementById('splash-screen');
    const login = document.getElementById('login-screen');
    const app = document.getElementById('app-container');

    splash.classList.add('opacity-0');
    setTimeout(() => {
        splash.classList.add('hidden');
        app.classList.add('hidden');
        login.classList.remove('hidden');
        login.classList.add('flex');
    }, 350);
}

function handleLogin(e) {
    e.preventDefault();
    enterApp('facturas');
    showToast('Sesión iniciada correctamente en ' + appConfig.brandName);
}

function enterApp(initialView = 'facturas') {
    clearSplashTimers();
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('flex');

    const app = document.getElementById('app-container');
    app.classList.remove('hidden');

    refreshAllViews();
    switchView(initialView);
}

// Navegación entre las 6 secciones 100% funcionales del Sidebar
function switchView(viewName) {
    const allSections = ['facturas', 'dashboard', 'clientes', 'inventario', 'reportes', 'ajustes'];
    allSections.forEach(sec => {
        const el = document.getElementById('view-' + sec);
        if (el) el.classList.add('hidden');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.className = 'nav-btn w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium text-stone-700 hover:bg-cream-300/60 transition';
    });

    document.getElementById('nav-facturas-label').textContent = viewName === 'facturas' ? 'Facturas (Active)' : 'Facturas';

    const activeBtn = document.getElementById('nav-' + viewName);
    if (activeBtn) {
        activeBtn.className = 'nav-btn w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#cbb286] text-stone-900 shadow-sm transition';
    }

    const targetSection = document.getElementById('view-' + viewName);
    if (targetSection) targetSection.classList.remove('hidden');

    refreshAllViews();
    document.getElementById('sidebar').classList.add('-translate-x-full');
}

function toggleMobileSidebar() {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
}

function refreshAllViews() {
    renderInvoices();
    renderClients();
    renderInventory();
    renderReports();
    renderDashboardOrders();
    updateClientsDatalist();
}

// ==========================================
// SECCIÓN 1: FACTURAS CON <input type="date"> EN TABLA Y CRUD
// ==========================================
function renderInvoices() {
    const tbody = document.getElementById('invoices-tbody');
    const search = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
    const statusFilter = document.getElementById('filter-status')?.value || 'ALL';
    const amountFilter = document.getElementById('filter-amount')?.value || 'ALL';
    const dateFilter = document.getElementById('filter-date')?.value || '';

    let filtered = invoices.filter(item => {
        const readableDate = formatReadableDate(item.date).toLowerCase();
        const matchSearch = item.id.toLowerCase().includes(search) ||
                            item.client.toLowerCase().includes(search) ||
                            item.date.toLowerCase().includes(search) ||
                            readableDate.includes(search) ||
                            (item.desc || '').toLowerCase().includes(search);

        const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
        const matchAmount = (amountFilter === 'ALL' || amountFilter === 'SORT_DESC' || amountFilter === 'SORT_ASC') ||
                            (amountFilter === 'HIGH' && item.total > 1000) ||
                            (amountFilter === 'LOW' && item.total <= 1000);
        const matchDate = !dateFilter || item.date === dateFilter;

        return matchSearch && matchStatus && matchAmount && matchDate;
    });

    if (amountFilter === 'SORT_DESC') {
        filtered.sort((a, b) => b.total - a.total);
    } else if (amountFilter === 'SORT_ASC') {
        filtered.sort((a, b) => a.total - b.total);
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="py-10 text-center text-stone-500 text-sm">
                    No se encontraron facturas con esos criterios de fecha o búsqueda.
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = filtered.map((inv) => {
            const isPaid = inv.status === 'Pagado';
            const statusClass = isPaid
                ? 'text-[#3b7a57] font-semibold'
                : 'text-[#c99738] font-semibold';

            return `
                <tr class="hover:bg-[#f5f0e4] transition-colors">
                    <td class="py-4 px-4 font-semibold text-stone-800 whitespace-nowrap">${inv.id}</td>
                    <td class="py-4 px-4 font-medium text-stone-800 whitespace-nowrap">${inv.client}</td>
                    <td class="py-3 px-4 whitespace-nowrap">
                        <div class="flex flex-col">
                            <input type="date" value="${inv.date}"
                                onchange="updateInvoiceDateInline(${inv.uid}, this.value)"
                                title="Haz clic para cambiar la fecha directamente en la tabla"
                                class="bg-[#f3ede0] hover:bg-white border border-[#dcd2be] rounded-md px-2 py-1 text-xs font-medium text-stone-800 focus:outline-none focus:border-navy-800 cursor-pointer w-36">
                            <span class="text-[11px] text-stone-500 mt-0.5 pl-1">${formatReadableDate(inv.date)}</span>
                        </div>
                    </td>
                    <td class="py-4 px-4 whitespace-nowrap">
                        <button onclick="toggleInvoiceStatus(${inv.uid})" title="Clic para alternar Pagado / Pendiente" class="${statusClass} hover:underline">
                            ${inv.status}
                        </button>
                    </td>
                    <td class="py-4 px-4 font-bold text-stone-900 whitespace-nowrap">${formatCurrency(inv.total)}</td>
                    <td class="py-2.5 px-4">
                        <div class="flex flex-col items-center gap-1.5">
                            <button onclick="viewInvoiceDetails(${inv.uid})"
                                class="w-28 py-1 px-2.5 rounded-full bg-[#1d3b58] hover:bg-[#14293d] text-white text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-xs btn-action">
                                <i class="fa-solid fa-eye text-[10px]"></i>
                                <span>Ver Detalles</span>
                            </button>
                            <button onclick="openInvoiceModal(${inv.uid})"
                                class="w-24 py-1 px-2.5 rounded-full bg-[#2b547e] hover:bg-[#1e3d5c] text-white text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-xs btn-action">
                                <i class="fa-solid fa-pen text-[10px]"></i>
                                <span>Editar</span>
                            </button>
                            <button onclick="deleteInvoice(${inv.uid})"
                                class="w-24 py-1 px-2.5 rounded-full bg-[#b83c33] hover:bg-[#962d25] text-white text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-xs btn-action">
                                <i class="fa-solid fa-trash-can text-[10px]"></i>
                                <span>Borrar</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    updateRightWidgets();
}

// Permite cambiar la fecha directamente desde el <input type="date"> dentro de la tabla
function updateInvoiceDateInline(uid, newIsoDate) {
    if (!newIsoDate) return;
    const inv = invoices.find(i => i.uid === uid);
    if (inv) {
        inv.date = newIsoDate;
        refreshAllViews();
        showToast(`Fecha de factura ${inv.id} actualizada a ${formatReadableDate(newIsoDate)}`);
    }
}

function toggleInvoiceStatus(uid) {
    const inv = invoices.find(i => i.uid === uid);
    if (inv) {
        inv.status = inv.status === 'Pagado' ? 'Pendiente' : 'Pagado';
        refreshAllViews();
        showToast(`Estatus de factura ${inv.id} cambiado a ${inv.status}`);
    }
}

function updateRightWidgets() {
    const paidTotal = invoices.filter(i => i.status === 'Pagado').reduce((acc, i) => acc + Number(i.total), 0);
    const pendingList = invoices.filter(i => i.status === 'Pendiente');
    const pendingTotal = pendingList.reduce((acc, i) => acc + Number(i.total), 0);
    const grandTotal = paidTotal + pendingTotal;

    document.getElementById('summary-count').textContent = invoices.length;
    document.getElementById('summary-pending-count').textContent = pendingList.length;
    document.getElementById('summary-paid').textContent = formatCurrency(paidTotal);
    document.getElementById('summary-total').textContent = formatCurrency(grandTotal);

    // Actualizar KPIs del Dashboard
    const dashPaid = document.getElementById('dash-paid');
    const dashPending = document.getElementById('dash-pending');
    const dashPendingSub = document.getElementById('dash-pending-sub');
    const dashClientsCount = document.getElementById('dash-clients-count');
    const dashInvCount = document.getElementById('dash-inventory-count');

    if (dashPaid) dashPaid.textContent = formatCurrency(paidTotal);
    if (dashPending) dashPending.textContent = formatCurrency(pendingTotal);
    if (dashPendingSub) dashPendingSub.textContent = `${pendingList.length} factura(s) por cobrar`;
    if (dashClientsCount) dashClientsCount.textContent = `${clients.length} Clientes`;
    if (dashInvCount) dashInvCount.textContent = `${inventory.length} Artículos`;

    const lowStockItems = inventory.filter(item => item.stock <= 5).length;
    const lowStockEl = document.getElementById('dash-low-stock');
    if (lowStockEl) {
        lowStockEl.textContent = lowStockItems > 0 ? `¡Atención! ${lowStockItems} con stock bajo` : 'Stock de taller óptimo';
    }

    // Barras de progreso del Dashboard
    const goalPct = Math.min(100, Math.round((paidTotal / (appConfig.monthlyGoal || 3500)) * 100));
    const paidRate = grandTotal > 0 ? Math.round((paidTotal / grandTotal) * 100) : 0;
    const goalPctEl = document.getElementById('dash-goal-pct');
    const goalBarEl = document.getElementById('dash-goal-bar');
    const paidRateEl = document.getElementById('dash-paid-rate');
    const paidBarEl = document.getElementById('dash-paid-bar');

    if (goalPctEl) goalPctEl.textContent = goalPct + '%';
    if (goalBarEl) goalBarEl.style.width = goalPct + '%';
    if (paidRateEl) paidRateEl.textContent = paidRate + '%';
    if (paidBarEl) paidBarEl.style.width = paidRate + '%';

    // Clientes Recientes en la columna derecha de Facturas
    const recentContainer = document.getElementById('recent-clients-list');
    const recentList = invoices.slice(0, 4).map(i => ({
        name: i.client,
        date: formatReadableDate(i.date)
    }));

    recentContainer.innerHTML = recentList.map(c => `
        <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-full bg-[#e8dec8] text-[#9c8459] flex items-center justify-center shrink-0">
                <i class="fa-solid fa-user text-xs"></i>
            </div>
            <div class="leading-tight">
                <p class="text-xs font-bold text-stone-800">${c.name}</p>
                <p class="text-[10px] text-stone-500">${c.date}</p>
            </div>
        </div>
    `).join('');
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-status').value = 'ALL';
    document.getElementById('filter-amount').value = 'ALL';
    document.getElementById('filter-date').value = '';
    renderInvoices();
    showToast('Filtros de facturas restablecidos');
}

function toggleSortId() {
    invoices.reverse();
    renderInvoices();
}

function openInvoiceModal(uid = null) {
    const modal = document.getElementById('invoice-modal');
    const title = document.getElementById('modal-title');
    const editField = document.getElementById('edit-index');

    if (uid !== null) {
        const inv = invoices.find(i => i.uid === uid);
        if (!inv) return;
        title.textContent = 'Editar Factura ' + inv.id;
        editField.value = uid;
        document.getElementById('inv-id').value = inv.id;
        document.getElementById('inv-client').value = inv.client;
        document.getElementById('inv-date').value = inv.date;
        document.getElementById('inv-status').value = inv.status;
        document.getElementById('inv-total').value = inv.total;
        document.getElementById('inv-desc').value = inv.desc || '';
    } else {
        title.textContent = 'Crear Nueva Factura';
        editField.value = '';
        document.getElementById('inv-id').value = '#012' + (invoices.length + 3);
        document.getElementById('inv-client').value = '';
        document.getElementById('inv-date').value = '2023-10-25';
        document.getElementById('inv-status').value = 'Pagado';
        document.getElementById('inv-total').value = '';
        document.getElementById('inv-desc').value = 'Confección de traje sastre a medida';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeInvoiceModal() {
    const modal = document.getElementById('invoice-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function saveInvoice(e) {
    e.preventDefault();
    const uid = document.getElementById('edit-index').value;
    const newItem = {
        uid: uid ? Number(uid) : Date.now(),
        id: document.getElementById('inv-id').value.trim(),
        client: document.getElementById('inv-client').value.trim(),
        date: document.getElementById('inv-date').value,
        status: document.getElementById('inv-status').value,
        stage: 'Toma de medidas',
        total: parseFloat(document.getElementById('inv-total').value) || 0,
        desc: document.getElementById('inv-desc').value.trim() || 'Servicio de Sastrería Elegance'
    };

    if (uid) {
        const idx = invoices.findIndex(i => i.uid === Number(uid));
        if (idx > -1) {
            newItem.stage = invoices[idx].stage || 'Prueba';
            invoices[idx] = newItem;
        }
        showToast('Factura actualizada correctamente');
    } else {
        invoices.unshift(newItem);
        showToast('Nueva factura creada con fecha ' + formatReadableDate(newItem.date));
    }

    closeInvoiceModal();
    refreshAllViews();
}

function viewInvoiceDetails(uid) {
    const inv = invoices.find(i => i.uid === uid);
    if (!inv) return;

    document.getElementById('det-id').textContent = inv.id;
    document.getElementById('det-client').textContent = inv.client;
    document.getElementById('det-date').textContent = `${formatReadableDate(inv.date)} (${inv.date})`;
    document.getElementById('det-status').textContent = inv.status;
    document.getElementById('det-status').className = inv.status === 'Pagado' ? 'font-bold text-[#3b7a57]' : 'font-bold text-[#c99738]';
    document.getElementById('det-desc').textContent = inv.desc || 'Traje hecho a medida';
    document.getElementById('det-total').textContent = formatCurrency(inv.total);

    const modal = document.getElementById('details-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeDetailsModal() {
    const modal = document.getElementById('details-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function deleteInvoice(uid) {
    invoices = invoices.filter(i => i.uid !== uid);
    refreshAllViews();
    showToast('Factura eliminada del registro');
}

// ==========================================
// SECCIÓN 2: DASHBOARD (ÓRDENES EN PROCESO)
// ==========================================
function renderDashboardOrders() {
    const container = document.getElementById('dash-orders-list');
    if (!container) return;

    const stages = ['Toma de medidas', 'Corte', 'Prueba', 'Entregado'];

    container.innerHTML = invoices.slice(0, 5).map(inv => {
        const initials = inv.client.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const badgeClass = inv.status === 'Pagado'
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-amber-100 text-amber-800';

        return `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-cream-100 border border-cream-300">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-xs shrink-0">${initials}</div>
                    <div>
                        <p class="text-sm font-semibold text-stone-900">${inv.client} <span class="text-xs font-normal text-stone-500">(${inv.id})</span></p>
                        <p class="text-xs text-stone-600">${inv.desc || 'Traje a medida'}</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <select onchange="updateOrderStage(${inv.uid}, this.value)"
                        class="bg-white border border-cream-300 text-xs font-semibold text-navy-900 rounded-md px-2.5 py-1 focus:outline-none cursor-pointer">
                        ${stages.map(st => `<option value="${st}" ${(inv.stage || 'Prueba') === st ? 'selected' : ''}>Etapa: ${st}</option>`).join('')}
                    </select>
                    <input type="date" value="${inv.date}" onchange="updateInvoiceDateInline(${inv.uid}, this.value)"
                        class="bg-white border border-cream-300 rounded-md px-2 py-1 text-xs text-stone-700 cursor-pointer">
                    <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${badgeClass}">${inv.status} • ${formatCurrency(inv.total)}</span>
                </div>
            </div>
        `;
    }).join('');
}

function updateOrderStage(uid, newStage) {
    const inv = invoices.find(i => i.uid === uid);
    if (inv) {
        inv.stage = newStage;
        showToast(`Orden ${inv.id} actualizada a etapa: ${newStage}`);
    }
}

// ==========================================
// SECCIÓN 3: CLIENTES Y MEDIDAS (CRUD COMPLETO)
// ==========================================
function renderClients() {
    const tbody = document.getElementById('clients-tbody');
    if (!tbody) return;
    const q = (document.getElementById('client-search-input')?.value || '').toLowerCase().trim();

    const filtered = clients.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.chest.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-stone-500">No se encontraron clientes registrados.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(c => `
        <tr class="hover:bg-[#f5f0e4] transition-colors">
            <td class="py-3.5 px-4 font-semibold text-stone-900">${c.name}</td>
            <td class="py-3.5 px-4 text-stone-700">${c.phone}</td>
            <td class="py-3.5 px-4">
                <div class="flex flex-wrap gap-1.5 text-xs">
                    <span class="px-2 py-0.5 bg-cream-200 rounded font-medium">Saco: ${c.chest}</span>
                    <span class="px-2 py-0.5 bg-cream-200 rounded font-medium">Cintura: ${c.waist}</span>
                    <span class="px-2 py-0.5 bg-cream-200 rounded font-medium">Manga: ${c.length}</span>
                    <span class="px-2 py-0.5 bg-cream-200 rounded font-medium">Hombros: ${c.shoulders}</span>
                </div>
            </td>
            <td class="py-3.5 px-4">
                <input type="date" value="${c.date}" onchange="updateClientDateInline(${c.id}, this.value)"
                    class="bg-[#f3ede0] border border-[#dcd2be] rounded px-2 py-1 text-xs font-medium text-stone-800 cursor-pointer">
            </td>
            <td class="py-2.5 px-4">
                <div class="flex items-center justify-center gap-1.5">
                    <button onclick="viewClientFicha(${c.id})" class="px-2.5 py-1 rounded bg-[#1d3b58] text-white text-xs hover:bg-[#14293d] transition" title="Ver Ficha de Medidas">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button onclick="openClientModal(${c.id})" class="px-2.5 py-1 rounded bg-[#2b547e] text-white text-xs hover:bg-[#1e3d5c] transition" title="Editar Medidas">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button onclick="deleteClient(${c.id})" class="px-2.5 py-1 rounded bg-[#b83c33] text-white text-xs hover:bg-[#962d25] transition" title="Eliminar Cliente">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateClientDateInline(id, newDate) {
    const c = clients.find(x => x.id === id);
    if (c && newDate) {
        c.date = newDate;
        showToast(`Fecha de registro de ${c.name} actualizada a ${formatReadableDate(newDate)}`);
    }
}

function openClientModal(id = null) {
    const modal = document.getElementById('client-modal');
    const title = document.getElementById('client-modal-title');
    const editId = document.getElementById('client-edit-id');

    if (id !== null) {
        const c = clients.find(x => x.id === id);
        if (!c) return;
        title.textContent = 'Editar Medidas de ' + c.name;
        editId.value = c.id;
        document.getElementById('cli-name').value = c.name;
        document.getElementById('cli-phone').value = c.phone;
        document.getElementById('cli-chest').value = c.chest;
        document.getElementById('cli-waist').value = c.waist;
        document.getElementById('cli-length').value = c.length;
        document.getElementById('cli-shoulders').value = c.shoulders;
        document.getElementById('cli-date').value = c.date;
    } else {
        title.textContent = 'Nuevo Cliente y Medidas';
        editId.value = '';
        document.getElementById('cli-name').value = '';
        document.getElementById('cli-phone').value = '';
        document.getElementById('cli-chest').value = '40R';
        document.getElementById('cli-waist').value = '34 in';
        document.getElementById('cli-length').value = '64 cm';
        document.getElementById('cli-shoulders').value = '46 cm';
        document.getElementById('cli-date').value = '2023-10-25';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeClientModal() {
    const modal = document.getElementById('client-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function saveClient(e) {
    e.preventDefault();
    const editId = document.getElementById('client-edit-id').value;
    const data = {
        id: editId ? Number(editId) : Date.now(),
        name: document.getElementById('cli-name').value.trim(),
        phone: document.getElementById('cli-phone').value.trim(),
        chest: document.getElementById('cli-chest').value.trim(),
        waist: document.getElementById('cli-waist').value.trim(),
        length: document.getElementById('cli-length').value.trim(),
        shoulders: document.getElementById('cli-shoulders').value.trim(),
        date: document.getElementById('cli-date').value
    };

    if (editId) {
        const idx = clients.findIndex(x => x.id === Number(editId));
        if (idx > -1) clients[idx] = data;
        showToast('Ficha de medidas actualizada');
    } else {
        clients.unshift(data);
        showToast('Nuevo cliente registrado en el directorio');
    }

    closeClientModal();
    refreshAllViews();
}

function viewClientFicha(id) {
    const c = clients.find(x => x.id === id);
    if (!c) return;
    document.getElementById('det-id').textContent = 'Ficha de Cliente';
    document.getElementById('det-client').textContent = c.name;
    document.getElementById('det-date').textContent = `${formatReadableDate(c.date)} (${c.date})`;
    document.getElementById('det-status').textContent = 'Tel: ' + c.phone;
    document.getElementById('det-status').className = 'font-bold text-navy-800';
    document.getElementById('det-desc').textContent = `Saco: ${c.chest} | Cintura: ${c.waist} | Manga: ${c.length} | Hombros: ${c.shoulders}`;
    document.getElementById('det-total').textContent = 'Medidas Verificadas';

    const modal = document.getElementById('details-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function deleteClient(id) {
    clients = clients.filter(x => x.id !== id);
    refreshAllViews();
    showToast('Cliente eliminado del directorio');
}

function updateClientsDatalist() {
    const dl = document.getElementById('clients-datalist');
    if (!dl) return;
    dl.innerHTML = clients.map(c => `<option value="${c.name}">`).join('');
}

// ==========================================
// SECCIÓN 4: INVENTARIO DE TELAS Y TRAJES (CRUD COMPLETO)
// ==========================================
function renderInventory() {
    const tbody = document.getElementById('inventory-tbody');
    if (!tbody) return;

    const q = (document.getElementById('inventory-search-input')?.value || '').toLowerCase().trim();
    const cat = document.getElementById('inventory-cat-filter')?.value || 'ALL';

    const filtered = inventory.filter(item => {
        const matchText = item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q);
        const matchCat = cat === 'ALL' || item.category === cat;
        return matchText && matchCat;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-stone-500">No se encontraron artículos en el inventario.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(item => {
        const isLow = item.stock <= 5;
        return `
            <tr class="hover:bg-[#f5f0e4] transition-colors">
                <td class="py-3.5 px-4">
                    <span class="text-xs font-bold text-navy-800 block">${item.code}</span>
                    <span class="font-medium text-stone-900">${item.name}</span>
                </td>
                <td class="py-3.5 px-4">
                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-cream-200 text-stone-800">${item.category}</span>
                </td>
                <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2">
                        <button onclick="adjustStock(${item.id}, -1)" class="w-6 h-6 rounded bg-cream-200 hover:bg-cream-300 text-stone-800 font-bold text-xs">-</button>
                        <span class="font-bold ${isLow ? 'text-brick-600' : 'text-stone-900'}">${item.stock} ${item.unit}</span>
                        <button onclick="adjustStock(${item.id}, 1)" class="w-6 h-6 rounded bg-cream-200 hover:bg-cream-300 text-stone-800 font-bold text-xs">+</button>
                        ${isLow ? '<span class="text-[10px] px-1.5 py-0.5 bg-red-100 text-brick-600 rounded font-semibold">Stock Bajo</span>' : ''}
                    </div>
                </td>
                <td class="py-3.5 px-4 font-bold text-stone-900">${formatCurrency(item.price)}</td>
                <td class="py-3.5 px-4">
                    <input type="date" value="${item.date}" onchange="updateInventoryDateInline(${item.id}, this.value)"
                        class="bg-[#f3ede0] border border-[#dcd2be] rounded px-2 py-1 text-xs font-medium text-stone-800 cursor-pointer">
                </td>
                <td class="py-2.5 px-4">
                    <div class="flex items-center justify-center gap-1.5">
                        <button onclick="openInventoryModal(${item.id})" class="px-2.5 py-1 rounded bg-[#2b547e] text-white text-xs hover:bg-[#1e3d5c] transition" title="Editar Artículo">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button onclick="deleteInventoryItem(${item.id})" class="px-2.5 py-1 rounded bg-[#b83c33] text-white text-xs hover:bg-[#962d25] transition" title="Borrar Artículo">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function adjustStock(id, delta) {
    const item = inventory.find(x => x.id === id);
    if (item) {
        item.stock = Math.max(0, item.stock + delta);
        refreshAllViews();
        showToast(`Stock de ${item.code} actualizado a ${item.stock} ${item.unit}`);
    }
}

function updateInventoryDateInline(id, newDate) {
    const item = inventory.find(x => x.id === id);
    if (item && newDate) {
        item.date = newDate;
        showToast(`Fecha de ingreso de ${item.code} actualizada a ${formatReadableDate(newDate)}`);
    }
}

function openInventoryModal(id = null) {
    const modal = document.getElementById('inventory-modal');
    const title = document.getElementById('inv-modal-title');
    const editId = document.getElementById('item-edit-id');

    if (id !== null) {
        const item = inventory.find(x => x.id === id);
        if (!item) return;
        title.textContent = 'Editar Artículo ' + item.code;
        editId.value = item.id;
        document.getElementById('item-code').value = item.code;
        document.getElementById('item-category').value = item.category;
        document.getElementById('item-name').value = item.name;
        document.getElementById('item-stock').value = item.stock;
        document.getElementById('item-unit').value = item.unit;
        document.getElementById('item-price').value = item.price;
        document.getElementById('item-date').value = item.date;
    } else {
        title.textContent = 'Nuevo Artículo de Inventario';
        editId.value = '';
        document.getElementById('item-code').value = 'TEL-00' + (inventory.length + 1);
        document.getElementById('item-category').value = 'Telas';
        document.getElementById('item-name').value = '';
        document.getElementById('item-stock').value = 10;
        document.getElementById('item-unit').value = 'Metros';
        document.getElementById('item-price').value = '';
        document.getElementById('item-date').value = '2023-10-25';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeInventoryModal() {
    const modal = document.getElementById('inventory-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function saveInventoryItem(e) {
    e.preventDefault();
    const editId = document.getElementById('item-edit-id').value;
    const data = {
        id: editId ? Number(editId) : Date.now(),
        code: document.getElementById('item-code').value.trim(),
        category: document.getElementById('item-category').value,
        name: document.getElementById('item-name').value.trim(),
        stock: parseInt(document.getElementById('item-stock').value, 10) || 0,
        unit: document.getElementById('item-unit').value.trim() || 'Unidades',
        price: parseFloat(document.getElementById('item-price').value) || 0,
        date: document.getElementById('item-date').value
    };

    if (editId) {
        const idx = inventory.findIndex(x => x.id === Number(editId));
        if (idx > -1) inventory[idx] = data;
        showToast('Artículo de inventario actualizado');
    } else {
        inventory.unshift(data);
        showToast('Nuevo artículo agregado al inventario');
    }

    closeInventoryModal();
    refreshAllViews();
}

function deleteInventoryItem(id) {
    inventory = inventory.filter(x => x.id !== id);
    refreshAllViews();
    showToast('Artículo eliminado del inventario');
}

// ==========================================
// SECCIÓN 5: REPORTES FINANCIEROS DINÁMICOS
// ==========================================
function renderReports() {
    const fromDate = document.getElementById('rep-date-from')?.value || '2000-01-01';
    const toDate = document.getElementById('rep-date-to')?.value || '2099-12-31';

    const inRange = invoices.filter(i => i.date >= fromDate && i.date <= toDate);
    const paid = inRange.filter(i => i.status === 'Pagado').reduce((a, b) => a + Number(b.total), 0);
    const pending = inRange.filter(i => i.status === 'Pendiente').reduce((a, b) => a + Number(b.total), 0);
    const total = paid + pending;

    const countEl = document.getElementById('rep-filter-count');
    if (countEl) countEl.textContent = `Mostrando ${inRange.length} factura(s) en el periodo`;

    const totalAllEl = document.getElementById('rep-total-all');
    const totalPaidEl = document.getElementById('rep-total-paid');
    const totalPendEl = document.getElementById('rep-total-pending');

    if (totalAllEl) totalAllEl.textContent = formatCurrency(total);
    if (totalPaidEl) totalPaidEl.textContent = formatCurrency(paid);
    if (totalPendEl) totalPendEl.textContent = formatCurrency(pending);

    const paidPct = total > 0 ? Math.round((paid / total) * 100) : 0;
    const pendPct = total > 0 ? 100 - paidPct : 0;
    const barPaid = document.getElementById('rep-bar-paid');
    const barPend = document.getElementById('rep-bar-pending');
    if (barPaid) barPaid.style.width = paidPct + '%';
    if (barPend) barPend.style.width = pendPct + '%';

    // Top clientes
    const clientTotals = {};
    inRange.forEach(inv => {
        clientTotals[inv.client] = (clientTotals[inv.client] || 0) + Number(inv.total);
    });
    const sortedClients = Object.entries(clientTotals).sort((a, b) => b[1] - a[1]);

    const topContainer = document.getElementById('rep-top-clients');
    if (topContainer) {
        topContainer.innerHTML = sortedClients.length === 0
            ? '<p class="text-xs text-stone-500">Sin registros en este rango de fechas.</p>'
            : sortedClients.map(([name, amount], idx) => `
                <div class="flex items-center justify-between p-2.5 rounded-lg bg-cream-100 border border-cream-300">
                    <div class="flex items-center gap-2.5">
                        <span class="w-6 h-6 rounded-full bg-navy-800 text-white text-xs font-bold flex items-center justify-center">${idx + 1}</span>
                        <span class="text-xs font-bold text-stone-800">${name}</span>
                    </div>
                    <span class="text-xs font-bold text-navy-900">${formatCurrency(amount)}</span>
                </div>
            `).join('');
    }

    // Resumen de inventario
    const invValue = inventory.reduce((acc, item) => acc + (item.stock * item.price), 0);
    const invSummaryEl = document.getElementById('rep-inventory-summary');
    if (invSummaryEl) {
        invSummaryEl.innerHTML = `
            <div class="flex justify-between p-2.5 rounded-lg bg-cream-100 border border-cream-300">
                <span class="text-stone-600">Valor total del stock en almacén:</span>
                <span class="font-bold text-navy-900">${formatCurrency(invValue)}</span>
            </div>
            <div class="flex justify-between p-2.5 rounded-lg bg-cream-100 border border-cream-300">
                <span class="text-stone-600">Lotes registrados (Telas, Accesorios, Prendas):</span>
                <span class="font-bold text-stone-900">${inventory.length} lotes</span>
            </div>
            <div class="flex justify-between p-2.5 rounded-lg bg-cream-100 border border-cream-300">
                <span class="text-stone-600">Clientes con ficha de medidas:</span>
                <span class="font-bold text-stone-900">${clients.length} clientes</span>
            </div>
        `;
    }
}

function resetReportDates() {
    document.getElementById('rep-date-from').value = '2023-01-01';
    document.getElementById('rep-date-to').value = '2026-12-31';
    renderReports();
    showToast('Rango de fechas del reporte restablecido');
}

function exportReportSummary() {
    const paid = invoices.filter(i => i.status === 'Pagado').reduce((a, b) => a + Number(b.total), 0);
    const pending = invoices.filter(i => i.status === 'Pendiente').reduce((a, b) => a + Number(b.total), 0);
    const summaryText = `REPORTE ${appConfig.brandName.toUpperCase()} - Facturas: ${invoices.length} | Pagado: ${formatCurrency(paid)} | Pendiente: ${formatCurrency(pending)}`;

    const tempInput = document.createElement('textarea');
    tempInput.value = summaryText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    showToast('Resumen financiero copiado al portapapeles');
}

// ==========================================
// SECCIÓN 6: AJUSTES DEL SISTEMA
// ==========================================
function saveSettings(e) {
    e.preventDefault();
    appConfig.brandName = document.getElementById('set-brand-name').value.trim() || 'Sastrería Elegance';
    appConfig.currency = document.getElementById('set-currency').value;
    appConfig.taxId = document.getElementById('set-tax-id').value.trim();
    appConfig.monthlyGoal = parseFloat(document.getElementById('set-monthly-goal').value) || 3500;
    appConfig.address = document.getElementById('set-address').value.trim();

    document.querySelectorAll('.brand-name-display').forEach(el => {
        el.textContent = appConfig.brandName;
    });

    refreshAllViews();
    showToast(`Ajustes guardados. Moneda activa: ${appConfig.currency}`);
}

function restoreDemoData() {
    invoices = JSON.parse(JSON.stringify(initialInvoices));
    clients = JSON.parse(JSON.stringify(initialClients));
    inventory = JSON.parse(JSON.stringify(initialInventory));
    appConfig.currency = 'Q';
    document.getElementById('set-currency').value = 'Q';
    refreshAllViews();
    showToast('Datos originales de demostración restaurados');
}

// Mostrar notificación flotante
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
    }, 2800);
}

// Inicializar aplicación al cargar la ventana
window.onload = function () {
    refreshAllViews();
    startSplashAnimation();
};
