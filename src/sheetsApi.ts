import { getAccessToken } from './firebase';
import { InformativoData } from './types';

export async function createSpreadsheet(title: string): Promise<string> {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'Histórico',
          },
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create spreadsheet');
  }

  const data = await res.json();
  const spreadsheetId = data.spreadsheetId;

  // Add headers
  await appendRow(spreadsheetId, [
    'Data/Hora',
    'Frente',
    'Setor',
    'Operação',
    'Equipamentos',
    'Caminhões',
    'Área Vivência',
    'Área Total',
    'Área Realizado',
    'Área A Realizar',
    'Recomendação',
    'Sequências',
    'Turno A',
    'Obs Turno A',
    'Turno B',
    'Obs Turno B',
    'Turno C',
    'Obs Turno C',
    'Data da Atividade'
  ]);

  return spreadsheetId;
}

export async function appendRow(spreadsheetId: string, values: any[]) {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Histórico!A1:Z1:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [values],
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to append row');
  }

  return await res.json();
}

export function extractSpreadsheetId(input: string): string | null {
  if (!input) return null;
  // If it's a full URL, extract the ID
  const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  // Otherwise, assume it might just be the ID
  if (/^[a-zA-Z0-9-_]{20,}$/.test(input)) {
    return input;
  }
  return null;
}
