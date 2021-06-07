from .db import db

joined_servers = db.Table(
    'joined_servers',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('server_id', db.Integer, db.ForeignKey('servers.id'), primary_key=True)
)


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    serverPicture = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    invite_url = db.Column(db.String(25))

    owner = db.relationship('User', back_populates='servers_owned')
    channels = db.relationship('Channel', cascade='all, delete-orphan', back_populates='server')
    users = db.relationship('User', secondary=joined_servers, back_populates='servers_joined')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'serverPicture': self.serverPicture,
            'owner': self.owner.to_dict(),
            'invite_url': self.invite_url,
            'channels': [channel.to_dict() for channel in self.channels],
            'users': [user.to_dict() for user in self.users]
        }
