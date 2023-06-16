from sqlalchemy_serializer import SerializerMixin
from config import db
from datetime import datetime
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    __tablename__ = 'users'
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    email = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Set default value to current timestamp
    tasks = db.relationship('Task', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at,
            'tasks': [task.to_dict() for task in self.tasks]
        }

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)


class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    due_date = db.Column(db.DateTime)
    high_priority = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    todos = db.relationship('Todo', backref='task', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'high_priority': self.high_priority,
            'due_date': self.due_date.strftime('%Y-%m-%d') if self.due_date else None,
            'created_at': self.created_at,
            'todos': [todo.to_dict() for todo in self.todos]
        }


class Todo(db.Model, SerializerMixin):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'task_id': self.task_id,
            'created_at': self.created_at,
        }
