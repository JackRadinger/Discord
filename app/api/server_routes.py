from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Server, Channel, Conversation, DirectMessage, Message
import pprint

server_routes = Blueprint('servers', __name__)

pp = pprint.PrettyPrinter(indent=4)


@server_routes.route('/<int:userId>', methods=['GET'])
@login_required
def servers(userId):
    print('here')
    user = User.query.get(userId)
    print(user)
    user_servers = User.query.get(userId).servers_joined
    print(user_servers)
    servers = [server.to_dict() for server in user_servers]
    pp.pprint(servers)
    # return {"users": [user.to_dict() for user in users]}
    return jsonify(servers)


@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    user = User.query.get(id)
    return None
