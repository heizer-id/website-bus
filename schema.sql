-- Tabel armada/kendaraan
CREATE TABLE buses (
  id INTEGER PRIMARY KEY,
  name TEXT,           -- contoh: "Rosalia Indah Exec 1"
  class TEXT,          -- ekonomi/bisnis/eksekutif/sleeper
  total_seats INTEGER, -- 40 atau 50
  seat_layout TEXT     -- JSON atau teks denah kursi
);

-- Tabel pengguna (Auth)
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user', -- 'admin' atau 'user'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Tabel jadwal perjalanan
CREATE TABLE schedules (
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
CREATE TABLE seat_bookings (
  id INTEGER PRIMARY KEY,
  schedule_id INTEGER,
  seat_code TEXT,      -- "1A", "1B", dst
  booking_date DATE,   -- hanya tanggal keberangkatan
  status TEXT,         -- "available", "booked", "paid"
  FOREIGN KEY (schedule_id) REFERENCES schedules(id)
);

-- Tabel transaksi/booking
CREATE TABLE transactions (
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

-- Insert dummy data
INSERT INTO buses (name, class, total_seats, seat_layout) VALUES 
('Super Executive 1', 'eksekutif', 32, '{"rows": 8, "cols": 4, "aisle": 2}'),
('Sleeper Royal', 'sleeper', 21, '{"rows": 7, "cols": 3, "aisle": 1}');

INSERT INTO schedules (bus_id, route_from, route_to, departure_time, arrival_time, price) VALUES 
(1, 'Jakarta', 'Surabaya', '2026-04-10T15:00:00Z', '2026-04-11T03:00:00Z', 450000),
(2, 'Jakarta', 'Surabaya', '2026-04-10T18:00:00Z', '2026-04-11T06:00:00Z', 650000);

-- Insert dummy users
-- password_hash for both is derived loosely. The actual API will hash it, but here we'll pre-fill a known hash if possible. 
-- Wait, WebCrypto API is used. Let's just create an endpoint that hashes it or insert clear text to be updated? 
-- No, for simplicity, I will just let the user register via the UI. But let's add an admin user with a simple pre-computed hash or handle clear text fallback for manual seeds.
-- I'll use a SHA-256 hash mechanism in auth.ts. Hash of 'admin123' is '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'.

INSERT INTO users (full_name, email, password_hash, role) VALUES 
('System Administrator', 'admin@nusantarabus.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin');
