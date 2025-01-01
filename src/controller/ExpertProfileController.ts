import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { ExpertProfile } from "../entity/ExpertProfile";
import "dotenv/config"

export class ExpertProfileController {

    private readonly expertProfileRepository = AppDataSource.getRepository(ExpertProfile)

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
    async all(req: Request, res: Response) {
        const withUser = req.query.wu === "true"
        const onlyActive = req.query.onlyActive === "true"
        const withArticles = req.query.wa === "true"
        const relations = []
        if (withUser){
            relations.push("user")
        }

        if (withArticles){
            relations.push("article")
        }
        // Apply filter if onlyActive is true
        if (onlyActive) {
            const queryBuilder = this.expertProfileRepository.createQueryBuilder("expert")
                .leftJoinAndSelect("expert.user", "user")
                .where("user.isActive = :isActive", { isActive: true });
            if (withArticles) {
                queryBuilder.leftJoinAndSelect("expert.article", "article");
            }
            return queryBuilder.getMany();
        }
        else{
            return this.expertProfileRepository.find({relations: relations})
        }
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