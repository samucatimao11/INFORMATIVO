/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import html2canvas from 'html2canvas';
import { Camera } from 'lucide-react';
import { InformativoForm } from './components/InformativoForm';
import { InformativoPreview } from './components/InformativoPreview';
import { PWAInstallButton } from './components/PWAInstallButton';
import { InformativoData } from './types';

const defaultData: InformativoData = {
  frente: 'AUTOPROPELIDOS',
  setor: '3284',
  operacao: '745',
  equipamentos: '4100874\n4100907\n4100783\n4100602\n4100667',
  caminhao: '4100615',
  areaVivencia: '4400338',
  areaTotal: 230.00,
  areaRealizado: 30.00,
  areaARealizar: 200.00,
  recomendacao: 'ALION – 0,120\nMEGA BR – 4,50\nSINERGE – 3,00\nJUMP – 3,50',
  sequencias: '3200 – OP 327\n3103 – OP 327\n3215 – OP 327',
  turnoA: 50.00,
  obsTurnoA: 'Ex: Choveu na madrugada',
  turnoB: 20.00,
  obsTurnoB: '',
  turnoC: 40.00,
  obsTurnoC: '',
};

export default function App() {
  const [data, setData] = useState<InformativoData>(defaultData);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadImage = async () => {
    const element = document.getElementById('informativo-card');
    if (!element) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Double resolution for better quality
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `Informativo_${data.frente}_${data.setor}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Erro ao gerar a imagem. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerador de Informativo Diário</h1>
            <p className="text-gray-600 mt-2">Preencha os dados abaixo e baixe a imagem para enviar no WhatsApp.</p>
          </div>
          <div className="flex-shrink-0">
            <PWAInstallButton />
          </div>
        </header>

        {/* Edit Section */}
        <section>
          <InformativoForm data={data} onChange={setData} />
        </section>

        {/* Preview Section */}
        <section className="mt-12 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold text-gray-800">Visualização</h2>
             
             <button 
                onClick={handleDownloadImage}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-[#6bb52e] hover:bg-[#5a9c24] text-white font-bold py-2 px-4 rounded-lg shadow transition disabled:opacity-50"
              >
                <Camera className="w-5 h-5" />
                {isGenerating ? 'Gerando...' : 'Baixar Imagem'}
             </button>
          </div>
          
          <div className="w-full overflow-x-auto bg-gray-200 rounded-xl p-4 md:p-8 flex justify-center shadow-inner">
            <InformativoPreview data={data} />
          </div>
        </section>
        
      </div>
    </div>
  );
}
