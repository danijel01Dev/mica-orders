import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private db: PrismaService){}
async create(dto : CreateOrderDto) {
    return await this.db.order.create({data : {
      name : dto.name,
      date : dto.date,
      number : dto.number,
      description : dto.description,
      status : OrderStatus.PENDING,
      price :  Number(dto.price),
      userId : Number(dto.userId)
    }})
  }

 async  findAll(month, year) {
  const start = new Date(year,month -1 , 1)
  const end = new Date(year, month, 1)
  console.log(month)
  console.log(year)
  return  await this.db.order.findMany({
  where: {
    date: {
      gte: start,
      lt: end,
    },
  },
});
  }

 async  findOne(id: number) {
    return  await  this.db.order.findUnique({ where : {id}})
  }

 async  update(id: number, dto: UpdateOrderDto) {
    return  await this.db.order.update({where  : {id},
      data : {
         name : dto.name,
      date : dto.date,
      number : dto.number,
      description : dto.description,
      status : OrderStatus.PENDING,
      price :  Number(dto.price),
      

      }
    })
                 
  }

  async remove(id: number) {
   return await this.db.order.delete({where : {id}})
  }
}
