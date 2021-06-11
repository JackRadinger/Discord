from .db import db

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False)

    conversation = db.relationship('Conversation', back_populates='messages')
    sender = db.relationship('User', back_populates='sent_messages', foreign_keys=[sender_id])
    recipient = db.relationship('User', back_populates='received_messages', foreign_keys=[recipient_id])

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'sender': self.sender.to_dict(),
            'recipient': self.recipient.to_dict(),
            'conversation_id': self.conversation_id,
            'read': self.read,
            'created_at': self.created_at.isoformat()
        }
