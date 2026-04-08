declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_NAME: string;
        DATABASE_USER: string;
        DATABASE_PASSWORD: string;

        POSTGRES_HOST: string;
        POSTGRES_PORT: number;
        POSTGRES_NAME: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_SSL: string;
        SECRET_KEY: string;
        HASH_SALT_OR_ROUNDS: number;
        TYPE: string;
    }
    //esto se hace para poder accesar a las variables de entorno sin que typescript se queje de que no existen
}