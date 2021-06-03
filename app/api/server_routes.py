from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Server, Channel, Conversation, DirectMessage, Message

server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
@login_required
def servers():
    # users = User.query.all()
    # return {"users": [user.to_dict() for user in users]}
    return None


@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    # user = User.query.get(id)
    return None
