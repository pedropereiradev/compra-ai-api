import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { getListInvitationTemplate } from './templates/template-handler';
import type { SendInvitationEmailPayload } from './types';

class BrevoPort {
  private readonly APP_NAME = 'Compra.AI';
  private readonly NO_REPLY_EMAIL: string;

  private _api: AxiosInstance;
  private _apiKey: string;
  private _baseUrl: string;

  constructor() {
    this._apiKey = process.env.BREVO_API_KEY;
    this._baseUrl = process.env.BREVO_API_BASE_URL;
    this.NO_REPLY_EMAIL = process.env.BREVO_NO_REPLY_EMAIL;

    this._api = axios.create({
      baseURL: this._baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': this._apiKey,
      },
    });
  }

  async sendInvitationEmail(payload: SendInvitationEmailPayload) {
    try {
      console.log(payload);

      const htmlContent = await getListInvitationTemplate({
        recipientName: payload.name,
        appName: this.APP_NAME,
        invitedByName: payload.invitedBy,
      });

      const response = await this._api.post('/smtp/email', {
        sender: {
          name: 'App Compra.AI',
          email: this.NO_REPLY_EMAIL,
        },
        to: [
          {
            name: payload.name,
            email: payload.to,
          },
        ],
        subject:
          'Você foi convidado(a) para uma lista de compras compartilhada!',
        htmlContent,
      });

      console.log('>>>TRANSACTIONAL EMAIL', response.data);

      return response.data;
    } catch (error) {
      console.log('[ERROR ON SEND INVITATION EMAIL]: ', error);

      throw new Error('Failed to send invitation email');
    }
  }
}

export { BrevoPort };
