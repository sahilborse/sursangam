const { pool } = require('../model/database');

class InstrumentService {
  // ✅ Increment practice count for an instrument
  static async incrementInstrumentPractice(userId, instrument) {
    try {
      console.log("🎯 Increment called with", userId, instrument);

      const validInstruments = ['tabla', 'sitar', 'flute'];
      if (!validInstruments.includes(instrument)) {
        throw new Error(`Invalid instrument name: ${instrument}`);
      }

      const query = `UPDATE instruments SET ?? = ?? + 1 WHERE id = ?`;
      const [result] = await pool.query(query, [instrument, instrument, userId]);

      if (result.affectedRows === 0) {
        throw new Error(`User ${userId} not found`);
      }

      console.log("✅ Instrument count updated:", result);
      return {
        success: true,
        message: `Updated ${instrument} practice count for user ${userId}`,
      };
    } catch (error) {
      console.error("❌ Error incrementing practice count:", error.message);
      throw error;
    }
  }

  // ✅ Get instrument practice data for a user
  static async getInstrumentData({ userId, instrument }) {
    try {
      console.log("🎵 [getInstrumentData] Called with:", { userId, instrument });

      const validInstruments = ['tabla', 'sitar', 'flute'];
      if (!validInstruments.includes(instrument)) {
        throw new Error(`Invalid instrument name: ${instrument}`);
      }

      // 1️⃣ Fetch current practice offset
      const getInstrumentQuery = `SELECT ?? FROM instruments WHERE id = ?`;
      const [results] = await pool.query(getInstrumentQuery, [instrument, userId]);

      if (!results || results.length === 0) {
        throw new Error(`User ${userId} not found`);
      }

      const instrumentValue = results[0][instrument];
      console.log(`🎯 Current ${instrument} offset:`, instrumentValue);

      if (isNaN(instrumentValue)) {
        throw new Error(`Invalid offset value for ${instrument}`);
      }

      // 2️⃣ Fetch content at this offset
      const contentQuery = `SELECT * FROM content WHERE instrument = ? LIMIT 1 OFFSET ?`;
      const [contentResults] = await pool.query(contentQuery, [instrument, instrumentValue]);

      if (!contentResults || contentResults.length === 0) {
        console.warn("⚠️ No more content found for", instrument);
        return {
          success: true,
          message: `No more content available for ${instrument}`,
          content: null,
        };
      }

      console.log("✅ Content fetched successfully:", contentResults[0]);
      return {
        success: true,
        message: `Fetched ${instrument} content for user ${userId}`,
        content: contentResults[0],
      };
    } catch (error) {
      console.error("❌ Error fetching instrument data:", error.message);
      throw error;
    }
  }

  // ✅ Get progress data for all instruments
  static async getProgressData({ userId }) {
    try {
      const query = `SELECT * FROM instruments WHERE id = ?`;
      const [results] = await pool.query(query, [userId]);
      console.log("🎯 Progress data fetched:", results);

      if (!results || results.length === 0) {
        throw new Error(`No progress data found for user ${userId}`);
      }

      return {
        success: true,
        data: results[0],
      };
    } catch (error) {
      console.error("❌ Error fetching progress data:", error.message);
      throw error;
    }
  }
}

module.exports = InstrumentService;
