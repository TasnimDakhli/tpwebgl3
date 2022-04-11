import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { Cv } from "./cv.entity";

@Entity('cv')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  description: string;


  

}