import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('addresses')
class Addresses{
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    district:string

    @Column()
    zipCode: string

    @Column({nullable:true})
    number: string

    @Column()
    city: string

    @Column()
    state: string
    
}

export {Addresses}