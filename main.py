import os
import discord
import discord.utils
import discord.client
from dotenv import load_dotenv
from discord import guild, user
from discord.ext import commands, tasks
from discord.ext.commands import Bot

load_dotenv()

GUILD = os.getenv('')
intents = discord.Intents(messages=True, guilds=True,
                          reactions=True, members=True)
client = commands.Bot(command_prefix="~", intents=intents)
with open('token.txt') as f:
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


def store_file():
    pass


def split_file():
    pass


client.run(token)
