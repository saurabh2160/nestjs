import { Inject, Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { MongoClient,ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class UserService {
    private userCollection;
    constructor(@Inject('MONGO_CLIENT') private readonly client: MongoClient) {
        this.userCollection = this.client.db('tasksDB').collection('user_collection');
    }
    async createUser(user) {
        try {
            const userExists = await this.userCollection.findOne({ email: user['email'] });
            if (userExists) {
                throw new ConflictException('User already exists');
            }
            const hashPswrd = await bcrypt.hash(user['password'],10);
            user['userId'] = uuidv7();
            user['password'] = hashPswrd;
            user['createdAt'] = new Date();
            user['isDeleted'] = false;
            user['role'] = user['role'] || 'creator';
            const result = await this.userCollection.insertOne(user);
            if(!result.acknowledged){
                throw new InternalServerErrorException('Server Failure');
            }
            return { statusCode:201, message: "User created", userId: user['_id'].toHexString(), role: user['role']};
        } catch (err) {
            console.log(err);
            throw err;
        }

    }
    async signin(user) {
        try {
            const {email,password} = user;
            const userExists = await this.userCollection.findOne({ email });
            if (!userExists) {
                throw new ConflictException('User does not exist');
            }
            const isMatch = await bcrypt.compare(
                password,
                userExists['password'],
            );
            if (!isMatch) {
                throw new UnauthorizedException('Invalid credentials');
            }
            return { statusCode:200, message: "User logged in", userId: userExists['_id'].toHexString(), role: userExists['role']};
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    async getProfile(id: string) {
        try {
            const result = await this.userCollection.findOne({ _id: new ObjectId(id) , isDeleted: false});
            if (!result) {
                throw new ConflictException('User does not exist');
            }
            delete result['password'];
            delete result['_id'];
            return {statusCode:200, message: "User profile", userData: result };
        }catch(err){
            console.log(err);
        }
    }
    async updateUser(id: string, user: object) {
        try {

            const result = this.userCollection.updateOne({ _id: id }, { $set: user });
            console.log(result);
            if(!result.acknowled){
                throw new InternalServerErrorException('Server Failure');
            }
            return { statusCode:200, message: "User updated" };
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
