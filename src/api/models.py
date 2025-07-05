from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    
    def __repr__(self):
        return f"user: {self.id} - email: {self.email}"

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "first_name": self.first_name,
                "last_name": self.last_name,}

    class Posts(db.Model):
        _tablename_ = 'post'
        id = db.Colum(db.Integer, primary_key=True)
        title = db.Colum(db.String, nullable=False)
        description = db.Colum(db.String)
        body = db.Colum(db.String)
        date = db.Colum(db.Date, nullable=False)
        image_url = db.Colum(db.String)
        user_id = db.Colum(db.Integer, db.ForeignaKey('users.id'))
        user_to = db.relationship(
            'Users', back_populates="posts_to", lazy='select')
        
        def __repr__(self):
            return f'<User {self.id}>'
    

    class Media(db.Model):
        _tablename_ = 'media'
        id = db.Colum

    
