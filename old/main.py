import os
import discord
import discord.utils
import discord.client
from dotenv import load_dotenv
from discord import guild, user
from discord.ext import commands, tasks
from discord.ext.commands import Bot

load_dotenv()

GUILD = os.getenv('HTN2021 Bot Server')
intents = discord.Intents(messages=True, guilds=True,
                          reactions=True, members=True)
client = commands.Bot(command_prefix="~", intents=intents)
with open('discord_token.txt') as f:
    token = f.readline()

# command to allow bot to enter - on guild member join event
# if user.id = "rhythm bot id"
# start recording
# stop recording when stream of rhythm bot finishes
# 1. give command of user singing
# 2. link to song (api to grab youtube song)
# 3. queueskaraoke bot
# 4. rhythm bot joins when karoake bot joins and records straight away
# 5. record members audio
# 6. when rhythm bot pauses stop recording


@client.command()
async def hello(ctx):
    author = ctx.message.author.id
    await ctx.send(f"Hello <@{author}>")


@client.event
async def discord.on_voice_state_update(member, before, after):
    if before.voice.voice_channel is None and after.voice.voice_channel is not None:
        # start recording when groovy joins
    elif before.voice.voice_channel is not None and after.voice.voice_channel is None:
        # stop recording when groovy leaves


@client.command()
async def stop(ctx):
    msg = str(ctx.message)
    if msg is "~stop":
        # stop recording when user types ~stop


@ client.event
async def on_message(message):
    pass


def store_file():
    pass


async def on_bot_join(member):
    await ""
    # start recording when groovy makes sound

client.run(token)
