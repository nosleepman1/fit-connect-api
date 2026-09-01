import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject, Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { StorageService } from "src/infrastructure/storage/storage.service";

export interface QueuePostImage {
    userId: string;
    postId: string;
    file: Express.Multer.File;
}

@Processor('upload-post-image')
export class ImageUploadProcessor extends WorkerHost {

    constructor(
        private readonly storageService: StorageService,
    ) { super() }

    async process(job: Job<QueuePostImage>): Promise<string | undefined> {

        const { userId, postId, file } = job.data;

        const rawBuffer = (file.buffer as any).data ?? file.buffer;
        const realBuffer = Buffer.isBuffer(file.buffer) ? file.buffer : Buffer.from(rawBuffer);

        const reconstructedFile: Express.Multer.File = {
            ...file,
            buffer: realBuffer
        }

        const s3Path = await this.storageService.save(reconstructedFile, 'posts');

        return s3Path;

    }

}