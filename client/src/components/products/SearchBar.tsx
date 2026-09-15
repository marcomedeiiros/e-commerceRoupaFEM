import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Buscar calças por modelo (ex: Pantalona, Wide Leg, Skinny)...",
}) => {
  return (
    <div className="relative w-full">
      <Search className="w-5 h-5 text-[#767676] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-[#D4C6B3] rounded-xl py-3 pl-11 pr-10 text-sm text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-2 focus:ring-[#1A1A1A]/20 focus:border-[#1A1A1A] shadow-2xs transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="p-1 absolute right-3 top-1/2 -translate-y-1/2 text-[#767676] hover:text-[#1A1A1A] transition-colors rounded-full hover:bg-[#F4EFE6]"
          aria-label="Limpar pesquisa"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
