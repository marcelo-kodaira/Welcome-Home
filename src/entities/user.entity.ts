import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Exclude} from "class-transformer"
@Entity('users')
class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 60})
    name: string

    @Column({length: 60})
    email: string

    @Column({length: 60})
    @Exclude()
    password: string

    @Column()
    isAdm: boolean

    @Column('boolean', {default: true})
    isActive: boolean 

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}   

export {User}