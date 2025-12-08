import fs from 'fs';
import path from 'path';

export const run = {
   async: async (m, { conn, Api, body, Func, users, env, isROwner }) => {
    if (!db.backupTime) db.backupTime = 0
    const now = Date.now();
    const THIRTY_MIN = 5 * 60 * 1000;

    if (now - db.backupTime < THIRTY_MIN) return;
    
    const tasks = [
        {
            fileName: 'bot_token.json',
            fullPath: path.join(__dirname, "../bot_token.json")
        },
        {
            fileName: 'database.json',
            fullPath: path.join(process.cwd(), "/database.json")
        }
    ];

    let allSuccess = true;

    for (const task of tasks) {
        let success = await conn.sendDocument(env.OWNER_ID, task.fullPath)

        if (!success) allSuccess = false;
    }

    if (allSuccess) {
        db.backupTime = now;
    }
   },
   error: false,
   cache: true,
   location: __filename
};