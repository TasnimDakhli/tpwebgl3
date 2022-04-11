import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { Skill } from "./skill.entity";
import { User } from "./user.entity";

@Entity('cv')
export class Cv {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  name: string;
  @Column({})
  firstname: string;
  @Column({})
  age: number;
  @Column({})
  cin: number;
  @Column({})
  job: string;
  @Column({})
  path: string;

  @ManyToOne(
    ()=>User, 
    (user) => user.cvs
)user:User;

@ManyToMany(() => Skill)
@JoinTable()
 skills:Skill[];

}
