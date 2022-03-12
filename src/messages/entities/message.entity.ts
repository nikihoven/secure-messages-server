import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('messages')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    message: string

    @Column({nullable: false})
    passphrase: string

    @Column({nullable: false})
    creationDate: Date

    @Column({nullable: false})
    expirationDate: Date

    @PrimaryGeneratedColumn('uuid')
    url: string
}