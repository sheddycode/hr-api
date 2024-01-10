import { Users } from './../users/entities/user.entity';
import { AuthRepository } from './auth.repository';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private authRepository: AuthRepository,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) { }
  public async register(body: RegisterDto): Promise<Users | never> {
    const { username, email, password, firstName, lastName }: RegisterDto = body;
    let user: Users = await this.userRepository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new Users();

    user.username = username;
    user.email = email;
    user.isActive = true
    user.firstName = firstName
    user.lastName = lastName
    user.password = this.authRepository.encodePassword(password);

    return this.userRepository.save(user);
  }


  public async login(body: LoginDto): Promise<any | never> {
    const { username, password }: LoginDto = body;
    const user: Users = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      // throw new HttpException('No user found', HttpStatus.NOT_FOUND);
      return { message: 'User not found' };
    )

    const isPasswordValid: boolean = this.authRepository.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.userRepository.update(user.id, { lastLoginAt: new Date() });

    return this.authRepository.generateToken(user);
  }

  public async refresh(user: Users): Promise<string> {
    this.userRepository.update(user.id, { lastLoginAt: new Date() });

    return this.authRepository.generateToken(user);
  }

  public async validate(token: any) {
    return this.authRepository.validateUser(token)
  }

  public async getUsers(){
    return this.userRepository.find()
  }
}
