from flask import request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from flask_login import current_user
import os
import datetime
from datetime import date


from app.models import User, Channel, Conversation, DirectMessage, Message, Server, db, message

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://disvoice.herokuapp.com",
        "https://disvoice.herokuapp.com"
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

@socketio.on("private_chat")
def private_chat(data):
    if not Conversation.query.get(data["conversation_id"]):
        db.session.add(Conversation(
            user_1_id=data['sender_id'],
            user_2_id=data['recipient_id'],
        ))
        db.session.commit()

    message = DirectMessage(
        sender_id=data['sender_id'],
        recipient_id=data['recipient_id'],
        conversation_id=data['conversation_id'],
        body=data['body'],
        created_at=date.today()
    )

    db.session.add(message)
    db.session.commit()
    print('here', message.to_dict())

    send(message.to_dict(), to=f'conversation_{data["conversation_id"]}')

@socketio.on('join')
def on_join(data):
    message_type = data['type']

    if message_type == 'private':
        print('here2', data)
        join_room(f'conversation_{data["conversation_id"]}')


    else:
        join_room(f'channel_{data["channel_id"]}')

@socketio.on('leave')
def on_leave(data):
    print('here')
    message_type = data['type']

    if message_type == 'private':
        if data["conversation_id"]:
            leave_room(f'conversation_{data["conversation_id"]}')

    else:
        leave_room(f'channel_{data["channel_id"]}')
