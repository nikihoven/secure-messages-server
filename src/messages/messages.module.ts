import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {MessagesController} from './messages.controller'
import {MessagesService} from './messages.service'
import {MessageEntity} from './entities/message.entity'

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])],
    controllers: [MessagesController],
    providers: [MessagesService]
})
export class MessagesModule {
}
