import {Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false, unique: true})
    username: string;

    @Column({nullable: false})
    senha: string;

    @UpdateDateColumn({ type: 'timestamp'})
    ultimoAcesso: Date

    @CreateDateColumn({ type: 'timestamp' })
    criadoEm: Date    
}
