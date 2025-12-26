import { Injectable,InternalServerErrorException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userservices:UserService,private readonly jwtService:JwtService){}
    async signup(userData){
        try{
            const newUser = await this.userservices.createUser(userData)
            if(newUser && newUser.hasOwnProperty('statusCode') && newUser['statusCode']=== 201){
                const userToken = await this.jwtService.signAsync({ sub: newUser['_id'], role: newUser['role']}, { expiresIn: '1h' });
                return {userId: newUser['userId'] ,token:userToken};
            }
            throw newUser
        }catch(err){
            console.log(err);
            throw new InternalServerErrorException(err);
        }
       
    }
    async signin(loginUser){
        try{
            const userLogin = await this.userservices.signin(loginUser);
            if(userLogin && userLogin.hasOwnProperty('statusCode') && userLogin['statusCode'] === 200){
                const userToken = await this.jwtService.signAsync({ sub: userLogin['userId'], role: userLogin['role']}, { expiresIn: '1h' });
                return {userId: userLogin['userId'] ,token:userToken};
            }
            throw userLogin
        }catch(err){
            console.log(err);
            throw new InternalServerErrorException(err);
        }
    }
    async getProfile(userId){
        try{
            const userProfile = await this.userservices.getProfile(userId);
            if(userProfile && userProfile.hasOwnProperty('statusCode') && userProfile['statusCode'] === 200){
                return userProfile;
            }
            return userProfile;
        }catch(err){
            console.log(err);
            throw new InternalServerErrorException(err);
        }
    }
    async updateUser(userId,userData){
        try{
            const userUpdate = await this.userservices.updateUser(userId,userData);
            if(userUpdate && userUpdate.hasOwnProperty('statusCode') && userUpdate['statusCode'] === 200){
                return userUpdate;
            }
            throw userUpdate;
        }catch(err){
            console.log(err);
        }
    }

}
