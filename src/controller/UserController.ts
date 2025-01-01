import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { ExpertProfile } from "../entity/ExpertProfile";
import "dotenv/config"

export class UserController {

    private readonly userRepository = AppDataSource.getRepository(User)
    private readonly expertProfileRepository = AppDataSource.getRepository(ExpertProfile)

    async create(req: any) {
        const createdUser = await this.userRepository.save(req)
        if (req.expertProfile){
            await this.expertProfileRepository.save(req.expertProfile)
        }
        return this.userRepository.findOne({where: {id: createdUser.id}, relations:["expertProfile"]})
    }
    async update(req: any) {
        const {id, storeProfile, expertProfile, userHasRole, lostPass, ...user } = req
        if (!id) {
            return "id inválida"
        }
       return this.userRepository.update(id, user)
    }
    async remove(id:string) {
        let userToRemove = await this.userRepository.findOne({where: {id: id}})
        if (userToRemove){
            return this.userRepository.remove(userToRemove)
        }
        else{
            return "el usuario no existe"
        }
        
    }

}