import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { FoodAdvice } from "../entity/FoodAdvice"
import axios from "axios"

export class FoodAdviceController {

    private foodAdviceRepository = AppDataSource.getRepository(FoodAdvice)

    async all(req:Request, res: Response) {
        const { e, f} = req.query
        const withExpert = req.query.we === "true"
        const relations = []
        if (withExpert){
            relations.push("expertProfile", "expertProfile.user")
        }
        if (e && f) {
            if (typeof e !== 'string' && typeof f !== 'string'){
                res.status(400)
                return { message: 'Parámetro inválido.' }
            }
            const foodAdvices = await this.foodAdviceRepository.find({
                where: {expertId: e, foodLocalId: f},
                relations: relations
            })
            return foodAdvices
        }

        else if (f !== undefined) {
            if (typeof f !== 'string'){
                res.status(400)
                return { message: 'Parámetro inválido.' }
            }
            console.log("should return food advices", f)
            const foodAdvices = await this.foodAdviceRepository.find({
                where: {foodLocalId: f},
                relations: relations
            })
            return foodAdvices
        }

        else if (e !== undefined) {
            if (typeof e !== 'string'){
                res.status(400)
                return { message: 'Parámetro inválido.' }
            }
            const foodAdvices = await this.foodAdviceRepository.find({
                where: {expertId: e},
                relations: relations
            })
            return foodAdvices
        }
        return this.foodAdviceRepository.find({relations: relations})
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id
        if (!id){
            response.status(400)
            return {message: "Error: id inválida"}
        }
        const withExpert = request.query.we === "true"
        const relations = []

        if (withExpert){
            relations.push("expertProfile", "expertProfile.user")
        }

        const foodAdvice = await this.foodAdviceRepository.findOne({
            where: { id },
            relations: relations
        })

        if (!foodAdvice) {
            response.status(404)
            return {message: "Error: Artículo no existe"}
        }
        return foodAdvice
    }

    async create(request: Request, response: Response) {
        const { expertId, foodLocalId, type, content } = request.body;
       
           
        const newFoodAdvice = Object.assign(new FoodAdvice(), {
            expertId,
            foodLocalId,
            type,
            content
        })

        const savedFoodAdvice = await this.foodAdviceRepository.save(newFoodAdvice)
        return this.foodAdviceRepository.findOne({where: {id:savedFoodAdvice.id}, relations: ["expertProfile", "expertProfile.user"]})
        
    }
    async update(req: Request, res:Response) {
        const {id} = req.params
        if (!id){
            res.status(400)
            return {message: "Error: id inválida"}
        }
        const { expertId, foodLocalId, type, content } = req.body;
        const foodAdvice = Object.assign(new FoodAdvice(), {
            expertId,
            foodLocalId,
            type,
            content
        })
        const updatedFoodAdvice = await this.foodAdviceRepository.update(id, foodAdvice)
        if (updatedFoodAdvice.affected === 1){
            return this.foodAdviceRepository.findOne({
                where: {id: id},
                relations: [
                    "expertProfile",
                    "expertProfile.user"
                ]
            })
        }
        res.status(500)
        return {message: "Error al actualizar recomendación"}

        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        if (!id){
            response.status(400)
            return {message: "Error: id inválida"}
        }

        let foodAdviceToRemove = await this.foodAdviceRepository.findOneBy({ id: id })
        
        if (!foodAdviceToRemove) {
            response.status(404)
            return {message: "Error: Recomendación no encontrada"}
        }
        return this.foodAdviceRepository.remove(foodAdviceToRemove)
    }
}