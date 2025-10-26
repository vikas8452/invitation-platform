import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Template, CustomizationData } from './types';

interface CartStore {
  items: CartItem[];
  addItem: (template: Template, customization?: Partial<CustomizationData>) => void;
  removeItem: (templateId: string) => void;
  updateCustomization: (templateId: string, customization: Partial<CustomizationData>) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (template, customization = {}) => {
        const items = get().items;
        const existingItem = items.find(item => item.template.id === template.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.template.id === template.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            items: [...items, { template, customization, quantity: 1 }]
          });
        }
      },
      
      removeItem: (templateId) => {
        set({
          items: get().items.filter(item => item.template.id !== templateId)
        });
      },
      
      updateCustomization: (templateId, customization) => {
        set({
          items: get().items.map(item =>
            item.template.id === templateId
              ? { ...item, customization: { ...item.customization, ...customization } }
              : item
          )
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.template.price * item.quantity);
        }, 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
