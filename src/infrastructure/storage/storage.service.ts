import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class StorageService {

  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_S3_REGION'),
      endpoint: this.configService.get<string>('AWS_S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
      forcePathStyle: false,
    })
  }

  getS3Client(): S3Client {
    return this.s3;
  }

  async save(
    file: Express.Multer.File,
    folder: string
  ): Promise<string | undefined> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET');

    const uniqueKey = `${folder}/${Date.now()}_${file.originalname}`

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })

    try {
      await this.s3.send(command)
      return `https://${this.configService.get<string>('AWS_S3_ENDPOINT')}/${bucketName}/${uniqueKey}`
    } catch (error) {
      console.log(error);
    }
  }

}
