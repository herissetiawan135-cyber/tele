export const run = {
  usage: ['script'],
  hidden: ['sc'],
  category: 'main',
  async: async (m, {
    conn,
    text,
    isPrefix,
    command,
    env
  }) => {
    conn.sendChatAction(m.chat, "upload_document")
    await conn.sendButton(m.chat, donateBtn, "https://github.com/RayNozawa/TeleBot/archive/refs/heads/main.zip", "TeleBot.zip", 'https://github.com/RayNozawa/TeleBot', m.msg, env.wm);
   },
   error: false,
   restrict: true,
   cache: true,
   location: __filename
}