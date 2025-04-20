import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileManagerService } from '../file-manager.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Destination]),
    MulterModule.register({
      // dest: './public/uploads/destinations',
      // storage: diskStorage({
      //   destination: './public/uploads/destinations',
      //   filename: (req, file, cb) => {
      //     cb(null, new Date().getTime() + '-' + file.originalname);
      //   },
      // }),
      storage: memoryStorage(),
    }),
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService, FileManagerService],
})
export class DestinationsModule {}
