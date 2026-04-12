import { Exclude } from "class-transformer";
import { Role as RoleEntity } from "src/roles/entities/role.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column({ unique: true, nullable: false })
    email!: string;
    @Column({ nullable: false })
    @Exclude()
    password!: string;
    // @Column({ type: "enum", enum: Role, default: Role.USER })
    // role!: Role;
    @DeleteDateColumn()
    deletedAt!: Date;

    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: 'roleId' })
    role!: RoleEntity;

    @Column()
    roleId!: number;

}
