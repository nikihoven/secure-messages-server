import {Body, Controller, Get, Param, Post} from '@nestjs/common'

import {CreateMessageDto} from './dto/createMessage.dto'
import {MessagesService} from './messages.service'

@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {
    }

    @Post('/create')
    createMessage(@Body() createMessageDto: CreateMessageDto) {
        return
    }

    @Get('/validate/:url')
    validateMessageUrl(@Param('url') url: string) {
        return
    }

    @Post('/decrypt/:url')
    getDecryptedMessage(@Param('url') url: string, @Body() data) {
        return
    }
}
