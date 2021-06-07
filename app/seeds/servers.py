from app.models import db, User, Server, Channel
from faker import Faker
from random import randint

faker = Faker()

def seed_servers():
    servers = []
    channels = []
    for i in range(1,7):
        owner_id = randint(1,20)
        server = Server(
            name = faker.word(),
            serverPicture = None,
            owner_id = owner_id,
            invite_url = f'invite/{i}'
        )
        server.users.append(User.query.get(owner_id))
        channel = Channel(
            name = 'general',
            server_id = i
        )
        servers.append(server)
        channels.append(channel)

    db.session.add_all(servers)
    db.session.add_all(channels)
    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
