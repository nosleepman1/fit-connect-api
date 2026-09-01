import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { PostImageEvent } from "../events/post-image.event";
import { Queue } from "bullmq";
import { OnEvent } from "@nestjs/event-emitter";



@Injectable()
export class PostImageListerner {
    constructor(
        @InjectQueue('upload-post-image')
        private readonly imageQueue: Queue
    ) { }

    @OnEvent('post.image')
    async handle(event: PostImageEvent): Promise<void> {
        await this.imageQueue.add(
            'upload-post-image',
            event
        )
    }
}