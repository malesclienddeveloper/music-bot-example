module.exports = {
 name: "penis",
 description: "Melihat seberapa panjang penis seseorang."=
 alias: ["kontol"],
 usage: "kontol @user",
 run: async (bot, message, args) => {
   const num = Math.floor(Math.random() * 20); // sampai 20 cm.
   const panjang_kontol = "8" + "=".repeat(num) + "))";

   let user = message.mentions.users.first() || message.author;
   if (user.bot) return message.reply("Robot mana punya kontol!!");
   let m = await message.channel.send(`Menebak panjang penis si ${user.username} ...`);
   setTimeout(() => {
    m.delete();
    message.channel.send(`${num < 12 ? "😆" : "😍"} **Penis si ${user.toString()} sepanjang :**\n\`\`\`${panjang_kontol}\`\`\``);
   }, 3000);
 }
};
