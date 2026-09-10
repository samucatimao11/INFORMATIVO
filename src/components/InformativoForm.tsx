import React from 'react';
import { InformativoData } from '../types';

interface FormProps {
  data: InformativoData;
  onChange: (data: InformativoData) => void;
}

export function InformativoForm({ data, onChange }: FormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const newData = { ...data, [name]: value };

    if (name === 'areaTotal' || name === 'areaRealizado') {
      const totalStr = name === 'areaTotal' ? value : data.areaTotal;
      const realizadoStr = name === 'areaRealizado' ? value : data.areaRealizado;
      
      const total = Number(String(totalStr).replace(',', '.'));
      const realizado = Number(String(realizadoStr).replace(',', '.'));
      
      if (!isNaN(total) && !isNaN(realizado)) {
        newData.areaARealizar = Math.max(0, total - realizado).toString().replace('.', ',');
      } else {
        newData.areaARealizar = '';
      }
    }
    
    onChange(newData);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleCheckboxChange = (name: 'equipamentos' | 'caminhao', value: string, checked: boolean) => {
    onChange({
      ...data,
      [name]: checked 
        ? [...data[name], value]
        : data[name].filter(item => item !== value)
    });
  };

  const frentesOptions = ["AUTOPROPELIDOS", "BARRA CENTRAL", "CATAÇÃO"];
  const equipamentosOptions = ["4201027", "4201028", "4200867", "4200869", "4200870", "4200722", "4200782", "4200783", "4200602", "4200907", "4200874"];
  const caminhaoOptions = ["4100430", "4100615", "4100616", "4100467", "4100468", "4100469", "4100501", "4100498"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Dados do Informativo (Campos Verdes)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
          <input type="date" name="dataDaAtividade" value={data.dataDaAtividade} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Frente</label>
          <select name="frente" value={data.frente} onChange={handleSelectChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500">
            <option value="">Selecione...</option>
            {frentesOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Equipamentos</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border rounded p-3 bg-gray-50 h-[140px] overflow-y-auto">
            {equipamentosOptions.map(opt => (
              <label key={opt} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 p-1 rounded">
                <input 
                  type="checkbox" 
                  checked={data.equipamentos.includes(opt)}
                  onChange={(e) => handleCheckboxChange('equipamentos', opt, e.target.checked)}
                  className="rounded text-lime-600 focus:ring-lime-500"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caminhão</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border rounded p-3 bg-gray-50 max-h-[80px] overflow-y-auto">
              {caminhaoOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 p-1 rounded">
                  <input 
                    type="checkbox" 
                    checked={data.caminhao.includes(opt)}
                    onChange={(e) => handleCheckboxChange('caminhao', opt, e.target.checked)}
                    className="rounded text-lime-600 focus:ring-lime-500"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área de Vivência</label>
            <input type="text" name="areaVivencia" value={data.areaVivencia} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 font-mono text-sm" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-3 border-b pb-1">Área Setor (ha)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
            <input type="text" inputMode="decimal" name="areaTotal" value={data.areaTotal} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Realizado</label>
            <input type="text" inputMode="decimal" name="areaRealizado" value={data.areaRealizado} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Á Realizar</label>
            <input type="text" inputMode="decimal" name="areaARealizar" value={data.areaARealizar} readOnly disabled className="w-full p-2 border rounded bg-gray-100 text-gray-500" />
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
            <input type="text" inputMode="decimal" name="turnoA" value={data.turnoA} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 mb-2" />
            <input type="text" name="obsTurnoA" value={data.obsTurnoA} onChange={handleChange} placeholder="Observações..." className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 text-xs" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Turno B</label>
            <input type="text" inputMode="decimal" name="turnoB" value={data.turnoB} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 mb-2" />
            <input type="text" name="obsTurnoB" value={data.obsTurnoB} onChange={handleChange} placeholder="Observações..." className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 text-xs" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Turno C</label>
            <input type="text" inputMode="decimal" name="turnoC" value={data.turnoC} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 mb-2" />
            <input type="text" name="obsTurnoC" value={data.obsTurnoC} onChange={handleChange} placeholder="Observações..." className="w-full p-2 border rounded focus:ring-2 focus:ring-lime-500 text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}
