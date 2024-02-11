import { Body, Controller, Post } from '@nestjs/common'
import { AmoCRMService } from './amocrm.service'

@Controller('amocrm')
export class AmoCRMController {
	constructor(private readonly amocrmService: AmoCRMService) {}

	@Post('leads')
	async createLead(@Body() data: any[]): Promise<any> {
		try {
			const lead = await this.amocrmService.createLead(data)
			return { success: true, data: lead }
		} catch (error) {
			return { success: false, error: error.message }
		}
	}

	@Post('contacts')
	async createContact(@Body() data: any[]): Promise<any> {
		try {
			const contact = await this.amocrmService.createContact(data)
			return { success: true, data: contact }
		} catch (error) {
			return { success: false, error: error.message }
		}
	}

	@Post('companies')
	async createCompany(@Body() data: any[]): Promise<any> {
		try {
			const company = await this.amocrmService.createCompany(data)
			return { success: true, data: company }
		} catch (error) {
			return { success: false, error: error.message }
		}
	}
}
