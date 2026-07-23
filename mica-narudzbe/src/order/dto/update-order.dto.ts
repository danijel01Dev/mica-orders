import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { $Enums } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    name?: string | undefined;
    date?: Date | undefined;
    number?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    status?: $Enums.OrderStatus | undefined;

}
