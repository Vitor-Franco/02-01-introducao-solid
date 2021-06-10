import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const userSelected = this.usersRepository.findById(user_id);

    if (!userSelected) {
      throw new Error(`User ${user_id} not found`);
    }

    const userUpdated = this.usersRepository.turnAdmin(userSelected);

    return userUpdated;
  }
}

export { TurnUserAdminUseCase };
