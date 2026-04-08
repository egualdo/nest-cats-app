import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(
            {
                // type: process.env.TYPE as any,
                // host: process.env.DATABASE_HOST,
                // port: process.env.DATABASE_PORT,
                // username: process.env.DATABASE_USER,
                // password: process.env.DATABASE_PASSWORD,
                // database: process.env.DATABASE_NAME,
                type: "postgres",
                host: process.env.POSTGRES_HOST,
                port: process.env.POSTGRES_PORT,
                username: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                autoLoadEntities: true,
                synchronize: true,
                ssl: process.env.POSTGRES_SSL === "true",
                extra: {
                    ssl:
                        process.env.POSTGRES_SSL === "true"
                            ? {
                                rejectUnauthorized: false,
                            }
                            : null,
                },
            }
        ),
        CatsModule, BreedsModule, UsersModule, RolesModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
