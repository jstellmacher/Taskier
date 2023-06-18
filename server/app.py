from flask import Flask, jsonify, request, make_response, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from config import app, db
from models import User, Task, Todo
from datetime import datetime

migrate = Migrate(app, db)
api = Api(app)
bcrypt = Bcrypt(app)


def get_authenticated_user():
    user_id = session.get('user_id')
    if user_id:
        return User.query.get(user_id)
    return None


def login_required(f):
    def wrapper(*args, **kwargs):
        user = get_authenticated_user()
     
        if not user:
            return {'error': 'Not Authorized'}, 401
        return f(user, *args, **kwargs)

    return wrapper


@app.route('/')
def index():
    return '<h1>TASKIER</h1>'


class Account(Resource):
    @login_required
    def patch(self, user):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        if 'username' in data:
            new_username = data['username']
            user.username = new_username

        if 'password' in data:
            new_password = data['password']
            hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
            user.password = hashed_password

        db.session.commit()

        return make_response(jsonify({'message': 'Account updated successfully'}), 200)

    @login_required
    def get(self, user):
        return jsonify(user.to_dict())


class Tasks(Resource):
    @login_required
    def get(user, self):
        tasks = user.tasks
        tasks_list = [task.to_dict() for task in tasks]
        return make_response(jsonify({'tasks': tasks_list}), 200)


    @login_required
    def post(user, self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        title = data.get('title')
        description = data.get('description')
        high_priority = data.get('high_priority', False)

        if high_priority is not True and high_priority is not False:
            return make_response(jsonify({'error': 'Invalid value for high_priority. Expected boolean.'}), 400)

        task = Task(title=title, description=description, high_priority=high_priority, user=user)
        db.session.add(task)
        db.session.commit()

        return make_response(jsonify({'message': 'Task added successfully', 'task': task.to_dict()}), 201)

    @login_required
    def delete(self, user):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        task_id = data.get('task_id')
        task = Task.query.filter_by(user_id=user.id, id=task_id).first()
        if not task:
            return make_response(jsonify({'error': 'Task not found'}), 404)

        db.session.delete(task)
        db.session.commit()

        return make_response(jsonify({'message': 'Task deleted successfully'}), 200)


class TaskById(Resource):
    @login_required
    def get(user, id, self):

        task = Task.query.filter_by(user_id=user.id, id=id).first()
        if task:
            return jsonify(task.to_dict())
        return {'error': 'Task not found'}, 404

    @login_required
    def patch(user, *args, **kwargs):
        id = kwargs.pop('id', None)
        task = Task.query.filter_by(user_id=user.id, id=id).first()
        if not task:
            return {'error': 'Task not found'}, 404

        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)
 
        try:
            for key, value in data.items():
                
                if hasattr(task, key):
                    if (key == "due_date") and value:

                        task.__setattr__(key, datetime.strptime(value, '%Y-%m-%d'))
                    else:
                        task.__setattr__(key, value)
            

            db.session.commit()
        except ValueError as e:
         
            return make_response(jsonify({'error': 'Invalid due_date format. Expected: YYYY-MM-DD'}), 400)

        return jsonify(task.to_dict())

    @login_required
    def delete(self, user, id):
        task = Task.query.filter_by(user_id=user.id, id=id).first()
        if not task:
            return make_response(jsonify({'error': 'Task not found'}), 404)

        db.session.delete(task)
        db.session.commit()

        return make_response(jsonify({'message': 'Task deleted successfully'}), 200)





class Signup(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        password = data.get('password')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        user = User(username=data.get('username'), password=hashed_password, email=data.get('email'))
        user.created_at = datetime.now()

        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id

        return make_response(jsonify({'message': 'User created successfully'}), 201)


class Login(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if not user:
            return {'error': 'User not found'}, 401

        if not bcrypt.check_password_hash(user.password, password):
            return {'error': 'Invalid credentials'}, 401

        session['user_id'] = user.id

        return make_response(jsonify({'message': 'User logged in successfully'}), 200)


class Logout(Resource):
    def post(self):
        if 'user_id' in session:
            session.pop('user_id', None)  # Remove user ID from the session
            return make_response(jsonify({'message': 'Logged out successfully'}), 200)
        else:
            return make_response(jsonify({'message': 'No user logged in'}), 200)


class CheckLoginStatus(Resource):
    def get(self):
        if 'user_id' in session:
            return {'loggedIn': True}, 200
        else:
            return {'loggedIn': False}, 200


class Users(Resource):
    @login_required
    def get(self, user):
        todos = user.todos
        todos_list = [todo.to_dict() for todo in todos]
        return make_response(jsonify({'todos': todos_list}), 200)


api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Account, '/account')
api.add_resource(Signup, '/signup')
api.add_resource(Tasks, '/tasks')
api.add_resource(TaskById, '/tasks/<int:id>')
api.add_resource(CheckLoginStatus, '/check-login-status')
api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
