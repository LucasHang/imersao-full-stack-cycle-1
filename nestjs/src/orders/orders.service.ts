import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmptyResultError } from 'sequelize';
import { AccountStorageService } from 'src/accounts/account-storage/account-storage.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order)
        private orderModel: typeof Order,
        private accountStorage: AccountStorageService,
    ) {}

    create(createOrderDto: CreateOrderDto) {
        return this.orderModel.create({
            ...createOrderDto,
            account_id: this.accountStorage.account.id,
        });
    }

    findAll() {
        return this.orderModel.findAll({
            where: {
                account_id: this.accountStorage.account.id,
            },
        });
    }

    findOne(id: string) {
        return this.orderModel.findOne({
            where: {
                id,
                account_id: this.accountStorage.account.id,
            },
            rejectOnEmpty: new EmptyResultError(`Account with ID ${id} not found`),
        });
    }

    update(id: string, updateOrderDto: UpdateOrderDto) {
        return `This action updates a #${id} order`;
    }

    remove(id: string) {
        return `This action removes a #${id} order`;
    }
}
