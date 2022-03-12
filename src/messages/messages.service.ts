import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {validate} from 'uuid'

import {MessageEntity} from './entities/message.entity'
import {CreateMessageDto} from './dto/createMessage.dto'

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
    ) {
    }

    async createMessage(createMessage: CreateMessageDto): Promise<string | HttpException> {
        const {message, passphrase, duration} = createMessage

        if (!message || !passphrase || !duration) {
            throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST)
        }

        let expirationDate: Date = new Date()
        const creationDate: Date = new Date(expirationDate)
        expirationDate = new Date(expirationDate.setMinutes(expirationDate.getMinutes() + duration))

        const data = await this.messageRepository.save({message, passphrase, creationDate, expirationDate})
        return data.url
    }

    async validMessageUrl(url: string): Promise<boolean | HttpException> {
        const vld = validate(url)

        if (!vld) {
            throw new HttpException('Incorrect url', HttpStatus.BAD_REQUEST)
        }


        const data = await this.messageRepository.findOne({url})
        if (!data) {
            throw new HttpException('Message didn\'t found', HttpStatus.NOT_FOUND)
        }

        if (data.expirationDate < new Date()) {
            await this.messageRepository.delete({...data})
            throw new HttpException('Message has been expired', HttpStatus.BAD_REQUEST)
        }


        return true

    }

    async decryptMessage(decryptMessage): Promise<string | HttpException> {
        const {passphrase, url} = decryptMessage
        console.log(passphrase.passphrase, url)

        const data = await this.messageRepository.findOne({url})

        if (!data) {
            throw new HttpException('Message didn\'t found', HttpStatus.NOT_FOUND)
        }

        if (data.expirationDate < new Date()) {
            await this.messageRepository.delete({...data})
            throw new HttpException('Message has been expired', HttpStatus.BAD_REQUEST)
        }

        if (data.passphrase !== passphrase) {
            throw new HttpException('Invalid key phrase', HttpStatus.BAD_REQUEST)
        }

        return data.message
    }
}
