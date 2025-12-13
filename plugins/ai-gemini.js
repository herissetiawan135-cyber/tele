import axios from "axios";

export const run = {
  usage: ['gemini'],
  use: 'ask',
  category: 'ai',
  async: async (m, {
    conn,
    text,
    isPrefix,
    command,
    env
  }) => {
  if (!text) return m.reply(`Masukkan text!\n\nContoh: ${isPrefix+command} apa kabar?`)

  try {
    conn.sendChatAction(m.chat, "typing")
    const { data } = await axios.get(`${apiUrl}/gemini/api?text=${text}`)
    m.reply(data.reply)
  } catch (error) {
    return m.reply("Terjadi kesalahan saat membuat gambar: " + error.message)
  }
   },
   error: false,
   restrict: true,
   cache: true,
   limit: true,
   location: __filename
}