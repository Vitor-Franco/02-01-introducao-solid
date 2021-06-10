import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string | string[];
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (Array.isArray(user_id)) {
      throw new Error(`Error`);
    }

    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error(`User ${user_id} not found`);
    }

    if (!user.admin) {
      throw new Error(`Unauthorized`);
    }

    const allUser = this.usersRepository.list();

    return allUser;
  }
}

export { ListAllUsersUseCase };
