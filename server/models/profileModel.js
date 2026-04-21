const pool = require("../config/db");

let schemaReadyPromise = null;

async function ensureProfileSchema() {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      const dbName = process.env.DB_NAME || "hexal_db";
      const [columns] = await pool.execute(
        `SELECT COLUMN_NAME
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'profiles'`,
        [dbName],
      );
      const columnSet = new Set(columns.map((c) => c.COLUMN_NAME));
      if (!columnSet.has("profile_photo")) {
        await pool.execute("ALTER TABLE profiles ADD COLUMN profile_photo LONGTEXT NULL");
      }
      if (!columnSet.has("two_factor_enabled")) {
        await pool.execute(
          "ALTER TABLE profiles ADD COLUMN two_factor_enabled TINYINT(1) NOT NULL DEFAULT 0",
        );
      }
    })().catch((err) => {
      schemaReadyPromise = null;
      throw err;
    });
  }
  await schemaReadyPromise;
}

async function findProfileByEmail(email) {
  await ensureProfileSchema();
  const [rows] = await pool.execute(
    `SELECT id, email, first_name, last_name, phone, profile_photo, dark_mode, font_size, language, email_notif, two_factor_enabled
     FROM profiles
     WHERE email = ?`,
    [email],
  );
  return rows[0] ?? null;
}

async function createProfile(payload) {
  await ensureProfileSchema();
  await pool.execute(
    `INSERT INTO profiles (email, first_name, last_name, phone, profile_photo, dark_mode, font_size, language, email_notif, two_factor_enabled)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.email,
      payload.first_name,
      payload.last_name,
      payload.phone,
      payload.profile_photo,
      payload.dark_mode,
      payload.font_size,
      payload.language,
      payload.email_notif,
      payload.two_factor_enabled,
    ],
  );
}

async function updateProfileByEmail(email, payload) {
  await ensureProfileSchema();
  await pool.execute(
    `UPDATE profiles
     SET first_name = ?, last_name = ?, phone = ?, profile_photo = ?, dark_mode = ?, font_size = ?, language = ?, email_notif = ?, two_factor_enabled = ?
     WHERE email = ?`,
    [
      payload.first_name,
      payload.last_name,
      payload.phone,
      payload.profile_photo,
      payload.dark_mode,
      payload.font_size,
      payload.language,
      payload.email_notif,
      payload.two_factor_enabled,
      email,
    ],
  );
}

async function updateTwoFactorByEmail(email, enabled) {
  await ensureProfileSchema();
  await pool.execute(
    "UPDATE profiles SET two_factor_enabled = ? WHERE email = ?",
    [enabled ? 1 : 0, email],
  );
}

module.exports = {
  findProfileByEmail,
  createProfile,
  updateProfileByEmail,
  updateTwoFactorByEmail,
};
