export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "calcas",
    name: "Calças Femininas",
    slug: "calcas",
    description: "Do jeans clássico à alfaiataria fina, cortes que valorizam sua silhueta.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    isActive: true,
    itemCount: 12,
  },
  {
    id: "alfaiataria",
    name: "Alfaiataria Elegante",
    slug: "calcas", // Redireciona para calças alfaiataria
    description: "Cortes impecáveis para momentos formais e dias produtivos.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
    isActive: true,
    itemCount: 4,
  },
  {
    id: "jeans",
    name: "Denim Premium",
    slug: "calcas", // Redireciona para calças jeans
    description: "Lavagens nobres, elasticidade confortável e durabilidade ímpar.",
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=900&q=80",
    isActive: true,
    itemCount: 7,
  },
  {
    id: "blusas",
    name: "Blusas & Camisas",
    slug: "blusas",
    description: "Tecidos leves, seda e algodão pima. Em breve em nossa loja.",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=80",
    isActive: false, // Preparado para próxima coleção
    itemCount: 0,
  },
  {
    id: "vestidos",
    name: "Vestidos & Macacões",
    slug: "vestidos",
    description: "Fluidêz e sofisticação para ocasiões especiais. Em breve.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    isActive: false,
    itemCount: 0,
  },
  {
    id: "jaquetas",
    name: "Casacos & Jaquetas",
    slug: "jaquetas",
    description: "Terceira peça com modelagens estruturadas. Em breve.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    isActive: false,
    itemCount: 0,
  },
];
