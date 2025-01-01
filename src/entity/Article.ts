import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { ExpertProfile } from "./ExpertProfile"

@Entity()
export class Article {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    expertId: string

    @Column({unique: true})
    title: string

    @Column()
    description: string

    @Column()
    link: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=>ExpertProfile, expertProfile => expertProfile.article, {onDelete: "CASCADE"})
    @JoinColumn({name: "expertId"})
    expertProfile: ExpertProfile
}