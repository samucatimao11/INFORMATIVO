import React from 'react';
import { InformativoData } from '../types';
import { Send, Pin, Target, Check } from 'lucide-react';

interface PreviewProps {
  data: InformativoData;
}

const parseList = (text: string) => text.split('\n').filter(line => line.trim() !== '');

export function InformativoPreview({ data }: PreviewProps) {
  const total = data.turnoA + data.turnoB + data.turnoC;
  
  // Find max value to scale chart bars relative to the container height
  const maxVal = Math.max(data.turnoA, data.turnoB, data.turnoC, total) || 1; 

  const formatNumber = (num: number) => num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-[900px] bg-white p-8 shrink-0 relative overflow-hidden flex gap-6" id="informativo-card">
      {/* Left Area (Header + Text Columns) */}
      <div className="flex-[2.1] flex flex-col">
        {/* Top Header Section */}
        <div className="flex items-center gap-3 mb-2">
          <Send className="w-8 h-8 text-[#6bb52e] fill-current -rotate-45 transform translate-y-[-4px]" />
          <h1 className="text-3xl font-extrabold text-[#002f5d] tracking-wide">
            FRENTE: <span className="text-[#6bb52e] uppercase">{data.frente}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 pb-2 border-b-[3px] border-[#002f5d] relative">
          <Pin className="w-6 h-6 text-[#6bb52e] fill-current" />
          <h2 className="text-xl font-bold text-[#002f5d]">
            SETOR: <span className="text-[#6bb52e]">{data.setor}</span> &nbsp;&nbsp;&nbsp;
            OPERAÇÃO: <span className="text-[#6bb52e]">{data.operacao}</span>
          </h2>
        </div>

        {/* Text Columns */}
        <div className="flex items-stretch gap-6 pt-6 pb-2 min-h-[320px]">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6 pr-6 border-r-[3px] border-[#002f5d]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-5 h-5 text-[#002f5d]" />
                <h3 className="text-lg font-bold text-[#002f5d]">EQUIPAMENTOS</h3>
              </div>
              <div className="text-[#6bb52e] font-bold text-lg leading-tight flex flex-col pl-7">
                {parseList(data.equipamentos).map((item, i) => <span key={i}>{item}</span>)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-5 h-5 text-[#002f5d]" />
                <h3 className="text-lg font-bold text-[#002f5d]">CAMINHÃO</h3>
              </div>
              <div className="text-[#6bb52e] font-bold text-lg leading-tight flex flex-col pl-7">
                {parseList(data.caminhao).map((item, i) => <span key={i}>{item}</span>)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-5 h-5 text-[#002f5d]" />
                <h3 className="text-lg font-bold text-[#002f5d]">ÁREA DE VIVENCIA</h3>
              </div>
              <div className="text-[#6bb52e] font-bold text-lg leading-tight flex flex-col pl-7">
                {parseList(data.areaVivencia).map((item, i) => <span key={i}>{item}</span>)}
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex-1 flex flex-col pl-2">
            
            <div className="border-b-[3px] border-[#002f5d] pb-4 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-5 h-5 text-[#002f5d]" />
                <h3 className="text-lg font-bold text-[#002f5d]">ÁREA SETOR (ha)</h3>
              </div>
              <div className="text-[#002f5d] font-bold text-lg leading-tight flex flex-col pl-7 mt-1">
                <div>TOTAL: <span className="text-[#6bb52e]">{formatNumber(data.areaTotal)}</span></div>
                <div>REALIZADO: <span className="text-[#6bb52e]">{formatNumber(data.areaRealizado)}</span></div>
                <div>Á REALIZAR: <span className="text-[#6bb52e]">{formatNumber(data.areaARealizar)}</span></div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-5 h-5 text-[#002f5d]" />
                  <h3 className="text-lg font-bold text-[#002f5d] leading-tight">RECOMENDAÇÃO</h3>
                </div>
                <div className="text-[#6bb52e] font-bold text-lg leading-tight flex flex-col pl-7 mt-1">
                  {parseList(data.recomendacao).map((item, i) => <span key={i}>{item}</span>)}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-5 h-5 text-[#002f5d]" />
                  <h3 className="text-lg font-bold text-[#002f5d]">SEQUENCIAS</h3>
                </div>
                <div className="text-[#6bb52e] font-bold text-lg leading-tight flex flex-col pl-7 mt-1">
                  {parseList(data.sequencias).map((item, i) => <span key={i}>{item}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (Chart Box) */}
      <div className="flex-[1.5] relative">
        {/* Target Icon overlapping the border */}
        <div className="absolute top-[68px] -left-5 bg-white rounded-full p-1 z-10 flex items-center justify-center">
          <Target className="w-8 h-8 text-[#6bb52e]" strokeWidth={2.5} />
        </div>
        
        <div className="border-[3px] border-[#002f5d] rounded-[30px] p-6 pt-8 h-full flex flex-col relative">
          <h2 className="text-xl font-bold text-[#002f5d] text-center mb-4">RENDIMENTO TURNOS</h2>
          
          <div className="text-left ml-4 mb-6 font-bold text-lg">
            <div className="text-[#002f5d]">TURNO A: </div>
            <div className="text-[#002f5d]">TURNO B: </div>
            <div className="text-[#002f5d]">TURNO C: </div>
          </div>

          {/* Bar Chart Area */}
          <div className="flex-1 flex items-end justify-between pl-2 pr-6 pb-8 pt-6 relative mt-4 border-b border-[#002f5d]/20">
            {/* Turno A */}
            <div className="flex flex-col items-center justify-end w-10 h-full relative group">
              <div 
                className="w-full bg-[#485b6b] relative" 
                style={{ height: `${(data.turnoA / maxVal) * 90}%` }}
              >
                <span className="text-sm font-bold text-[#002f5d] absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">{formatNumber(data.turnoA)}</span>
              </div>
              <span className="absolute -bottom-6 text-[10px] font-bold text-[#002f5d] whitespace-nowrap tracking-tighter">TURNO A</span>
            </div>
            
            {/* Turno B */}
            <div className="flex flex-col items-center justify-end w-10 h-full relative group">
              <div 
                className="w-full bg-[#485b6b] relative" 
                style={{ height: `${(data.turnoB / maxVal) * 90}%` }}
              >
                <span className="text-sm font-bold text-[#002f5d] absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">{formatNumber(data.turnoB)}</span>
              </div>
              <span className="absolute -bottom-6 text-[10px] font-bold text-[#002f5d] whitespace-nowrap tracking-tighter">TURNO B</span>
            </div>

            {/* Turno C */}
            <div className="flex flex-col items-center justify-end w-10 h-full relative group">
              <div 
                className="w-full bg-[#485b6b] relative" 
                style={{ height: `${(data.turnoC / maxVal) * 90}%` }}
              >
                <span className="text-sm font-bold text-[#002f5d] absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">{formatNumber(data.turnoC)}</span>
              </div>
              <span className="absolute -bottom-6 text-[10px] font-bold text-[#002f5d] whitespace-nowrap tracking-tighter">TURNO C</span>
            </div>

            {/* Total */}
            <div className="flex flex-col items-center justify-end w-10 h-full relative group">
              <div 
                className="w-full bg-[#6bb52e] relative" 
                style={{ height: `${(total / maxVal) * 90}%` }}
              >
                <span className="text-sm font-bold text-[#002f5d] absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">{formatNumber(total)}</span>
              </div>
              <span className="absolute -bottom-6 text-[10px] font-bold text-[#002f5d] whitespace-nowrap tracking-tighter">TOTAL</span>
            </div>
          </div>
          
          {/* Small icon in bottom right */}
          <img 
            src="https://dkozrkzoghhylgvddkze.supabase.co/storage/v1/object/public/HERB/LOGO%20(3).png" 
            alt="Logo" 
            crossOrigin="anonymous"
            className="absolute -bottom-2 -right-2 z-10 w-10 h-10 rounded-lg object-contain shadow-sm bg-white"
          />
        </div>
      </div>
    </div>
  );
}
