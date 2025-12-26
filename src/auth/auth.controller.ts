import { Body, Controller,UseGuards,Post,InternalServerErrorException,Get,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto} from './dto/user.dto';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly auth:AuthService){}
    @Post('/signup')
    signup(@Body() CreateUser:CreateUserDto){
        try{
            return this.auth.signup(CreateUser);
        }catch(err){
           throw new InternalServerErrorException(err);
        }
    }
    @Post('/signin')
    async signin(@Body() loginUser:LoginUserDto){
        return this.auth.signin(loginUser);
    };

    @UseGuards(AuthGuard)
    @Get('profile')
    async getUserProfile(@Request() req){
        try{
            const userId = req.user['userId'];
            return await this.auth.getProfile(userId);
        }catch(err){
            console.log(err);
            throw new InternalServerErrorException(err);
        }
    }

}
