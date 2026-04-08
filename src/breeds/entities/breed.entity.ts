import { Cat } from "src/cats/entities/cat.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

//estas simulan las migraciones en laravel
@Entity()
export class Breed {
    @Column({ primary: true, generated: true })
    id!: number;
    @Column({ unique: true })
    name!: string;
    @OneToMany(() => Cat, (cat) => cat.breed)
    cats!: Cat[];
    @DeleteDateColumn()
    deletedAt!: Date;

}
