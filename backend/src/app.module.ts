import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AmoCRMModule } from './amocrm/amocrm.module'

@Module({
	imports: [ConfigModule.forRoot({ envFilePath: '.env' }), AmoCRMModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
