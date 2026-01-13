import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DesignPrototype } from '@/data/designs';

// Selected Design Interface
export interface SelectedDesign {
  designId: string;
  designTitle: string;
  designCategory: string;
  designImageUrl: string;
  selectedAt: number;
}

// Context Type
interface DesignSelectionContextType {
  selectedDesign: SelectedDesign | null;
  selectDesign: (design: DesignPrototype) => void;
  clearSelection: () => void;
}

// Create Context
const DesignSelectionContext = createContext<DesignSelectionContextType | undefined>(undefined);

// LocalStorage Key
const STORAGE_KEY = 'stackweb_selected_design';

// Provider Component
export function DesignSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedDesign, setSelectedDesign] = useState<SelectedDesign | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedDesign(parsed);
      }
    } catch (error) {
      console.error('Error loading selected design from localStorage:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save to localStorage whenever selection changes
  useEffect(() => {
    try {
      if (selectedDesign) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedDesign));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving selected design to localStorage:', error);
    }
  }, [selectedDesign]);

  const selectDesign = (design: DesignPrototype) => {
    const selection: SelectedDesign = {
      designId: design.id,
      designTitle: design.title,
      designCategory: design.category,
      designImageUrl: design.imageUrl,
      selectedAt: Date.now()
    };
    setSelectedDesign(selection);
  };

  const clearSelection = () => {
    setSelectedDesign(null);
  };

  return (
    <DesignSelectionContext.Provider value={{ selectedDesign, selectDesign, clearSelection }}>
      {children}
    </DesignSelectionContext.Provider>
  );
}

// Custom Hook
export function useDesignSelection() {
  const context = useContext(DesignSelectionContext);
  if (context === undefined) {
    throw new Error('useDesignSelection must be used within a DesignSelectionProvider');
  }
  return context;
}
