import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Article } from "../entity/Article"

export class ArticleController {

    private readonly articleRepository = AppDataSource.getRepository(Article)

    async all(req:Request, res: Response) {
        const { e } = req.query
        const withExpert = req.query.we === "true"
        const relations = []
        if (withExpert){
            relations.push("expertProfile", "expertProfile.user")
        }
        if (e !== undefined) {
            if (typeof e !== 'string'){
                res.status(400)
                return { message: 'Parámetro inválido.' }
            }
            const articles = await this.articleRepository.find({
                where: {expertId: e},
                relations: relations
            })
            return articles
        }
        return this.articleRepository.find({relations: relations})
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

        const article = await this.articleRepository.findOne({
            where: { id },
            relations: relations
        })

        if (!article) {
            response.status(404)
            return {message: "Error: Artículo no existe"}
        }
        return article
    }

    async create(request: Request, response: Response) {
        const { expertId, title, description, link } = request.body;
       
           
        const newArticle = Object.assign(new Article(), {
            expertId,
            title,
            description,
            link
        })

        const savedArticle = await this.articleRepository.save(newArticle)
        return this.articleRepository.findOne({where: {id:savedArticle.id}, relations: ["expertProfile", "expertProfile.user"]})
        
    }
    async update(req: Request, res:Response) {
        const {id} = req.params
        if (!id){
            res.status(400)
            return {message: "Error: id inválida"}
        }
        const { expertId, title, description, link } = req.body;
        const article = Object.assign(new Article(), {
            expertId,
            title,
            description,
            link
        })
        const updatedArticle = await this.articleRepository.update(id, article)
        if (updatedArticle.affected === 1){
            return this.articleRepository.findOne({
                where: {id: id},
                relations: [
                    "expertProfile",
                    "expertProfile.user"
                ]
            })
        }
        res.status(500)
        return {message: "Error al actualizar artículo"}

        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        if (!id){
            response.status(400)
            return {message: "Error: id inválida"}
        }

        let articleToRemove = await this.articleRepository.findOneBy({ id: id })
        
        if (!articleToRemove) {
            response.status(404)
            return {message: "Error: Diario no encontrado"}
        }
        return this.articleRepository.remove(articleToRemove)
    }
}