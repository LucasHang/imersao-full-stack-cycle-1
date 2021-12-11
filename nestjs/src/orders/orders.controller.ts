import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        const order = await this.findOne(id);
        return order.update(updateOrderDto);
    }

    @HttpCode(204)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const order = await this.findOne(id);
        order.destroy();
    }
}
