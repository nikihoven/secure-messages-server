import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {MessagesModule} from './messages/messages.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            username: 'postgres',
            password: 'kY7v98NSq3pz',
            database: 'messages',
            host: 'localhost',
            port: 5432,
            entities: [__dirname + 'dist/**/*.entity.{.ts}'],
            synchronize: true,
            autoLoadEntities: true,
            logging: true
        }),
        MessagesModule
    ]
})
export class AppModule {
}
