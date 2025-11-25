import axios from 'axios'

let timeout = 60000

export const run = {
   usage: ['tebakml'],
   category: 'game',
   async: async (m, {
      conn,
      text,
      isPrefix,
      command,
      users,
      env
   }) => {
    conn.tebakml = conn.tebakml ? conn.tebakml: {}
    let id = 'tebakml-' + m.chat
    if (id in conn.tebakml) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakml[id][0])
    let { data: json } = await axios.get(`${apiUrl}/tebakml`)

    let caption = `
✏️${json.deskripsi}

🕑Timeout *${(timeout / 1000).toFixed(2)} detik*

💥Bonus: ${env.expgame} XP
Ketik ${isPrefix}hml untuk bantuan
`.trim()
    conn.tebakml[id] = [
        await conn.sendButton(m.chat, [{name: "Bantuan💢", command: ".hml"}], json.fullimg, 'tebakml.jpg', caption, m.msg, env.wm),
        json,
        setTimeout(() => {
            if (conn.tebakml[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakml[id][0])
            delete conn.tebakml[id]
        }, timeout)
    ]
  },
  error: false,
  restrict: true,
  cache: true,
  location: __filename
}