-- =========================================================
-- Sastrería Elegance - Esquema para Supabase
-- Pégalo completo en: Supabase -> SQL Editor -> New query -> Run
-- =========================================================

-- ---------- Tablas ----------
create table if not exists public.invoices (
    uid         bigint primary key,           -- identificador interno de la app
    code        text not null,                -- número visible de factura (#0123)
    client      text not null,
    date        date,
    status      text,                         -- Pagado / Pendiente
    stage       text,                         -- etapa de la orden
    total       numeric(12,2) not null default 0,
    description text,
    created_at  timestamptz not null default now()
);

create table if not exists public.clients (
    id          bigint primary key,
    name        text not null,
    phone       text,
    chest       text,
    waist       text,
    length      text,
    shoulders   text,
    date        date,
    created_at  timestamptz not null default now()
);

create table if not exists public.inventory (
    id          bigint primary key,
    code        text not null,
    name        text not null,
    category    text,
    stock       integer not null default 0,
    unit        text,
    price       numeric(12,2) not null default 0,
    date        date,
    created_at  timestamptz not null default now()
);

-- Una sola fila de ajustes (id siempre = 1)
create table if not exists public.app_settings (
    id           integer primary key default 1 check (id = 1),
    brand_name   text,
    currency     text,
    tax_id       text,
    monthly_goal numeric(12,2),
    address      text
);

-- ---------- Seguridad (Row Level Security) ----------
-- Solo usuarios con sesión iniciada (authenticated) pueden leer y escribir.
-- El rol "anon" (cualquiera con la URL) NO tiene acceso a nada.
alter table public.invoices      enable row level security;
alter table public.clients       enable row level security;
alter table public.inventory     enable row level security;
alter table public.app_settings  enable row level security;

drop policy if exists "auth_all_invoices"     on public.invoices;
drop policy if exists "auth_all_clients"      on public.clients;
drop policy if exists "auth_all_inventory"    on public.inventory;
drop policy if exists "auth_all_app_settings" on public.app_settings;

create policy "auth_all_invoices"     on public.invoices     for all to authenticated using (true) with check (true);
create policy "auth_all_clients"      on public.clients      for all to authenticated using (true) with check (true);
create policy "auth_all_inventory"    on public.inventory    for all to authenticated using (true) with check (true);
create policy "auth_all_app_settings" on public.app_settings for all to authenticated using (true) with check (true);
