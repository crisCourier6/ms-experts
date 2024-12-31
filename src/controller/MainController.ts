import { NextFunction, Request, Response } from "express"
import { Channel } from "amqplib"
import { ArticleController } from "./ArticleController"
import { FoodAdviceController } from "./FoodAdviceController"
import axios from "axios"
import "dotenv/config"
import { ExpertProfileController } from "./ExpertProfileController"

export class MainController{

    private articleController = new ArticleController
    private foodAdviceController = new FoodAdviceController
    private expertProfileController = new ExpertProfileController
    // user rates expert

    // articleAll() retorna todos los diarios alimenticios
    async articleAll(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.articleController.all(req, res)  
    }

    // articleOne() retorna el diario alimenticio con la id indicada
    async articleOne(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.articleController.one(req, res, next)
    }
    // articleSave() crea un diario nuevo con los datos provenientes en la request y lo retorna
    async articleSave(req: Request, res: Response, next: NextFunction, channel: Channel) {
       return this.articleController.create(req, res)
    }

    // articleUpdate() modifica los datos de un diario y retorna el resultado
    async articleUpdate(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.articleController.update(req, res)
    }
    // articleRemove() elimina el diario con el id indicado en los parámetros de la uri
    async articleRemove(req: Request, res: Response, next: NextFunction, channel: Channel){
        return this.articleController.remove(req, res, next)
    }

    // food advice

    // foodAdviceAll() retorna todos los diarios alimenticios
    async foodAdviceAll(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.foodAdviceController.all(req, res)  
    }

    // foodAdviceOne() retorna el diario alimenticio con la id indicada
    async foodAdviceOne(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.foodAdviceController.one(req, res, next)
    }
    // foodAdviceSave() crea un diario nuevo con los datos provenientes en la request y lo retorna
    async foodAdviceSave(req: Request, res: Response, next: NextFunction, channel: Channel) {
       return this.foodAdviceController.create(req, res)
    }

    // foodAdviceUpdate() modifica los datos de un diario y retorna el resultado
    async foodAdviceUpdate(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.foodAdviceController.update(req, res)
    }
    // foodAdviceRemove() elimina el diario con el id indicado en los parámetros de la uri
    async foodAdviceRemove(req: Request, res: Response, next: NextFunction, channel: Channel){
        return this.foodAdviceController.remove(req, res, next)
    }

    async expertsAll(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.expertProfileController.all(req, res)
    }

    async expertsOne(req: Request, res: Response, next: NextFunction, channel: Channel){
        return this.expertProfileController.one(req.params.id, res)
    }

    async expertsOneByUserId(req: Request, res: Response, next: NextFunction, channel: Channel){
        return this.expertProfileController.oneByUserId(req.params.id, res)
    }
}