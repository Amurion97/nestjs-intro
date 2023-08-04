import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("songs")
export class Song {
    @PrimaryGeneratedColumn()
    songId: number;
    @Column()
    title: string;
    @Column()
    url: string;
}
