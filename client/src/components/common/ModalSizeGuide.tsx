import React from 'react';
import { X, Ruler } from 'lucide-react';

interface ModalSizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSizeGuide: React.FC<ModalSizeGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeChart = [
    { size: '34 (PP)', waist: '62 - 66 cm', hip: '90 - 94 cm', length: '102 cm' },
    { size: '36 (P)', waist: '66 - 70 cm', hip: '94 - 98 cm', length: '104 cm' },
    { size: '38 (M)', waist: '70 - 74 cm', hip: '98 - 102 cm', length: '105 cm' },
    { size: '40 (M/G)', waist: '74 - 78 cm', hip: '102 - 106 cm', length: '106 cm' },
    { size: '42 (G)', waist: '78 - 82 cm', hip: '106 - 110 cm', length: '107 cm' },
    { size: '44 (GG)', waist: '82 - 86 cm', hip: '110 - 116 cm', length: '108 cm' },
    { size: '46 (XG)', waist: '86 - 92 cm', hip: '116 - 122 cm', length: '109 cm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-[#FAF9F6] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E7DFD3] p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7DFD3]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#C2A278]" />
            <h3 className="font-serif text-2xl font-medium text-[#1A1A1A]">
              Tabela de Medidas de Calças
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F4EFE6] text-[#767676] hover:text-[#1A1A1A] transition-colors"
            aria-label="Fechar guia de medidas"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <p className="text-sm text-[#4A4A4A] leading-relaxed">
            Nossas calças são desenvolvidas seguindo os padrões da alfaiataria brasileira com caimento ergonômico.
            Utilize uma fita métrica maleável sem apertar a pele para encontrar a sua numeração exata.
          </p>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#E7DFD3] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F4EFE6] text-[#1A1A1A] font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Tamanho</th>
                  <th className="py-3 px-4">Cintura</th>
                  <th className="py-3 px-4">Quadril</th>
                  <th className="py-3 px-4">Comprimento Aprox.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DFD3]">
                {sizeChart.map((row, idx) => (
                  <tr
                    key={row.size}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F6]'}
                  >
                    <td className="py-3 px-4 font-semibold text-[#1A1A1A]">{row.size}</td>
                    <td className="py-3 px-4 text-[#4A4A4A]">{row.waist}</td>
                    <td className="py-3 px-4 text-[#4A4A4A]">{row.hip}</td>
                    <td className="py-3 px-4 text-[#4A4A4A]">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tips */}
          <div className="bg-[#F4EFE6] p-4 rounded-xl space-y-2 border border-[#E7DFD3]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              Dicas de como medir:
            </h4>
            <ul className="text-xs text-[#4A4A4A] space-y-1 list-disc list-inside">
              <li><strong>Cintura:</strong> Meça na parte mais fina do abdômen, cerca de 2 dedos acima do umbigo.</li>
              <li><strong>Quadril:</strong> Meça na parte mais saliente do quadril e bumbum.</li>
              <li><strong>Entre dois tamanhos?</strong> Para modelos 100% algodão, prefira o tamanho maior para mais conforto. Para modelos com elastano, escolha o seu tamanho padrão.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium rounded-lg hover:bg-[#333333] transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
