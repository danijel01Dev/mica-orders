import { OrderStatus } from "@prisma/client";

export class CreateOrderDto {
    name : string
    date : Date;
    number : string;
    description : string;
    price : number ;
    status : OrderStatus
    userId : number;
}
