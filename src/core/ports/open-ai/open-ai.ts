import OpenAI from 'openai';
import { completionUsingGpt4o } from './mocks';

class OpenAiPort {
  private _openAi: OpenAI;

  constructor() {
    this._openAi = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async test() {
    const completion = await this._openAi.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'write a haiku about ai' }],
    });

    return completion;
  }

  async mockedAnalyzeReceipt(receipts: string[]) {
    // const completion = completionUsingMini
    console.log(receipts.length);
    const completion = completionUsingGpt4o;

    return completion;
  }

  async analyzeReceipt(receipts: string[]) {
    const completion = await this._openAi.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text:
                'Você é um assistente que processa notas fiscais. ' +
                'Extraia as seguintes informações: ' +
                'nome do produto, quantidade, preço total do produto, ' +
                'preço por unidade, unidade de medida, ' +
                'preço total da compra, data da compra. ' +
                'Formate a saída como um JSON.',
            },
          ],
        },
        {
          role: 'user',
          content: receipts.map((receipt) => ({
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${receipt}` },
          })),
        },
      ],
    });

    return completion;
  }
}

export { OpenAiPort };
