import { OpenAiPort } from '@src/core/ports/open-ai';
import { parseJsonString } from '@src/core/utils/json-parser';

interface UploadedFile extends Express.Multer.File {
  buffer: Buffer;
}

class ReceiptService {
  private _openAiPort: OpenAiPort;

  constructor() {
    this._openAiPort = new OpenAiPort();
  }

  async create(userId: number, files: UploadedFile[]) {
    const base64Images = files.map((file) => file.buffer.toString('base64'));
    const response = await this._openAiPort.analyzeReceipt(base64Images);

    const analysedReceipt = response.choices[0].message.content;

    return {
      userId,
      payload: parseJsonString(analysedReceipt),
    };
  }
}

export default ReceiptService;
