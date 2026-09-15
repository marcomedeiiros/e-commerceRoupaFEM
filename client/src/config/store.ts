export interface StoreConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsappNumber: string; // Formato internacional DDI + DDD + Número sem símbolos
  whatsappFormatted: string;
  email: string;
  address: string;
  hours: string;
  freeShippingThreshold: number;
  instagramUrl: string;
  coupons: {
    code: string;
    discountPercent: number;
    description: string;
  }[];
  shippingOptions: {
    id: string;
    name: string;
    description: string;
    price: number;
    deliveryDays: string;
  }[];
}

export const STORE_CONFIG: StoreConfig = {
  name: "Aura Atelier",
  shortName: "Aura",
  tagline: "Seu estilo começa pela escolha certa.",
  description: "Calças femininas que combinam conforto, corte impecável, qualidade premium e sofisticação atemporal.",
  // Configure aqui o número do WhatsApp comercial (apenas números com DDI e DDD)
  whatsappNumber: "5511999999999",
  whatsappFormatted: "(11) 99999-9999",
  email: "contato@auraatelier.com.br",
  address: "Alameda Lorena, 1420 - Jardins, São Paulo - SP",
  hours: "Segunda a Sábado, das 09:00 às 19:00",
  freeShippingThreshold: 299.90,
  instagramUrl: "https://instagram.com",
  coupons: [
    {
      code: "BEMVINDA10",
      discountPercent: 10,
      description: "10% de desconto na primeira compra",
    },
    {
      code: "AURA15",
      discountPercent: 15,
      description: "15% de desconto especial",
    },
  ],
  shippingOptions: [
    {
      id: "economica",
      name: "Entrega Econômica",
      description: "Melhor custo-benefício com rastreio padrão",
      price: 18.90,
      deliveryDays: "5 a 8 dias úteis",
    },
    {
      id: "normal",
      name: "Entrega Convencional",
      description: "Transportadora parceira com seguro total",
      price: 26.50,
      deliveryDays: "3 a 5 dias úteis",
    },
    {
      id: "expressa",
      name: "Aura Express VIP",
      description: "Entrega prioritária e embalagem especial para presente",
      price: 39.90,
      deliveryDays: "1 a 2 dias úteis",
    },
  ],
};
