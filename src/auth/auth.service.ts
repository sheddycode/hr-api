import { Users } from "./../users/entities/user.entity";
import { AuthRepository } from "./auth.repository";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto/create-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.enum";

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private authRepository: AuthRepository,
    @InjectRepository(Users) private userRepository: Repository<Users>
  ) {}

  public async register(body: RegisterDto): Promise<any | never> {
    const { username, email, password, firstName, lastName }: RegisterDto =
      body;
    let user: Users = await this.userRepository.findOne({
      where: { username },
    });

    if (user) {
      return {
        code: 400,
        message: `User with username ${username} Already Exist`,
        data: null,
      };
    }

    user = new Users();
    user.username = username;
    user.email = email;
    user.isActive = true;
    user.role = Role.Admin;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = this.authRepository.encodePassword(password);
    const savedUser = this.userRepository.save(user);
    if (savedUser) {
      return {
        code: 200,
        message: "User Registration Successful",
        data: savedUser,
      };
    } else {
      return {
        code: 500,
        message: "Unable to create User",
        data: null,
      };
    }
  }

  public async login(body: LoginDto): Promise<any | never> {
    const { username, password }: LoginDto = body;
    const user: Users = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      return { code: 404, message: "User not found", data: null };
    }

    const isPasswordValid: boolean = this.authRepository.isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        code: 401,
        message: "Username or Passowrd is Incorrect",
        data: null,
      };
    }

    this.userRepository.update(user.id, { lastLoginAt: new Date() });
    const token = this.authRepository.generateToken(user);
    if (token) {
      const userData = {
        token: token,
        userDetails: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          dateCreated: user.dateCreated,
          lastLoginAt: user.lastLoginAt,
        },
      };
      return {
        code: 200,
        message: "User LoggedIn Successful",
        data: userData,
      };
    } else {
      return {
        code: 500,
        message: "Unable to grant user access",
        data: null,
      };
    }
  }

  public async refresh(user: Users): Promise<string> {
    this.userRepository.update(user.id, { lastLoginAt: new Date() });

    return this.authRepository.generateToken(user);
  }

  public async validate(token: any) {
    return this.authRepository.validateUser(token);
  }

  public async getUsers() {
    return this.userRepository.find();
  }
}
