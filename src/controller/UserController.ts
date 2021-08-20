import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
const bcrypt = require ('bcrypt');

export class UserController {

    private userRepository = getRepository(User);

    private async updateLastAccess(userToUpdate: User){

        try {

            if(userToUpdate.name.length !== 0 && userToUpdate.name !== undefined){
                const now = new Date();
                const nowISO = now.toISOString();
                return await this.userRepository.update(userToUpdate, {ultimoAcesso: nowISO});
            }

            return {success: false};
        } catch (error) {
            console.error(error);
            return {success: false};
        }
        
    }

    private validateFields(fields: Request){

        const keys = Object.entries(fields.body) ;
        const isValid = keys.find(value => {
            return value[1] === '';
        })

        return isValid === undefined ? true : false;

    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        
        try {

            const users = await this.userRepository.find();
            if(users.length !== 0 && users !== undefined){
                return users;
            }

            return {success: false};
        } catch (error) {
            console.error(error);
            return {success: false};
        }
    }

    async getOne(request: Request, response: Response, next: NextFunction) {

        try {

            const user = await this.userRepository.findOne(request.params.id);
            if(user.name.length !== 0 && user.name !== undefined){
                await this.updateLastAccess(user);
                return user;
            }

            return {success: false};
        } catch (error) {
            console.error(error);
            return {success: false};
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        
        try {
            const {name, username, senha} = request.body;

            const isEqualZero = [name, username, senha].find((value) => {
                return value.length === 0;
            });

            const response = isEqualZero === 0 ? {success: false, message: "Please fill all fields."} : true;


            if(response === true){

                const userExist = await this.userRepository.findOne({username: request.body.username});

                if(userExist){
                    return {success: false, message: "Esse nome de usuario ja existe, tente outro."};
                }

                await bcrypt.hash(senha, 10, async (error, hash) => {
                    if(error){
                        console.log(error);
                        return error;
                    }
                    const userCreated = await this.userRepository.save({
                        name: name,
                        username: username,
                        senha: hash
                    });
                    await this.updateLastAccess(userCreated);
                })
                return {success: true};
            }
            return response;
        } catch (error) {
            console.error(error);
            return {success: false};
        }
    }

    

    async update(request: Request, response: Response, next: NextFunction) {

        const isValid = this.validateFields(request);

        if(isValid){
            try {

                const userToUpdate = await this.userRepository.findOne(request.params.id);
                if(userToUpdate.name.length !== 0 && userToUpdate.name !== undefined){
                    await this.userRepository.update(userToUpdate, request.body);
                    await this.updateLastAccess(userToUpdate);
                    return {success: true};
                }
            
                return {success: false};
            } catch (error) {
                console.error(error);
                return {success: false};
            }
        }
        return {success: false, message: "Please fill all fields."};
    }

    async delete(request: Request, response: Response, next: NextFunction) {

            try {

                const userToRemove = await this.userRepository.findOne(request.params.id);
                if(userToRemove.name.length !== 0 && userToRemove.name !== undefined){
                    await this.userRepository.remove(userToRemove);
                    return {success: true};
                }

                return {success: false};
            } catch (error) {
                console.error(error);
                return {success: false};
            }
        }
}