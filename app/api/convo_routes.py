from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Server, Channel, Conversation, DirectMessage, Message, channel, conversation, db
from app.models.server import joined_servers
from sqlalchemy import or_, and_
import pprint

convo_routes = Blueprint('convos', __name__)

pp = pprint.PrettyPrinter(indent=4)


@convo_routes.route('/<int:userId>', methods=['GET'])
@login_required
def convos(userId):
    conversations = Conversation.query.filter(or_(Conversation.user_1_id == userId, Conversation.user_2_id == userId))

    return jsonify([conversation.to_dict() for conversation in conversations])

@convo_routes.route('/conversation/<int:conversationId>', methods=['GET'])
@login_required
def convo(conversationId):
    conversation = Conversation.query.get(conversationId)

    return jsonify(conversation.to_dict())

@convo_routes.route('/', methods=['POST'])
@login_required
def create_conversation():
    data = request.json
    other_user_id = data['userId']

    conversation = Conversation.query.filter(or_(
        and_(Conversation.user_1_id == current_user.id,
             Conversation.user_2_id == other_user_id),
        and_(Conversation.user_2_id == current_user.id,
             Conversation.user_1_id == other_user_id))).all()

    if(len(conversation) > 0):
        return {"conversationId": conversation[0].id}

    conversation = Conversation(
        user_1_id=current_user.id,
        user_2_id=data['userId']
    )

    db.session.add(conversation)
    db.session.commit()

    return {"conversationId": conversation.id}
