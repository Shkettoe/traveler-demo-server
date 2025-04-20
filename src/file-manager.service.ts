import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
@Injectable()
export class FileManagerService {
  private readonly s3: AWS.S3;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      region: this.configService.get('AWS_REGION'),
      // accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      // secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    if (!bucketName) {
      throw new Error('AWS_BUCKET_NAME is not set');
    }
    const upload = this.s3.upload({
      Bucket: bucketName,
      Key: `destinations/${new Date().getTime()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    });
    return upload.promise();
  }
}
