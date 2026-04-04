import { d as defineEventHandler, k as getRouterParam, c as createError, a as getDB } from '../../../_/nitro.mjs';
import QRCode from 'qrcode';
import 'jose';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const _code__get = defineEventHandler(async (event) => {
  const code = getRouterParam(event, "code");
  if (!code) {
    throw createError({ statusCode: 400, statusMessage: "Kode Booking diperlukan" });
  }
  const db = getDB();
  try {
    const tx = await db.prepare(`
      SELECT t.*, s.route_from, s.route_to, s.departure_time, s.arrival_time, 
             b.name as bus_name, b.class as bus_class 
      FROM transactions t
      JOIN schedules s ON t.schedule_id = s.id
      JOIN buses b ON s.bus_id = b.id
      WHERE t.booking_code = ?
    `).bind(code).first();
    if (!tx) {
      throw createError({ statusCode: 404, statusMessage: "Transaksi tidak ditemukan" });
    }
    let qrCodeDataUrl = null;
    if (tx.payment_status === "paid") {
      try {
        qrCodeDataUrl = await QRCode.toDataURL(code, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff"
          }
        });
      } catch (e) {
        console.error("Failed generating QR code", e);
      }
    }
    return {
      transaction: tx,
      qrCodeDataUrl
    };
  } catch (err) {
    if (err.statusCode === 404) throw err;
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});

export { _code__get as default };
//# sourceMappingURL=_code_.get.mjs.map
