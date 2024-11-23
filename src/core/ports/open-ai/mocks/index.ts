// RESPOSTA USANDO O GPT-4O-MINI
export const completionUsingMini = {
  id: 'chatcmpl-AV10M7PoE4ziebQEBjcVfFEGXGLhT',
  object: 'chat.completion',
  created: 1731955394,
  model: 'gpt-4o-mini-2024-07-18',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content:
          '```json\n{\n  "produtos": [\n    {\n      "nome": "Papel sulfite Lettering A4 180g PT 50 UN",\n      "quantidade": 1,\n      "preco_total": 18.70,\n      "preco_por_unidade": 18.70,\n      "unidade_medida": "UN"\n    },\n    {\n      "nome": "Papel sulfite Braco A4 75g 210x297mm PT 100 FL",\n      "quantidade": 1,\n      "preco_total": 7.30,\n      "preco_por_unidade": 7.30,\n      "unidade_medida": "PT"\n    },\n    {\n      "nome": "Escalímetro triangular 30cm BT 1 UN",\n      "quantidade": 1,\n      "preco_total": 17.00,\n      "preco_por_unidade": 17.00,\n      "unidade_medida": "UN"\n    },\n    {\n      "nome": "Caneta esferográfica 0.8 mm Trikv AZ UV SMTR",\n      "quantidade": 1,\n      "preco_total": 17.00,\n      "preco_por_unidade": 17.00,\n      "unidade_medida": "BT"\n    },\n    {\n      "nome": "Lapisera 3.0 mm técnica lembrança P203E BT 1 UN",\n      "quantidade": 1,\n      "preco_total": 20.00,\n      "preco_por_unidade": 20.00,\n      "unidade_medida": "UN"\n    },\n    {\n      "nome": "Régua em poliestireno 30cm Cristal UN",\n      "quantidade": 1,\n      "preco_total": 3.30,\n      "preco_por_unidade": 3.30,\n      "unidade_medida": "UN"\n    }\n  ],\n  "preco_total_compra": 98.60,\n  "data_compra": "18/11/2024"\n}\n```',
        refusal: null,
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 25565,
    completion_tokens: 449,
    total_tokens: 26014,
    prompt_tokens_details: {
      cached_tokens: 0,
      audio_tokens: 0,
    },
    completion_tokens_details: {
      reasoning_tokens: 0,
      audio_tokens: 0,
      accepted_prediction_tokens: 0,
      rejected_prediction_tokens: 0,
    },
  },
  system_fingerprint: 'fp_9b78b61c52',
};

export const completionUsingGpt4o = {
  id: 'chatcmpl-AV1EHTwbnOHFtBsRNBECTfP6zMH5b',
  object: 'chat.completion',
  created: 1731956257,
  model: 'gpt-4o-2024-08-06',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content:
          '```json\n{\n  "produtos": [\n    {\n      "nome": "Papel sulfite Lettering A4 180g PT 50",\n      "quantidade": 1,\n      "preco_total": 18.70,\n      "preco_unidade": 18.70,\n      "unidade_medida": "PT"\n    },\n    {\n      "nome": "Papel Sulfite Branco A4 75g 210x297mm PT 100",\n      "quantidade": 1,\n      "preco_total": 7.30,\n      "preco_unidade": 7.30,\n      "unidade_medida": "PT"\n    },\n    {\n      "nome": "Escalímetro triangular 30cm",\n      "quantidade": 1,\n      "preco_total": 29.90,\n      "preco_unidade": 29.90,\n      "unidade_medida": "BT"\n    },\n    {\n      "nome": "Caneta esferográfica 0.3mm Trilux",\n      "quantidade": 1,\n      "preco_total": 1.70,\n      "preco_unidade": 1.70,\n      "unidade_medida": "BT"\n    },\n    {\n      "nome": "Lapiseira 0.3mm técnica Nan ZPGSE BT 1UN",\n      "quantidade": 1,\n      "preco_total": 20.00,\n      "preco_unidade": 20.00,\n      "unidade_medida": "BT"\n    },\n    {\n      "nome": "Grafite de 0.9mm Nan SP-BAS BT 2UN",\n      "quantidade": 1,\n      "preco_total": 3.90,\n      "preco_unidade": 3.90,\n      "unidade_medida": "BT"\n    },\n    {\n      "nome": "Régua em poliestireno 30cm de Cristal",\n      "quantidade": 1,\n      "preco_total": 3.30,\n      "preco_unidade": 3.30,\n      "unidade_medida": "CX"\n    }\n  ],\n  "preco_total_compra": 98.60,\n  "data_compra": "18/11/2024"\n}\n```',
        refusal: null,
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 829,
    completion_tokens: 498,
    total_tokens: 1327,
    prompt_tokens_details: {
      cached_tokens: 0,
      audio_tokens: 0,
    },
    completion_tokens_details: {
      reasoning_tokens: 0,
      audio_tokens: 0,
      accepted_prediction_tokens: 0,
      rejected_prediction_tokens: 0,
    },
  },
  system_fingerprint: 'fp_45cf54deae',
};
