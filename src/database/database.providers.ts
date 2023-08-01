import { DataSource } from 'typeorm';
import {SnakeNamingStrategy} from "typeorm-naming-strategies";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "mysql",
                host: process.env.MYSQLHOST || "localhost",
                port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 3306,
                username: process.env.MYSQLUSER || "root",
                password: process.env.MYSQLPASSWORD || "123456",
                database: process.env.MYSQLDATABASE || "nestjs-intro",
                synchronize: true,
                logging: false,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                migrations: [],
                subscribers: [],
                namingStrategy: new SnakeNamingStrategy(),

            });

            return dataSource.initialize();
        },
    },
];