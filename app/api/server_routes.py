from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Server, Channel, Conversation, DirectMessage, Message, db
from app.models.server import joined_servers
import pprint

server_routes = Blueprint('servers', __name__)

pp = pprint.PrettyPrinter(indent=4)


@server_routes.route('/<int:userId>', methods=['GET'])
@login_required
def servers(userId):
    # print('here')
    user = User.query.get(userId)
    # print(user)
    user_servers = User.query.get(userId).servers_joined
    user_server = Server.query.join(joined_servers).filter(joined_servers.columns.user_id == userId)
    print(user_servers)
    servers = [server.to_dict() for server in user_servers]
    # pp.pprint(servers)
    # return {"users": [user.to_dict() for user in users]}
    return jsonify(servers)

@server_routes.route('/active/<int:serverId>', methods=['GET'])
@login_required
def server(serverId):
    # print('here')
    server = Server.query.get(serverId)
    print(server.to_dict())
    # user_servers = User.query.get(userId).servers_joined
    # user_server = Server.query.join(joined_servers).filter(joined_servers.columns.user_id == userId)
    # print(user_servers)
    # servers = [server.to_dict() for server in user_servers]
    # pp.pprint(servers)
    # return {"users": [user.to_dict() for user in users]}
    return jsonify(server.to_dict())

@server_routes.route('/create', methods=['POST'])
@login_required
def create_server():
    data = request.json
    print('here')
    print(data)
    print('here')
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

@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    user = User.query.get(id)
    return None
