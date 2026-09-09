import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout } from '../firebase';
import { createSpreadsheet, appendRow, extractSpreadsheetId } from '../sheetsApi';
import { InformativoData } from '../types';
import { LogOut, Save, FileSpreadsheet, Loader2 } from 'lucide-react';

interface Props {
  data: InformativoData;
}

export function GoogleSheetsIntegration({ data }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [spreadsheetLink, setSpreadsheetLink] = useState(localStorage.getItem('informativo_sheet_id') || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setUser(user);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setNeedsAuth(true);
  };

  const handleCreateSheet = async () => {
    setIsCreating(true);
    try {
      const id = await createSpreadsheet('Histórico de Informativos');
      setSpreadsheetLink(id);
      localStorage.setItem('informativo_sheet_id', id);
      alert('Planilha criada com sucesso! O ID foi salvo.');
    } catch (error) {
      console.error('Error creating spreadsheet:', error);
      alert('Erro ao criar planilha.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSpreadsheetLink(val);
    const id = extractSpreadsheetId(val);
    if (id) {
      localStorage.setItem('informativo_sheet_id', id);
    }
  };

  const handleSaveData = async () => {
    const id = extractSpreadsheetId(spreadsheetLink);
    if (!id) {
      alert('Por favor, insira um link ou ID de planilha válido, ou crie uma nova.');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const now = new Date().toLocaleString('pt-BR');
      
      await appendRow(id, [
        now,
        data.frente,
        data.setor,
        data.operacao,
        data.equipamentos.join(', '),
        data.caminhao.join(', '),
        data.areaVivencia,
        data.areaTotal,
        data.areaRealizado,
        data.areaARealizar,
        data.recomendacao,
        data.sequencias,
        data.turnoA,
        data.obsTurnoA,
        data.turnoB,
        data.obsTurnoB,
        data.turnoC,
        data.obsTurnoC
      ]);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (needsAuth) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-100">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            Integração com Google Sheets
          </h2>
          <p className="text-sm text-gray-600">Faça login para salvar seus informativos em uma planilha na nuvem.</p>
        </div>
        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="gsi-material-button bg-white border border-[#dadce0] rounded text-[#3c4043] cursor-pointer hover:bg-[#f8f9fa] flex items-center px-4 py-2 font-medium text-[14px] disabled:opacity-50 h-10 transition-colors"
        >
          <div className="mr-3 flex items-center">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18" height="18">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          {isLoggingIn ? 'Entrando...' : 'Entrar com o Google'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-green-200 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            Integração com Planilhas
          </h2>
          <p className="text-sm text-gray-600">Conectado como <span className="font-semibold">{user?.email}</span></p>
        </div>
        <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input 
          type="text" 
          placeholder="Cole o link ou ID da sua Planilha do Google aqui" 
          value={spreadsheetLink}
          onChange={handleLinkChange}
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-green-500 text-sm"
        />
        <button 
          onClick={handleCreateSheet} 
          disabled={isCreating}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm font-medium transition disabled:opacity-50 whitespace-nowrap"
        >
          {isCreating ? <Loader2 className="w-4 h-4 animate-spin inline mr-1" /> : null}
          {isCreating ? 'Criando...' : 'Ou Crie uma Nova'}
        </button>
      </div>
      
      {spreadsheetLink && (
        <div className="pt-2">
          <button 
            onClick={handleSaveData} 
            disabled={isSaving}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 text-white font-bold py-2 px-6 rounded-lg shadow transition disabled:opacity-50 ${
              saveStatus === 'success' ? 'bg-green-600 hover:bg-green-700' : 
              saveStatus === 'error' ? 'bg-red-600 hover:bg-red-700' : 
              'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saveStatus === 'success' ? 'Salvo com sucesso!' : 
             saveStatus === 'error' ? 'Erro ao salvar. Tente novamente.' : 
             'Salvar Dados na Planilha'}
          </button>
        </div>
      )}
    </div>
  );
}
