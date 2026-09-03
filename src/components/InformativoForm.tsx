import React from 'react';
import { InformativoData } from '../types';

interface FormProps {
  data: InformativoData;
  onChange: (data: InformativoData) => void;
}

export function InformativoForm({ data, onChange }: FormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    onChange({
      ...data,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Dados do Informativo (Campos Verdes)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Frente</label>
          <input type="text" name="frente" value={data.frente} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
          <input type="text" name="setor" value={data.setor} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Operação</label>
          <input type="text" name="operacao" value={data.operacao} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Equipamentos (um por linha)</label>
          <textarea name="equipamentos" value={data.equipamentos} onChange={handleChange} rows={5} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 font-mono text-sm" />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caminhão</label>
            <input type="text" name="caminhao" value={data.caminhao} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área de Vivência</label>
            <input type="text" name="areaVivencia" value={data.areaVivencia} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 font-mono text-sm" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recomendação (um por linha)</label>
          <textarea name="recomendacao" value={data.recomendacao} onChange={handleChange} rows={4} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sequências (um por linha)</label>
          <textarea name="sequencias" value={data.sequencias} onChange={handleChange} rows={4} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 font-mono text-sm" />
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-3 border-b pb-1">Rendimento Turnos</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Turno A</label>
            <input type="number" name="turnoA" value={data.turnoA} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Turno B</label>
            <input type="number" name="turnoB" value={data.turnoB} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Turno C</label>
            <input type="number" name="turnoC" value={data.turnoC} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
