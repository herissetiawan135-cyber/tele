import axios from 'axios'

let timeout = 60000

export const run = {
   usage: ['tebakff'],
   category: 'game',
   async: async (m, {
      conn,
      text,
      isPrefix,
      command,
      users,
      env
   }) => {
    conn.tebakff = conn.tebakff ? conn.tebakff: {}
    let id = 'tebakff-' + m.chat
    if (id in conn.tebakff) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakff[id][0])
    let { data: json } = await axios.get(`${apiUrl}/tebakff`)

    let caption = `
✏️${json.deskripsi}

🕑Timeout *${(timeout / 1000).toFixed(2)} detik*

💥Bonus: ${env.expgame} XP
Ketik ${isPrefix}hff untuk bantuan
`.trim()
    conn.tebakff[id] = [
        await conn.sendButton(m.chat, [{name: "Bantuan💢", command: ".hff"}], json.fullimg, 'tebakff.jpg', caption, m.msg, env.wm),
        json,
        setTimeout(() => {
            if (conn.tebakff[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakff[id][0])
            delete conn.tebakff[id]
        }, timeout)
    ]
  },
  error: false,
  restrict: true,
  cache: true,
  location: __filename
}