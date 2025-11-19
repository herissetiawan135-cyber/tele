import similarity from 'similarity'
const threshold = 0.72
export const run = {
  async: async (m, { conn, Api, body, Func, users, env, isROwner, isPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    
    let id = m.chat
    let json = JSON.parse(JSON.stringify(conn.tebakbendera[id]?.[1] || {}))
    
    if (!json.name) return
    
    if (m.text == (isPrefix + "hben")) return conn.reply(m.chat, `<pre><code class="language-Clue">${json.name.replace(/[AIUEOaiueo]/ig, '_')}</code></pre>`, m.msg, "HTML")

    if (json.name || !m.quoted || !m.text || !/Ketik.*hben/i.test(m.quoted.text) || /.*hben/i.test(m.text)) {
        if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) m.reply(`*Reply pertanyaannya untuk menjawab!*`)
        return !0
    }
    
    if (!(id in conn.tebakbendera)) return conn.reply(m.chat, 'Soal itu telah berakhir', m.msg)
    if (m.quoted.id == conn.tebakbendera[id][0].message_id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            let time = users.lastcommand + 120000
            if (new Date - users.lastcommand < 120000) return global.cd('2 menit')
            users.lastcommand = new Date * 1
            clearTimeout(conn.tebakbendera[id][2])
            delete conn.tebakbendera[id]
            return conn.reply(m.chat, '*Yah Menyerah :( !*', m)
        }

        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            users.exp += env.expgame
            let caption = `🎉 *Kamu Benar!*\n+${env.expgame} Exp`
            await conn.reply(m.chat, caption, m.msg, "Markdown", [[{ text: 'Mainkan Lagi🎮', callback_data: '.tebakbendera' }]])
            clearTimeout(conn.tebakbendera[id][2])
            delete conn.tebakbendera[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold)
            m.reply('*Dikit Lagi!*')
        else
            m.reply('Salah ❌')
    }
    return !0
  },
  error: false,
  cache: true,
  location: __filename
}