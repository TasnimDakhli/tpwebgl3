import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { Cv } from "./cv.entity";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  username: string;
  @Column({})
  email: string;
  @Column({})
  password: string;
 
  @OneToMany(() => Cv, (cv) => cv.user,{ cascade: ['insert'] })
  cvs: Cv[];

}