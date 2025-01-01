import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { ExpertProfile } from "./ExpertProfile"

@Entity()
export class FoodAdvice {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    expertId: string

    @Column()
    foodLocalId: string

    @Column()
    type: string // type puede ser "positive", "negative" y "warning"

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=>ExpertProfile, expertProfile => expertProfile.article, {onDelete: "CASCADE"})
    @JoinColumn({name: "expertId"})
    expertProfile: ExpertProfile
}