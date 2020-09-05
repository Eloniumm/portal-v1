# DiscordTickets Portal

[![GitHub issues](https://img.shields.io/github/issues/eartharoid/DiscordTickets-Portal?style=flat-square)](https://github.com/eartharoid/DiscordTickets-Portal/issues)    [![GitHub stars](https://img.shields.io/github/stars/eartharoid/DiscordTickets-Portal?style=flat-square)](https://github.com/eartharoid/DiscordTickets-Portal/stargazers)    [![GitHub forks](https://img.shields.io/github/forks/eartharoid/DiscordTickets-Portal?style=flat-square)](https://github.com/eartharoid/DiscordTickets-Portal/network)    [![GitHub license](https://img.shields.io/github/license/eartharoid/DiscordTickets-Portal?style=flat-square)](https://github.com/eartharoid/DiscordTickets-Portal/blob/master/LICENSE)    ![Codacy grade](https://img.shields.io/codacy/grade/897b22ca67b24908bcf4d54e4a0e32ef?logo=codacy&style=flat-square)    [![Discord support server](https://discordapp.com/api/guilds/451745464480432129/embed.png?style=shield)](https://discord.gg/pXc9vyC)

This is the accompanying archives web server for [DiscordTickets](https://github.com/eartharoid/DiscordTickets).

## Screenshot

![Screenshot](https://i.imgur.com/UvIxqOJ.png)


## Installation

This tutorial assumes you have a basic knowledge of server system administration.

1. Clone/download the repository
2. Edit `user/.env` (see [Configuration](#Configuration))
3. Configure the bot (see [Bot Configuration](#BotConfiguration))
4. Set up an NGINX reverse proxy (optionally with SSL - eg. `tickets.example.com` [80/443] -> `localhost:8080` [8080])
5. Set up PM2 or systemd to keep it running. (`node bin/www`)
6. Optionally change `src/public/favicon.ico` and `src/public/assets/img/logo.png`

## Configuration

`user/.env`
|Setting|Info|
|-------|----|
|HOST|Public host (eg. `https://tickets.example.com`)|
|PORT|Port for web server to run on|
|KEY|Secret string for the bot to use to upload data|
|NAME|Company/Guild/Bot name|
|KEEP_FOR|Number of days to keep archives for. Disable with `false`.|

### Bot Configuration

**DiscordTickets bot configuartion:**
In `user/config.js`, set `transcripts.web.enabled` and `transcripts.web.server`.

Then set `ARCHIVES_KEY` in `user/.env` to the same key you set before.

## Future plans

- Protected (Discord oauth2 login) user page for listing all archives belonging to that user
- (guild-style) mini sidebar if logged in

(donate if you want this faster)

## Known issues

- Newlines (`\n`) don't work
- Emoji aren't rendered inside embeds

## License

Released under [OSL-3.0 license](https://github.com/eartharoid/DiscordTickets-Portal/blob/master/LICENSE).

Copyright Bowser65 (frontend) & eartharoid (backend).

<details>
	<summary>Changes made from <a href="https://github.com/NailaBot/Discord-chat-replica">NailaBot/Discord-chat-replica</a></summary>
	<br>
	<ul>
		<li>Completely new server code</li>
		<li>Minor UI edits</li>
		<li>Added nicknames and coloured names</li>
	</ul>
</details>
