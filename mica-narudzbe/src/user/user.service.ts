import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {
  constructor(private  db: PrismaService){}
  async create( dto : CreateUserDto) {
   return await this.db.user.create({
    
      data : {
        name : dto.name,
        email :  dto.email,
        password : dto.password
      }
      
    }
   )
  }


}
