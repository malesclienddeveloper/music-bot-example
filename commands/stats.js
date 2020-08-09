const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
module.exports = {
  name: "stats",
  alias:["st"],
  description: "Display bot stats",
  run: async (client, message) => {
    const serverQueue = client.queue.get(message.guild.id);
    let status = ''
    let lup = ''
    const mbed = new MessageEmbed()
    .setTitle(`${client.user.username} music stats`)
    .setFooter("© Client Developer 2020")
    .setColor("RANDOM")
    .addField("Uptime", `${parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60)}D ${parseInt((client.uptime / (1000 * 60 * 60)) % 24)}H ${parseInt((client.uptime / (1000 * 60)) % 60)}M ${parseInt((client.uptime / 1000) % 60)}S`)
    if (!serverQueue) return message.channel.send(mbed).catch(console.error);
    if(serverQueue.playing === true) status = "Playing"
    if(serverQueue.playing === false) status = "Paused"
    if(serverQueue.loop === true) lup = "Yes"
    if(serverQueue.loop === false) lup = "No"
    mbed.addField("Music", `Playing: ${serverQueue.songs[0].title}
Queued: ${parseInt((serverQueue.songs.length) - 1)} songs
In: ${serverQueue.channel.name}
Volume: ${serverQueue.volume}%
Status: ${status}
Loop? ${lup}
Requester: <@${serverQueue.songs[0].playUser}>`)
    message.channel.send(mbed)
  }
}