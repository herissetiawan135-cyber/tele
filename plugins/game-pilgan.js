import axios from "axios"

export const run = {
   usage: ['pilgan'],
   hidden: ['repilgan'],
   category: 'game',
   async: async (m, {
      conn,
      text,
      isPrefix,
      command,
      Func,
      env
   }) => {
     conn.pilgan = conn.pilgan ? conn.pilgan : {}
     const id = m.chat
          
     if (command == "repilgan") delete conn.pilgan[id]
     
     if (id in conn.pilgan) return conn.reply(m.chat, `❗Masih ada soal belum terjawab di chat ini\n\nKetik *${isPrefix}repilgan* untuk memulai ulang`, conn.pilgan[id])
     
     const quiz = await getQuizQuestion();

     const quest = await conn.sendPoll(m.chat, quiz.question, quiz.choices, {
       type: 'quiz',
       correct_option_id: quiz.choices.indexOf(quiz.correct),
       is_anonymous: false
     });
     conn.pilgan[id] = quest
     
     const pollAnswerListener = (answer) => {
       const userId = answer.user.id;
       const option = answer.option_ids[0];
       
       if (quiz.choices.indexOf(quiz.correct) == option) {
         let userDb = global.db.users.find(v => v.jid == userId)
         userDb.exp += env.expgame
         conn.reply(m.chat, `🎉 *Kamu Benar!*\n+${env.expgame} Exp`, null, "Markdown", [[{text:"Mainkan Lagi🎮", callback_data: `${isPrefix+command}`}]])
       } else {
         conn.reply(m.chat, 'Jawaban Salah ❌', null, "Markdown", [[{text:"Mainkan Lagi🎮", callback_data: `${isPrefix+command}`}]])
       }
       delete conn.pilgan[id]
       
       conn.off('poll_answer', pollAnswerListener);
       setTimeout(async () => {
         conn.deleteMessage(m.chat, quest.message_id)
         delete conn.pilgan[id]
       }, 5000)
     };
     
     conn.on('poll_answer', pollAnswerListener);
   },
   error: false,
   cache: true,
   location: __filename
}

async function getQuizQuestion() {
  const { data: q } = await axios.get(`${apiUrl}/pilgan`)

  const question = q.question;
  const correct = q.correct_answer;
  const choices = q.incorrect_answers.map(ans => ans);
  choices.push(correct);
  choices.sort(() => Math.random() - 0.5);

  return {
    question,
    choices,
    correct
  };
}