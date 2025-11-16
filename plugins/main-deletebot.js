export const run = {
  usage: ['deletebot'],
  hidden: ['delbot'],
  category: 'main',
  async: async (m, {
    conn,
    text,
    Func
  }) => {
    if (!text) return m.reply(`Masukkan token yang mau dihapus!\n\nContoh: *${isPrefix+command} 818372:AAH-BaKzpiPqe*`)

    function stopBot(token) {
      if (!activeTokens.has(token)) return;
      try {
        const koneksi = connections.get(token);
        if (koneksi && koneksi.close) {
          koneksi.close();
          koneksi.stopPolling();
        }
        activeTokens.delete(token);
        connections.delete(token);
        m.reply(`⛔ Bot dimatikan. Token: ${token.slice(0, 10)}...`);
      } catch (err) {
        m.reply(`Gagal mematikan bot ${token.slice(0, 10)}...: ` + err.message);
      }
    }

    if (!activeTokens.has(text)) {
      return m.reply("Token yang kamu masukkan tidak ditemukan pada list")
    } else {
      stopBot(text)
    }
  },
  error: false,
}