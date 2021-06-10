import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const userByID = this.usersRepository.findById(user_id);

    if (!userByID) {
      throw new Error(`User ${user_id} not found.`);
    }

    return userByID;
  }
}

export { ShowUserProfileUseCase };
