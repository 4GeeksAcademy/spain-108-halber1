from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__='users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String, nullable = True)
    last_name = db.Column(db.String, nullable = True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<Users:{self.id} - email: {self.email}>'

    def serialize(self):
        # do not serialize the password, its a secururity breach
        return {"id": self.id,
                "email": self.email,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "is_active": self.is_active,
                "is_admin": self.is_admin}
    

class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    body = db.Column(db.String)
    date = db.Column(db.Date, nullable=False)
    image_url = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f'user_id: {self.user_id}'
    
    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'body': self.body,
                'date': self.date}
    

class Media(db.Model):
    __tablename__='media'
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum( "image", "video", "audio", name='media_type'), nullable=False)
    url = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship ('Posts',foreign_keys = [post_id],
                              backref = db.backref('post_id_to', lazy = 'select'))
    
    def __repr__(self):
        return f'user_id: {self.post_id}'
    
    def serialize(self):
        return {'id': self.id,
                'media_type': self.media_type,
                'image_url': self.image_url,
                'post_id': self.post_id}


class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys = [following_id],
                                   backref=db.backref('following_to', lazy='select'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys = [follower_id],
                                   backref=db.backref('follower_to', lazy='select'))

    def __repr__(self):
        return f'following: {self.following_id} - follower: {self.follower_id}'
    
    def serialize(self):
        return {'id': self.id,
                'following_id': self.following_id,
                'follower_id': self.follower_id}


class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id])

    def __repr__(self):
        return f'user_id: {self.post_id}'
    
    def serialize(self):
        return {'id': self.id,
                'body': self.body,
                'user_id': self.user_id,
                'post_id': self.post_id}


class CharacterFavorites(db.Model):
    __tablename__='character_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id],
                                 backref=db.backref('user_to', lazy='select'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_to = db.relationship('Characters', foreign_keys=[character_id],
                                      backref=db.backref('character_to', lazy='select'))
    
    def __repr__(self):
        return f'user_id: {self.user_id}'
    
    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'character_id': self.character_id}



class PlanetsFavorites(db.Model):
    __tablename__='planets_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_to = db.relationship('Users', foreign_keys = [user_id],
                                   backref=db.backref('user_id_to', lazy='select'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    planet_to = db.relationship('Planets', foreign_keys = [planet_id],
                                   backref=db.backref('planet_to', lazy='select'))
    
    def __repr__(self):
        return f'user_id: {self.user_id}'
    
    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'planet_id': self.planet_id}


class Characters(db.Model):
    __tablename__='characters'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    height = db.Column(db.String)
    mass = db.Column(db.String)
    hair_color = db.Column(db.String)
    skin_color = db.Column(db.String)
    eye_color = db.Column(db.String)
    birth_year = db.Column(db.String)
    gender = db.Column(db.String)

    def __repr__(self):
        return f'<Character {self.name}>'
    
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "height": self.height,
                "mass": self.mass,
                "hair_color": self.hair_color,
                "skin_color": self.skin_color,
                "eye_color": self.eye_color,
                "birth_year": self.birth_year,
                "gender": self.gender}


class Planets(db.Model):
    __tablename__='planets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    diameter = db.Column(db.String)
    rotation_period = db.Column(db.String)
    orbital_period = db.Column(db.String)
    gravity = db.Column(db.String)
    population = db.Column(db.String)
    climate = db.Column(db.String)
    terrain = db.Column(db.String)

    def __repr__(self):
        return f'<Planet {self.name}>'
    
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "diameter": self.diameter,
                "rotation_period": self.rotation_period,
                "prbital_period": self.prbital_period,
                "gravity": self.gravity,
                "population": self.population,
                "climate": self.climate,
                "terrain": self.terrain}
