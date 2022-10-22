import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { ScheduleUsersProperties } from "./scheduleUserProperties.entity";

@Entity("properties")
class Properties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses, { eager: true })
  @JoinColumn()
  address: Addresses;

  @ManyToOne(() => Categories, {eager: true})
  category: Categories;

  @OneToMany(() => ScheduleUsersProperties, schedule_users_properties => schedule_users_properties.property  )
  schedules: ScheduleUsersProperties[];


}

export { Properties };
