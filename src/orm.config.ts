import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "1234",
  "database": "hrms",
  synchronize: false,
  logging: true,
  entities: ["dist/**/*.entity{.ts,.js}"]
} 
