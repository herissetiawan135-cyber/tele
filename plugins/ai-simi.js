import axios from 'axios';

export const run = {
  usage: ['simi'],
  hidden: ['simsimi'],
  use: 'text',
  category: 'ai',
  async: async (m, {
    conn,
    text,
    isPrefix,
    command,
    args,
    isAdmin
  }) => {
     const chat = global.db.chats.find(v => v.jid == m.chat)

     if (!text) return m.reply(`Masukkan pertanyaan atau kirim foto dengan pertanyaan`);

     if (args[0] == "auto") {
       if (m.isGroup && !(await isAdmin(m.sender))) return m.reply("Kamu bukan admin grup ini, hanya bisa di aktifkan oleh admin grup atau aktifkan di obrolan pribadi!")
       if (args[1] == "on") {
         chat.autosimi = true
         return conn.reply(m.chat, "Berhasil Mengaktifkan Auto Simi", m.msg, "Markdown", createButton())
       } else if (args[1] == "off") {
         delete chat.autosimi
         return conn.reply(m.chat, "Berhasil Mematikan Auto Simi", m.msg, "Markdown", createButton())
       } else {
         return conn.reply(m.chat, "Input tidak valid, hanya *on* dan *off*", m.msg, "Markdown", createButton())
       }
     }
     
     conn.sendChatAction(m.chat, "typing")
     
     let { data } = await axios.get(`https://smail.my.id/simi?text=${text}&lang=id&filter=false`)
     conn.reply(m.chat, data.response, m.msg, "Markdown", createButton())
     
     function createButton() {
       return [[{ text: chat.autosimi ? "Matikan Auto Simi🔴" : "Aktifkan Auto Simi🟢", callback_data: `${isPrefix+command} auto ${chat.autosimi ? 'off' : 'on'}` }]]
     }
   },
   error: false,
   restrict: true,
   cache: true,
   limit: true,
   location: __filename
}