import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Role {
    @Column({ primary: true, generated: true })
    id!: number;
    @Column({ unique: true })
    name!: string;
    @OneToMany(() => User, (user) => user.role)
    users!: User[];
    @DeleteDateColumn()
    deletedAt!: Date;

}
