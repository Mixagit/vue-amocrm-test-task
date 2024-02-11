import { HttpService } from '@nestjs/axios'
import { Injectable, NotFoundException } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class AmoCRMService {
	private readonly apiUrl = 'https://test.gnzs.ru/oauth/get-token.php'
	private readonly clientId = process.env.X_CLIENT_ID
	private baseDomain: string
	private accessToken: string

	constructor(private readonly httpService: HttpService) {}

	private async getAccessToken(): Promise<void> {
		try {
			const response: AxiosResponse<any> = await firstValueFrom(
				this.httpService.get(
					this.apiUrl,

					{
						headers: {
							'Content-Type': 'application/json',
							'X-Client-Id': this.clientId,
						},
					}
				)
			)

			if (response.status === 200 && response.data.access_token) {
				this.accessToken = response.data.access_token
				this.baseDomain = response.data.base_domain
			} else {
				throw new NotFoundException('Ошибка при получении токена от amoCRM')
			}
		} catch (error) {
			console.error('Ошибка при получении токена от amoCRM:', error.message)
			throw error
		}
	}

	private createHeaders(): { [key: string]: string } {
		if (!this.accessToken) {
			throw new NotFoundException('Токен amoCRM не получен')
		}

		return {
			Authorization: `Bearer ${this.accessToken}`,
			'Content-Type': 'application/json',
		}
	}

	private async createEntity(entityType: string, data: any[]): Promise<any> {
		try {
			if (!this.accessToken || !this.baseDomain) {
				// Если токен или домен не получены, выполняем запрос на получение токена
				await this.getAccessToken()
			}

			const response: AxiosResponse<any> = await firstValueFrom(
				this.httpService.post(
					`https://${this.baseDomain}/api/v4/${entityType}`,
					data,
					{
						headers: this.createHeaders(),
					}
				)
			)

			if (response.status >= 200 && response.status < 300) {
				return response.data._embedded[entityType][0].id
			} else {
				throw new NotFoundException(
					`Ошибка при создании ${entityType} в amoCRM`
				)
			}
		} catch (error) {
			console.error(
				`Ошибка при выполнении запроса к amoCRM для ${entityType}:`,
				error.message
			)
			throw error
		}
	}

	createLead(data: any[]): Promise<any> {
		return this.createEntity('leads', data)
	}

	createContact(data: any[]): Promise<any> {
		return this.createEntity('contacts', data)
	}

	createCompany(data: any[]): Promise<any> {
		return this.createEntity('companies', data)
	}
}
