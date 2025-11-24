"use client";

import { useTheme } from "./theme-provider";
import { MdPalette } from "react-icons/md";
import { useState } from "react";

export function ThemeSelector() {
  const { currentTheme, themes, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
        aria-label="Selecionar tema"
      >
        <MdPalette size={20} />
        <span className="hidden md:block text-sm font-medium">
          {currentTheme.name}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Overlay para fechar o dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 z-20">
            <div className="p-3">
              <h3 className="text-sm font-semibold mb-3 text-gray-700">
                Escolha um tema
              </h3>
              
              <div className="space-y-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      currentTheme.id === theme.id
                        ? 'bg-pink-100 border-2 border-pink-300'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    {/* Preview das cores */}
                    <div className="flex gap-1">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/50"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/50"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/50"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                    
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800">
                        {theme.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
