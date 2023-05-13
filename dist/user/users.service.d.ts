import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { LogoutUserDto } from './dto/logout-user.dto';
import { UserDocument } from './entities/user.entity';
export declare class UsersService {
    private UserModel;
    constructor(UserModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): any;
    findAll(): any;
    findOne(id: string): any;
    login(authenticateUserDto: AuthenticateUserDto): any;
    logout(logoutUserDto: LogoutUserDto): any;
    update(id: string, updateUserDto: UpdateUserDto): any;
    remove(id: string): any;
}
