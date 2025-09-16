// src/store/bookingStore.ts
import { create } from "zustand";

/* ----------------------------- Types / Models ---------------------------- */
export type Category = "lashes" | "nails" | "braids" | "pedicures" | "piercings";

export interface Service {
  id: string;
  name: string;
  category: Category;
  duration: number; // in minutes
  price: number;
  description: string;
}

export interface TimeSlot {
  time: string; // "09:00"
  available: boolean;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingData {
  service?: Service;
  date?: Date;
  time?: string;
  customerInfo?: CustomerInfo;
}

interface BookingState {
  currentStep: number;
  bookingData: BookingData;
  availableSlots: TimeSlot[];
  isLoading: boolean;

  // Actions
  setCurrentStep: (step: number) => void;
  updateBookingData: (data: Partial<BookingData>) => void;
  setAvailableSlots: (slots: TimeSlot[]) => void;
  setLoading: (loading: boolean) => void;
  resetBooking: () => void;
}

/* --------------------------------- Mock Data -------------------------------- */
export const services: Service[] = [
  // Lashes
  {
    id: "classic-lashes",
    name: "Classic Lashes",
    category: "lashes",
    duration: 120,
    price: 75,
    description: "Natural-looking individual lash extensions for everyday elegance",
  },
  {
    id: "hybrid-lashes",
    name: "Hybrid Lashes",
    category: "lashes",
    duration: 135,
    price: 95,
    description: "Perfect blend of classic and volume techniques for fuller lashes",
  },
  {
    id: "volume-lashes",
    name: "Volume Lashes",
    category: "lashes",
    duration: 150,
    price: 125,
    description: "Dramatic, fluffy lashes using multiple thin extensions per natural lash",
  },
  {
    id: "lash-refill",
    name: "Lash Refill",
    category: "lashes",
    duration: 90,
    price: 55,
    description: "Maintain your lash extensions with professional refill service",
  },

  // Nails
  {
    id: "acrylic-nails",
    name: "Acrylic Nails",
    category: "nails",
    duration: 90,
    price: 60,
    description: "Durable acrylic extensions with your choice of length and shape",
  },
  {
    id: "gel-manicure",
    name: "Gel Manicure",
    category: "nails",
    duration: 60,
    price: 45,
    description: "Long-lasting gel polish with professional nail care",
  },
  {
    id: "press-on-nails",
    name: "Press-on Nails",
    category: "nails",
    duration: 45,
    price: 35,
    description: "Quick and stylish press-on nail application",
  },
  {
    id: "nail-art",
    name: "Custom Nail Art",
    category: "nails",
    duration: 120,
    price: 85,
    description: "Intricate nail art designs customized to your preferences",
  },

  // Braids
  {
    id: "box-braids",
    name: "Box Braids",
    category: "braids",
    duration: 240,
    price: 150,
    description: "Classic protective box braids in various sizes and lengths",
  },
  {
    id: "knotless-braids",
    name: "Knotless Braids",
    category: "braids",
    duration: 300,
    price: 180,
    description: "Gentler knotless braids for maximum comfort and natural look",
  },
  {
    id: "jungle-braids",
    name: "Jungle Braids",
    category: "braids",
    duration: 210,
    price: 140,
    description: "Chunky, statement braids perfect for a bold look",
  },
  {
    id: "passion-twists",
    name: "Passion Twists",
    category: "braids",
    duration: 180,
    price: 120,
    description: "Trendy bohemian twists with a natural, textured appearance",
  },

  // Pedicures
  {
    id: "classic-pedicure",
    name: "Classic Pedicure",
    category: "pedicures",
    duration: 45,
    price: 35,
    description: "Traditional pedicure with nail trimming, filing, and polish",
  },
  {
    id: "spa-pedicure",
    name: "Spa Pedicure",
    category: "pedicures",
    duration: 75,
    price: 55,
    description: "Luxurious spa treatment with exfoliation, massage, and moisturizing",
  },
  {
    id: "gel-pedicure",
    name: "Gel Pedicure",
    category: "pedicures",
    duration: 60,
    price: 45,
    description: "Long-lasting gel polish pedicure for extended wear",
  },

  // Piercings
  {
    id: "ear-piercing",
    name: "Ear Piercing",
    category: "piercings",
    duration: 30,
    price: 25,
    description: "Professional ear piercing with sterilized equipment and premium jewelry",
  },
  {
    id: "nose-piercing",
    name: "Nose Piercing",
    category: "piercings",
    duration: 30,
    price: 35,
    description: "Safe and hygienic nose piercing with aftercare instructions",
  },
  {
    id: "body-piercing",
    name: "Body Piercing",
    category: "piercings",
    duration: 45,
    price: 45,
    description: "Professional body piercing with highest safety standards",
  },
];

/* ---------------------------- Time slot helper --------------------------- */
export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 19;
  const interval = 30;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      const available = Math.random() > 0.3;
      slots.push({ time, available });
    }
  }
  return slots;
};

export const getAvailableSlotsForDate = async (date: Date): Promise<TimeSlot[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(generateTimeSlots(date)), 500);
  });

/* -------------------------------- Store --------------------------------- */
export const useBookingStore = create<BookingState>((set, get) => ({
  currentStep: 1,
  bookingData: {},
  availableSlots: [],
  isLoading: false,

  setCurrentStep: (step) => set({ currentStep: step }),

  updateBookingData: (data) =>
    set((state) => ({ bookingData: { ...state.bookingData, ...data } })),

  setAvailableSlots: (slots) => set({ availableSlots: slots }),

  setLoading: (loading) => set({ isLoading: loading }),

  resetBooking: () =>
    set({
      currentStep: 1,
      bookingData: {},
      availableSlots: [],
      isLoading: false,
    }),
}));
