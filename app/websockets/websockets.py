from flask import request
from flask_socketio import SocketIO, send, emit
from flask_login import current_user
import os
import datetime

from app.models import User, Channel, Conversation, DirectMessage, Message, Server, db

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

online_users = {}

@socketio.on('login')
def login(data):
    online_users[request.sid] = data['user_id']
    user = User.query.get(data['user_id'])
    # print('user servers', [server.to_dict() for server in user.servers_joined])
    # print('request.sid', request.sid)
    for server in user.servers_joined:
        emit('user_online', {'user_id': user.id, 'server': server.id})


@socketio.on('disconnect')
def on_disconnect():
    user = User.query.get(online_users[request.sid])

    for server in user.servers_joined:
        emit('user_offline', {'user_id': user.id, 'server': server.id})
    del online_users[request.sid]

@socketio.on('public_chat')
def channel_chat(data):
    new_message = Message(
        sender_id=data['sender_id'],
        channel_id=data['channel_id'],
        body=data['body'],
        created_at=datetime.datetime.utcnow()
    )
    db.session.add(new_message)
    db.session.commit()
    print(data)
    send(new_message.to_dict(), to=f'channel_{data["channel_id"]}')
