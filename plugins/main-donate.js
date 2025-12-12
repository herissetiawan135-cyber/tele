export const run = {
   usage: ['donate'],
   hidden: ['donasi'],
   category: 'main',
   async: async (m, {
      conn,
      text,
      isPrefix,
      command,
      users,
      env,
      Func,
      Scraper
   }) => {
     let caption = `Haii ${await getName(m.sender, conn)}👋\n\nTerimakasih jika kamu mau berdonasi, untuk donasi scan qris di atas bisa menggunakan semua metode pembayaran yang mendukang qris`
     try {
       await conn.sendPhoto(m.chat, 'https://cdn.videy.co/jNyW4oiC1.mp4', { caption: caption, reply_to_message_id: m.id });
     } catch (e) {
       m.reply("Gagal mengambil gambar!")
     }
   },
   cooldown: true
}