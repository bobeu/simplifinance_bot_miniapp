from http.server import BaseHTTPRequestHandler
import os
import json
import datetime
from telebot.async_telebot import AsyncTeleBot
import firebase_admin
from firebase_admin import credentials, firestone, storage
from telebot import types
from telebot.types import InlineKeyboardMarkUp, InlineKeyboardButton, WebAppInfo

# Intialize bot
BOT_TOKEN = os.environ.get('BOT_TOKEN')
bot = AsyncTeleBot(BOT_TOKEN)

# Initialize Firebase
firebase_config = json.loads(os.environ.get('FIREBASE_SERVICE_ACCOUNT'))
cred = credentials.Certificate(firebase_config)
firebase_admin.initialize_app(cred, {'storageBucket': 'yourapp.appspot.com'})
db = firestore.client()
bucket = storage.bucket()

def generate_start_keyboard():
    keyboard = InlineKeyboardMarkUp()
    keyboard.add(InlineKeyboardButton("Open Simplifi App", web_app=WebAppInfo(url="https://testnet.simplifinance.xyz")))
    return keyboard