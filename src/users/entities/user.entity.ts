import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    userId: number;
    @Column({type: "varchar", length: 255, unique: true})
    username: string;
    @Column({type: "varchar", length: 255, unique: true})
    email: string;
    @Column({type: "varchar", length: 255})
    password: string;

    @Column({type: "varchar", length: 255, nullable: true})
    name: string;
    @Column({type: "varchar", length: 20, nullable: true})
    phoneNumber: string;
    @Column({type: "varchar", length: 255, nullable: true})
    address: string;

    @Column({
        default: 0
    })
    isDeleted: boolean;

}
