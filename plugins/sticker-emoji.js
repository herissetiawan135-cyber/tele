import sticker from '../lib/sticker.js';
import axios from "axios"

export const run = {
   usage: ["smoji"],
   category: 'sticker',
   use: 'emoji',
   async: async (m, {
      conn,
      text,
      isPrefix,
      command,
      Func,
      env
   }) => {
    if (!text) return m.reply(`Masukkan emoji yang mau dibuat sticker\nContoh: *${isPrefix + command} 😅*`)

    conn.sendChatAction(m.chat, "choose_sticker")
    
    try {
      const { data } = await axios.get(`https://fonts.gstatic.com/s/e/notoemoji/latest/${text.codePointAt(0).toString(16)}/512.png`, { responseType: "arraybuffer" })
      const stik = await sticker(data)
      await conn.sendSticker(m.chat, stik)
    } catch (e) {
      m.reply(e.message)
    }
   },
   error: false,
   restrict: true,
   cache: true,
   limit: true,
   location: __filename
}