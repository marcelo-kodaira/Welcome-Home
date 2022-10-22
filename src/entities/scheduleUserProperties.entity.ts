import { Column,Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { User } from "./user.entity";
import { Properties } from "./properties.entity";

@Entity('schedule_users_properties')
class ScheduleUsersProperties{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'date'})
    date: string

    @Column({type: 'time'})
    hour: string

    @ManyToOne(() => Properties)
    property: Properties

    @ManyToOne(() =>User, {eager:true})
    user: User
}

export{ScheduleUsersProperties}