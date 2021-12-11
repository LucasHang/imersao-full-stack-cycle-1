import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order)
        private orderModel: typeof Order,
    ) {}

    create(createOrderDto: CreateOrderDto) {
        return this.orderModel.create(createOrderDto);
    }

    findAll() {
        return this.orderModel.findAll();
    }

    findOne(id: string) {
        return this.orderModel.findByPk(id);
    }

    update(id: string, updateOrderDto: UpdateOrderDto) {
        return `This action updates a #${id} order`;
    }

    remove(id: string) {
        return `This action removes a #${id} order`;
    }
}
