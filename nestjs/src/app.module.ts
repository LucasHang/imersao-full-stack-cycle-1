import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        OrdersModule,
        SequelizeModule.forRoot({
            dialect: 'sqlite',
            host: join(__dirname, 'database.sqlite'),
            autoLoadModels: true,
            models: [Order],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
