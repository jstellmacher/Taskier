# Standard library imports
from random import choice as rc, randint

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Task

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        def seed_data():
            fake = Faker()

            print("Deleting data...")
            db.session.query(Task).delete(synchronize_session=False)
            db.session.query(User).delete()

            print("Creating users...")
            users = []
            for _ in range(5):
                email = fake.email()
                password = fake.password()
                username = fake.user_name()
                created_at = fake.date_time_this_decade()

                user = User(email=email, password=password, username=username, created_at=created_at)

                users.append(user)

                db.session.add(user)
                db.session.commit()

            print("Creating tasks...")
            tasks = []
            for user in users:
                for _ in range(2):
                    task = Task(
                        title=fake.sentence(nb_words=3),
                        description=fake.paragraph(),
                        user=user,  # Assign the user object directly
                        status=fake.random_element(elements=("todo", "in progress", "done")),
                        created_at=fake.date_time_this_decade()
                    )
                    tasks.append(task)
                    db.session.add(task)
                    db.session.commit()

            print("Seeding done!")

        seed_data()
