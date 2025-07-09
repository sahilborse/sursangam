const {pool} = require('../model/database');

class InstrumentService {
    // ✅ Increment practice count for an instrument
    static async incrementInstrumentPractice(userId, instrument) {
        return new Promise((resolve, reject) => {
            const validInstruments = ['tabla', 'sitar', 'flute'];
            if (!validInstruments.includes(instrument)) {
                return reject(new Error('Invalid instrument name'));
            }

            const query = `UPDATE instruments SET ${instrument} = ${instrument} + 1 WHERE id = $1`;
            pool.query(query, [userId], (err, result) => {
                if (err) return reject(err);
                resolve({ message: `Updated ${instrument} practice count for user ${userId}` });
            });
        });
    }

    // ✅ Get instrument practice data for a user
    static async getInstrumentData({ userId, instrument }) {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${instrument} FROM instruments WHERE id = $1`;
            pool.query(query, [userId], (err, results) => {
                if (err) return reject(err);
                if (results.rows.length === 0) return resolve(null);

                const instrumentValue = results.rows[0][instrument];

                if (isNaN(instrumentValue)) {
                    return reject(new Error("Invalid offset value")); // Ensure it's a number
                }
    
                const contentQuery = `SELECT * FROM content WHERE instrument = $1 LIMIT 1 OFFSET $2`;
                pool.query(contentQuery, [instrument, instrumentValue], (err, contentResults) => {
                    if (err) return reject(err);
                    resolve(contentResults.rows);
                });
            });
        });
    }
    
    static async getProgressData({ userId }) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM instruments WHERE id = $1`; 
            pool.query(query, [userId], (err, results) => {
                if (err) return reject(err);
                if (result.rows.length === 0) return resolve(null);
                resolve(results.rows[0]);
            });
        });  
    }
}

module.exports = InstrumentService;
