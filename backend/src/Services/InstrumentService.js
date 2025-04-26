const {connection} = require('../model/database');

class InstrumentService {
    // ✅ Increment practice count for an instrument
    static async incrementInstrumentPractice(userId, instrument) {
        return new Promise((resolve, reject) => {
            const validInstruments = ['tabla', 'sitar', 'flute'];
            if (!validInstruments.includes(instrument)) {
                return reject(new Error('Invalid instrument name'));
            }

            const query = `UPDATE instruments SET ${instrument} = ${instrument} + 1 WHERE id = ?`;
            connection.query(query, [userId], (err, result) => {
                if (err) return reject(err);
                resolve({ message: `Updated ${instrument} practice count for user ${userId}` });
            });
        });
    }

    // ✅ Get instrument practice data for a user
    static async getInstrumentData({ userId, instrument }) {
        return new Promise((resolve, reject) => {
            const query = `SELECT ?? FROM instruments WHERE id = ?`; // Using parameterized query
            connection.query(query, [instrument, userId], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                
                const instrumentValue = results[0][instrument];
                
                if (isNaN(instrumentValue)) { 
                    return reject(new Error("Invalid offset value")); // Ensure it's a number
                }
    
                const contentQuery = `SELECT * FROM content WHERE instrument = ? LIMIT 1 OFFSET ?`;
                connection.query(contentQuery, [instrument, instrumentValue], (err, contentResults) => {
                    if (err) return reject(err);
                    resolve(contentResults);
                });
            });
        });
    }
    
    static async getProgressData({ userId }) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM instruments WHERE id = ?`; 
            connection.query(query, [userId], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                resolve(results[0]);
            });
        });  
    }
}

module.exports = InstrumentService;
