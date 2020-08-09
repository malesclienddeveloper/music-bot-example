/*                                                  Client Developer Music Bot Example
                                                     1. Put Bot Token and Youtube API Key in .env file
                                                     2. Put Prefix in config.json
                                                     3. Modify It!
                                                     
          © Client Developer 2020 | Please, do not use our project as a commercial project. Instead, you can contribute on writing it       */

const discord = require("discord.js");
const client = new discord.Client({disableMentions:"everyone"})

const fs = require("fs")

const { prefix } = require("./config.json")
client.aliases = new discord.Collection();
client.commands = new discord.Collection();

client.queue = new Map()

//event
client.on('ready', () => {
  console.log(`${client.user.tag} ready to serving ${client.guilds.cache.size} guild(s) and ${client.users.cache.size} user(s)!`)
  client.user.setActivity("Some Music", {type:"LISTENING"})
});

const commandFile = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
commandFile.forEach(file => {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command);
  command.alias.forEach(alias => {
  client.aliases.set(alias, command);
  })
  })

client.on('message', msg => {
  if(msg.author.bot) return;
  if(!msg.guild) return;
  
  if(msg.content == `<@${client.user.id}>`){
    const embed = new discord.MessageEmbed()
    .setDescription(`:wave: | My prefix is ${prefix}`)
    .setColor("RANDOM")
    .setFooter("© Client Developer 2020")
    msg.channel.send(embed)
  }
  let args = msg.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();
  if(!msg.content.startsWith(prefix)) return;
  try {
    const file = client.commands.get(cmd) || client.aliases.get(cmd)
    if(!file) return msg.reply("Command that you want doesn't exist.")
    file.run(client, msg, args)
  } catch (err) {
    console.error(err)
  } finally {
    console.log(`${msg.author.tag} using ${cmd} in ${msg.channel.name} | ${msg.guild.name}`)
  }
}) 

//insert token at .env first
client.login(process.env.TOKEN)