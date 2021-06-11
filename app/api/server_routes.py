from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Server, Channel, Conversation, DirectMessage, Message, channel, db
from app.models.server import joined_servers
import pprint

server_routes = Blueprint('servers', __name__)

pp = pprint.PrettyPrinter(indent=4)


@server_routes.route('/<int:userId>', methods=['GET'])
@login_required
def servers(userId):

    user_servers = User.query.get(userId).servers_joined

    # print(user_servers)
    servers = [server.to_dict() for server in user_servers]

    return jsonify(servers)

@server_routes.route('/active/<int:serverId>', methods=['GET'])
@login_required
def server(serverId):

    server = Server.query.get(serverId)
    # print(server.to_dict())

    return jsonify(server.to_dict())

@server_routes.route('/all', methods=['GET'])
@login_required
def all_server():

    servers = Server.query.all()
    # print(server.to_dict())

    return jsonify([server.to_dict() for server in servers])

@server_routes.route('/create', methods=['POST'])
@login_required
def create_server():
    data = request.json
    # print('here')
    # print(data)
    # print('here')
    try:
        picture = data['serverPicture']
    except:
        picture = ''
    server = Server(
        name = data['serverName'],
        serverPicture = picture,
        owner_id = data['userId'],
        invite_url = ''
    )
    server.users.append(User.query.get(current_user.id))
    db.session.add(server)
    db.session.commit()
    server.invite_url = f'invite/{server.id}'
    channel = Channel(
        name='general',
        server_id = server.id
    )
    db.session.add(channel)
    db.session.commit()
    return server.to_dict()

@server_routes.route("/<int:id>", methods=['PUT'])
@login_required
def edit_server(id):
    data = request.json

    print(data)

    try:
        picture = data['serverPicture']
    except:
        picture = ''

    server = Server.query.get(id)

    server.name = data['name']
    server.serverPicture = picture
    db.session.add(server)
    db.session.commit()
    return server.to_dict()




@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    print('here')
    server = Server.query.get(id)
    print(server.to_dict())
    server.users.remove(User.query.get(server.owner.id))
    db.session.add(server)
    db.session.commit()
    return server.to_dict()


    # FIX THIS SO IT REMOVES ALL USERS FROM THE SERVER

@server_routes.route("/channel/<int:id>", methods=['PUT'])
@login_required
def edit_channel(id):
    data = request.json

    channel = Channel.query.get(id)
    print(channel.to_dict())
    channel.name = data['name']
    print(channel.to_dict())
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()

@server_routes.route('/channel/<int:id>', methods=['DELETE'])
@login_required
def delete_channel(id):
    channel = Channel.query.get(id)
    print(channel.to_dict())
    db.session.delete(channel)
    db.session.commit()
    return channel.to_dict()

@server_routes.route('/channel', methods=['POST'])
@login_required
def create_channel():
    data = request.json
    print(data['server_id'])
    server = Server.query.get(data['server_id'])
    if server.owner_id == current_user.id:
        channel = Channel(name=data['name'], description=data['description'], server_id=data['server_id'])
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()

@server_routes.route('/join/<int:id>', methods=['POST'])
@login_required
def join_server(id):
    server = Server.query.get(id)
    server.users.append(User.query.get(current_user.id))
    # server.members.append(User.query.get(1))
    db.session.add(server)
    db.session.commit()
    return server.to_dict()

@server_routes.route('/leave/<int:id>', methods=['DELETE'])
@login_required
def leave_server(id):
    server = Server.query.get(id)
    server.users.remove(User.query.get(current_user.id))
    db.session.add(server)
    db.session.commit()
    return server.to_dict()
