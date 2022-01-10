
const { Client, Intents, Permissions } = require('discord.js');
const config = require('./config');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]});
const sleep = require('delay');
const color = require('colorette')


client.on('ready', async () => {
    let guild = client.guilds.cache.get(config.guildID)
    console.clear()
    console.log(color.yellowBright(`
   _____                                    _____           
  / ____|                                  |  __ \\          
 | (___  _ __   ___  _ __  ___  ___  _ __  | |__) | __ ___  
  \\___ \\| '_ \\ / _ \\| '_ \\/ __|/ _ \\| '__| |  ___/ '__/ _ \\ 
  ____) | |_) | (_) | | | \\__ \\ (_) | |    | |   | | | (_) |
 |_____/| .__/ \\___/|_| |_|___/\\___/|_|    |_|   |_|  \\___/ 
        | |                                                 
        |_|   Bot: ${client.user.tag}
                                                                                         
    `))

    if(!guild) return console.log(color.redBright(`ERROR GUILD INVALID.`))
        console.log(color.magentaBright(`Guild Pub: ${guild.name} \n`))
        console.log(`Lancement de la pub sur ` + color.blueBright(`${guild.name} `) + `membres ` + color.cyanBright(`[${guild.memberCount}] \n`));

        let countMemberSend = 0;
        guild.members.fetch().then(member => {
            member.forEach(m => {
                if(!m.user.bot){
                    if(config.pubStaff === "yes"){
                         m.send(config.messagePub).then(() => {
                                console.log(color.yellowBright(`[${countMemberSend++}] `) + color.greenBright(`Message send to => ${m.user.tag}`))
                            }).catch(e => {
                                console.log(color.redBright(`ERROR ${m.user.tag} DM closed.`))
                            })
                    }

                    if(config.pubStaff === "no"){
                        if(!m.permissions.has(Permissions.FLAGS.VIEW_AUDIT_LOG)){
                            m.send(config.messagePub).then(() => {
                                console.log(color.yellowBright(`[${countMemberSend++}] `) + color.greenBright(`Message send to => ${m.user.tag}`))
                            }).catch(e => {
                                console.log(color.redBright(`ERROR ${m.user.tag} DM closed.`))
                            })
                        }
                    }
                }
            })
        }).catch();
});

client.login(config.token)
