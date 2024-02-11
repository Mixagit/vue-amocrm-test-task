import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AmoCRMController } from './amocrm.controller'
import { AmoCRMService } from './amocrm.service'

@Module({
	imports: [HttpModule],
	controllers: [AmoCRMController],
	providers: [AmoCRMService],
})
export class AmoCRMModule {}
