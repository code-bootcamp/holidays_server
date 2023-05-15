import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesResolver } from './classes.resolver';
import { ClassesService } from './classes.service';
import { Class } from './entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Class, //
    ]),
  ],

  providers: [
    ClassesResolver, //
    ClassesService,
  ],

  //   exports: [
  //     BoardsService, //
  //   ],
})
export class ClassesModule {}
