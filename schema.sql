-- Tabel armada/kendaraan
CREATE TABLE IF NOT EXISTS buses (
  id INTEGER PRIMARY KEY,
  name TEXT,           -- contoh: "Rosalia Indah Exec 1"
  class TEXT,          -- ekonomi/bisnis/eksekutif/sleeper
  total_seats INTEGER, -- 40 atau 50
  seat_layout TEXT     -- JSON atau teks denah kursi
);

-- Tabel pengguna (Auth)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user', -- 'admin' atau 'user'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Tabel jadwal perjalanan
CREATE TABLE IF NOT EXISTS schedules (
  id INTEGER PRIMARY KEY,
  bus_id INTEGER,
  route_from TEXT,
  route_to TEXT,
  departure_time TEXT,  -- ISO datetime
  arrival_time TEXT,
  price INTEGER,        -- dalam Rupiah
  FOREIGN KEY (bus_id) REFERENCES buses(id)
);

-- Tabel pemesanan kursi (real-time lock)
CREATE TABLE IF NOT EXISTS seat_bookings (
  id INTEGER PRIMARY KEY,
  schedule_id INTEGER,
  seat_code TEXT,      -- "1A", "1B", dst
  booking_date DATE,   -- hanya tanggal keberangkatan
  status TEXT,         -- "available", "booked", "paid"
  FOREIGN KEY (schedule_id) REFERENCES schedules(id)
);

-- Tabel transaksi/booking
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY,
  booking_code TEXT UNIQUE,
  schedule_id INTEGER,
  user_id INTEGER,     -- pemesan terdaftar (fk dari users)
  passenger_name TEXT,
  passenger_phone TEXT,
  passenger_email TEXT,
  seat_codes TEXT,     -- "1A,1B" atau JSON
  total_amount INTEGER,
  payment_status TEXT, -- pending/paid/expired/failed
  doku_invoice_id TEXT,
  created_at TEXT,
  paid_at TEXT,
  qr_code TEXT,
  FOREIGN KEY (schedule_id) REFERENCES schedules(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- CLEANUP (Order matters for Foreign Keys)
DELETE FROM transactions;
DELETE FROM seat_bookings;
DELETE FROM schedules;
DELETE FROM buses;

-- SEED DATA
INSERT INTO buses (id, name, class, total_seats, seat_layout) VALUES 
(1, 'Super Executive 1', 'eksekutif', 32, '{"rows": 8, "cols": 4, "aisle": 2}'),
(2, 'Sleeper Royal', 'sleeper', 21, '{"rows": 7, "cols": 3, "aisle": 1}');

INSERT INTO schedules (id, bus_id, route_from, route_to, departure_time, arrival_time, price) VALUES 
(1, 1, 'Jakarta', 'Surabaya', '2026-04-10T15:00:00Z', '2026-04-11T03:00:00Z', 450000),
(2, 2, 'Jakarta', 'Surabaya', '2026-04-10T18:00:00Z', '2026-04-11T06:00:00Z', 650000),
(3, 1, 'Jakarta', 'Surabaya', '2026-04-11T15:00:00Z', '2026-04-12T03:00:00Z', 450000),
(4, 1, 'Surabaya', 'Jakarta', '2026-04-12T15:00:00Z', '2026-04-13T03:00:00Z', 450000);

-- Seed Admin User 
INSERT OR IGNORE INTO users (full_name, email, password_hash, role) VALUES 
('System Administrator', 'admin@nusantarabus.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin');
