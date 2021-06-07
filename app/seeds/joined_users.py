from app.models import db, User, Server, Channel
from faker import Faker
from random import randint

fake = Faker()


def seed_joined_users():

    servers = Server.query.all()

    for i in range(0, len(servers)):
        for user in range(1, randint(1, 20)):
            if user != servers[i].owner_id:
                servers[i].users.append(User.query.get(user))

    db.session.commit()


def undo_joined_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
