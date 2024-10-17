import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "./User"
import { Article } from "./Article"
import { FoodAdvice } from "./FoodAdvice"

@Entity()
export class ExpertProfile {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable: true})
    address: string

    @Column()
    description: string

    @Column({nullable: true})
    phone: string

    @Column({nullable: true})
    webPage: string

    @Column()
    specialty: string

    @Column()
    isCoach: boolean

    @Column()
    isNutritionist: boolean

    @Column({nullable: true})
    userId: string

    @OneToOne(()=> User, user=> user.expertProfile, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId"})
    user: User

    @OneToMany(()=> Article, article=> article.expertProfile)
    article: Article[]

    @OneToMany(()=> FoodAdvice, foodAdvice=> foodAdvice.expertProfile)
    foodAdvice: FoodAdvice[]
}
