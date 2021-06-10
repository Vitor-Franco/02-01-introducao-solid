import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = Object.assign(new User(), {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const userFilteredByID = this.users.find((user) => user.id === id);

    return userFilteredByID;
  }

  findByEmail(email: string): User | undefined {
    const userFilteredByEmail = this.users.find((user) => user.email === email);

    return userFilteredByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const { created_at, email, name, id } = receivedUser;

    const user = this.findById(id);

    const userUpdated = {
      id,
      email,
      name,
      admin: true,
      created_at,
      updated_at: new Date(),
    };

    Object.assign(user, userUpdated);

    return userUpdated;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
