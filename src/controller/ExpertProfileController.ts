import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User";
import { ExpertProfile } from "../entity/ExpertProfile";
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import "dotenv/config"
import axios from "axios"

export class ExpertProfileController {

    private expertProfileRepository = AppDataSource.getRepository(ExpertProfile)

    async create(req: any) {
        const createdExpertProfile = await this.expertProfileRepository.save(req)
        return this.expertProfileRepository.findOne({where: {id: createdExpertProfile.id}, relations:["user"]})
    }
    async update(req: any) {
        const {id, user, ...expertProfile} = req
        if (!id) {
            return "id inválida"
        }
       return this.expertProfileRepository.update(id, expertProfile)
    }
    async remove(id:string) {
        let expertProfileToRemove = await this.expertProfileRepository.findOne({where: {id: id}})
        if (expertProfileToRemove){
            return this.expertProfileRepository.remove(expertProfileToRemove)
        }
        else{
            return "el perfil de tienda no existe"
        }
        
    }
    async all() {
        return this.expertProfileRepository.find({ relations: ["user", "article"] })
    }
    // one(id: string)
    // entradas: id: uuid del experto que se quiere encontrar
    // salidas: ExpertProfile
    // recibe la uuid del experto y retorna la fila que la contiene. Si la uuid no existe, retorna un mensaje de error
    async one(id: string, res: Response) {
  
        const expertProfile = await this.expertProfileRepository.findOne({
            where: { id: id },
            relations: ["user", "article"] 
        })

        if (!expertProfile) {
            res.status(404)
            return {message: "Error: Experto no encontrado"}
        }
        return expertProfile
    }
    // oneByUserId(id: string)
    // entradas: id: id de User del experto que se quiere encontrar
    // salidas: ExpertProfile
    // recibe la uuid de User del experto y retorna la fila que la contiene. Si la uuid no existe, retorna un mensaje de error
    async oneByUserId(id: string, res: Response) {
        if (!id){
            res.status(400)
            return {message: "Error: id inválida"}
        }
        const expertProfile = await this.expertProfileRepository.findOne({
            where: { userId: id },
            relations: ["user", "article"]
        })

        if (!expertProfile) {
            res.status(404)
            return {message:"Error: Experto no encontrado"}
        }
        return expertProfile
    }

}