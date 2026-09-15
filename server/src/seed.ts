/**
 * seed.ts Popula o banco com os dados originais do front-end.
 * Execute com: npm run seed
 * Só insere dados se as tabelas estiverem vazias (idempotente).
 */

import db from './db.js';

// ─── Produtos ─────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: 'Calça Wide Leg Jeans Lavagem Média',
    slug: 'calca-wide-leg-jeans',
    description:
      'A queridinha do momento. Confeccionada em denim 100% algodão com lavagem média artesanal e cintura super alta. O caimento amplo proporciona alongamento da silhueta com total conforto.',
    price: 249.9,
    oldPrice: 299.9,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Azul Médio', 'Azul Claro'],
    category: 'Wide Leg',
    stock: 24,
    rating: 4.9,
    reviews: 67,
    featured: true,
    isNew: true,
    details: {
      composition: '100% Algodão Nacional Certificado BCI',
      care: [
        'Lavar à máquina em ciclo suave com água fria',
        'Não utilizar alvejantes ou cloro',
        'Secar à sombra para preservar a tonalidade original do denim',
        'Passar a ferro em temperatura média (até 150°C)',
      ],
      fit: 'Cintura alta e corte reto-amplo que não aperta o quadril.',
    },
  },
  {
    id: 2,
    name: 'Calça Mom Jeans Vintage 90s',
    slug: 'calca-mom-jeans',
    description:
      'Inspirada no clássico dos anos 90, a Calça Mom Jeans possui cintura bem marcada, quadril ligeiramente solto e pernas afuniladas. Um coringa atemporal para compor looks casuais e elegantes.',
    price: 229.9,
    oldPrice: 259.9,
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['34', '36', '38', '40', '42', '44'],
    colors: ['Azul Claro', 'Azul Médio', 'Preto'],
    category: 'Mom Jeans',
    stock: 18,
    rating: 4.8,
    reviews: 94,
    featured: true,
    isNew: false,
    details: {
      composition: '99% Algodão, 1% Elastano',
      care: [
        'Lavar pelo avesso para evitar desgastes prematuros',
        'Não lavar a seco',
        'Secar em varal sem torcer',
      ],
      fit: 'Cintura alta clássica com perna semi-ajustada no tornozelo.',
    },
  },
  {
    id: 3,
    name: 'Calça Skinny Modeladora Cintura Alta',
    slug: 'calca-skinny',
    description:
      'Tecnologia com alto teor de elastano e toque super macio que desenha e valoriza as curvas sem perder o conforto. Acabamento clean e bolsos traseiros funcionais em formato empina-bumbum.',
    price: 189.9,
    oldPrice: 239.9,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['34', '36', '38', '40', '42'],
    colors: ['Azul Escuro', 'Preto'],
    category: 'Skinny',
    stock: 30,
    rating: 4.7,
    reviews: 52,
    featured: false,
    isNew: false,
    details: {
      composition: '78% Algodão, 20% Poliéster nobre, 2% Elastano de alta recuperação',
      care: [
        'Evitar água quente para preservar as fibras elásticas',
        'Secar na vertical e à sombra',
      ],
      fit: 'Super justa do quadril à barra, molda a silhueta.',
    },
  },
  {
    id: 4,
    name: 'Calça Pantalona Alfaiataria Fluida Bege',
    slug: 'calca-pantalona',
    description:
      'Elegância pura em cada movimento. Confeccionada em tecido de alfaiataria com caimento pesado e fluido, pregas frontais refinadas e passantes largos para cinto. Perfeita do escritório ao jantar sofisticado.',
    price: 289.9,
    oldPrice: 349.9,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['36', '38', '40', '42', '44', '46'],
    colors: ['Bege', 'Off-White', 'Preto'],
    category: 'Pantalona',
    stock: 15,
    rating: 5.0,
    reviews: 43,
    featured: true,
    isNew: true,
    details: {
      composition: '92% Viscose Sarjada, 8% Poliéster',
      care: [
        'Lavagem manual ou lavagem suave no saquinho protetor',
        'Passar a ferro pelo lado avesso em baixa temperatura',
      ],
      fit: 'Cintura alta marcada e pernas ultra amplas fluidas.',
    },
  },
  {
    id: 5,
    name: 'Calça Cargo Streetwear com Bolsos Utilitários',
    slug: 'calca-cargo',
    description:
      'Moderna, prática e cheia de atitude. A calça cargo une o visual urbano contemporâneo à modelagem confortável. Bolsos laterais com lapela estratégica e caimento reto descontraído.',
    price: 259.9,
    oldPrice: 289.9,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['36', '38', '40', '42'],
    colors: ['Verde Militar', 'Areia', 'Preto'],
    category: 'Cargo',
    stock: 12,
    rating: 4.8,
    reviews: 31,
    featured: false,
    isNew: true,
    details: {
      composition: '100% Sarja de Algodão Peletizado',
      care: ['Lavagem comum até 40°C', 'Pode ir à secadora em temperatura baixa'],
      fit: 'Modelagem reta levemente folgada com bolsos funcionais.',
    },
  },
  {
    id: 6,
    name: 'Calça Flare Jeans Barra Ampla Escura',
    slug: 'calca-flare',
    description:
      'A clássica silhueta bailarina que alonga a postura. Ajustada nas coxas e abrindo suavemente a partir do joelho. Lavagem dark clean que transita perfeitamente do dia para a noite.',
    price: 239.9,
    oldPrice: 279.9,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Azul Escuro', 'Preto'],
    category: 'Flare',
    stock: 20,
    rating: 4.9,
    reviews: 48,
    featured: false,
    isNew: false,
    details: {
      composition: '98% Algodão, 2% Elastano',
      care: ['Lavar separadamente nas primeiras lavagens', 'Não alvejar'],
      fit: 'Cintura alta, justa até o joelho e flare na barra.',
    },
  },
  {
    id: 7,
    name: 'Calça Reta Jeans Tradicional Clássica',
    slug: 'calca-reta',
    description:
      'O modelo mais versátil do guarda-roupa feminino. Nem muito justa nem muito ampla, a calça reta harmoniza com tênis, salto alto ou botas. Um investimento certeiro para anos de uso.',
    price: 219.9,
    oldPrice: 249.9,
    images: [
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['36', '38', '40', '42', '44', '46'],
    colors: ['Azul Médio', 'Azul Claro', 'Off-White'],
    category: 'Reta',
    stock: 22,
    rating: 4.8,
    reviews: 59,
    featured: false,
    isNew: false,
    details: {
      composition: '100% Algodão Nobre',
      care: ['Lavar em ciclo normal', 'Passar com ferro quente do lado avesso'],
      fit: 'Corte reto linear da altura da coxa até a barra.',
    },
  },
  {
    id: 8,
    name: 'Calça Jogger Moletom Premium Canelado',
    slug: 'calca-jogger',
    description:
      'O ápice do comfy chic. Moletom encorpado com toque aveludado interno, cós com elástico pespontado e cordão em algodão cru com ponteiras metálicas banhadas a ouro fosco.',
    price: 199.9,
    oldPrice: 229.9,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Bege', 'Off-White', 'Preto', 'Cinza Mescla'],
    category: 'Jogger',
    stock: 16,
    rating: 4.9,
    reviews: 73,
    featured: false,
    isNew: true,
    details: {
      composition: '88% Algodão Premium, 12% Poliéster Felpado',
      care: ['Lavar em temperatura até 30°C', 'Não secar em tambor rotativo'],
      fit: 'Cintura elástica confortável com punho ajustado na perna.',
    },
  },
  {
    id: 9,
    name: 'Calça Jeans Tradicional Reta 100% Algodão',
    slug: 'calca-jeans-tradicional',
    description:
      'Autêntica essência denim com estrutura rígida e encorpada de 12oz que se molda ao corpo conforme o uso. Botões e rebites em latão envelhecido com acabamento artesanal.',
    price: 219.9,
    oldPrice: 259.9,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Jeans Tradicional', 'Azul Escuro'],
    category: 'Jeans Tradicional',
    stock: 19,
    rating: 4.7,
    reviews: 38,
    featured: false,
    isNew: false,
    details: {
      composition: '100% Algodão Sustentável',
      care: [
        'Lavar poucas vezes para preservar o visual raw vintage',
        'Secar na sombra em local arejado',
      ],
      fit: 'Corte clássico 5 bolsos com gancho médio-alto.',
    },
  },
  {
    id: 10,
    name: 'Calça Alfaiataria Reta com Pregas Preto',
    slug: 'calca-alfaiataria',
    description:
      'A definição máxima de autoridade e sofisticação. Corte impecável com costuras invisíveis, forro interno acetinado e fecho com colchete de alfaiataria embutido. Essencial para mulheres elegantes.',
    price: 279.9,
    oldPrice: 329.9,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['36', '38', '40', '42', '44', '46'],
    colors: ['Preto', 'Off-White', 'Terracota'],
    category: 'Alfaiataria',
    stock: 25,
    rating: 5.0,
    reviews: 82,
    featured: true,
    isNew: true,
    details: {
      composition: '74% Poliéster de Alta Densidade, 22% Viscose, 4% Elastano',
      care: [
        'Lavar a mão ou processo delicado',
        'Não alvejar nem torcer',
        'Passar a vapor ou ferro morno com pano protetor',
      ],
      fit: 'Cintura alta com caimento estruturado e pregas verticais.',
    },
  },
  {
    id: 11,
    name: 'Calça Sarja Feminina Reta Terracota',
    slug: 'calca-sarja',
    description:
      'Sarja nobre com toque aveludado e cor terracota calorosa e sofisticada. Traz textura e personalidade imediata aos looks de meia-estação e dias frescos.',
    price: 239.9,
    oldPrice: 269.9,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Terracota', 'Areia', 'Verde Militar'],
    category: 'Sarja',
    stock: 14,
    rating: 4.8,
    reviews: 29,
    featured: false,
    isNew: false,
    details: {
      composition: '98% Algodão Penteado, 2% Elastano',
      care: ['Lavar com sabão neutro líquido', 'Secar sempre à sombra para não desbotar'],
      fit: 'Corte reto ajustado na medida com cintura média-alta.',
    },
  },
  {
    id: 12,
    name: 'Calça Wide Leg Premium Liocel e Algodão',
    slug: 'calca-wide-leg-premium',
    description:
      'O luxo do toque Liocel combinado com a durabilidade do algodão nobre. Caimento fluido e refrescante, perfeita para climas tropicais sem abrir mão da máxima elegância.',
    price: 319.9,
    oldPrice: 389.9,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Off-White', 'Azul Claro', 'Bege'],
    category: 'Wide Leg',
    stock: 10,
    rating: 5.0,
    reviews: 56,
    featured: true,
    isNew: true,
    details: {
      composition: '60% Liocel Tencel™, 40% Algodão Pima',
      care: ['Lavagem suave em temperatura máxima de 30°C', 'Passar pelo avesso com ferro morno'],
      fit: 'Modelagem ampla sofisticada com movimento leve e fluído.',
    },
  },
];

// ─── Categorias ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'calcas',
    name: 'Calças Femininas',
    slug: 'calcas',
    description: 'Do jeans clássico à alfaiataria fina, cortes que valorizam sua silhueta.',
    image:
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    isActive: true,
    itemCount: 12,
  },
  {
    id: 'alfaiataria',
    name: 'Alfaiataria Elegante',
    slug: 'calcas',
    description: 'Cortes impecáveis para momentos formais e dias produtivos.',
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
    isActive: true,
    itemCount: 4,
  },
  {
    id: 'jeans',
    name: 'Denim Premium',
    slug: 'calcas',
    description: 'Lavagens nobres, elasticidade confortável e durabilidade ímpar.',
    image:
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=900&q=80',
    isActive: true,
    itemCount: 7,
  },
  {
    id: 'blusas',
    name: 'Blusas & Camisas',
    slug: 'blusas',
    description: 'Tecidos leves, seda e algodão pima. Em breve em nossa loja.',
    image:
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=80',
    isActive: false,
    itemCount: 0,
  },
  {
    id: 'vestidos',
    name: 'Vestidos & Macacões',
    slug: 'vestidos',
    description: 'Fluidêz e sofisticação para ocasiões especiais. Em breve.',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    isActive: false,
    itemCount: 0,
  },
  {
    id: 'jaquetas',
    name: 'Casacos & Jaquetas',
    slug: 'jaquetas',
    description: 'Terceira peça com modelagens estruturadas. Em breve.',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
    isActive: false,
    itemCount: 0,
  },
];

// ─── Cupons ───────────────────────────────────────────────────────────────────

const COUPONS = [
  {
    code: 'BEMVINDA10',
    discountPercent: 10,
    description: '10% de desconto na primeira compra',
  },
  {
    code: 'AURA15',
    discountPercent: 15,
    description: '15% de desconto especial',
  },
];

// ─── Opções de Frete ─────────────────────────────────────────────────────────

const SHIPPING_OPTIONS = [
  {
    id: 'economica',
    name: 'Entrega Econômica',
    description: 'Melhor custo-benefício com rastreio padrão',
    price: 18.9,
    deliveryDays: '5 a 8 dias úteis',
  },
  {
    id: 'normal',
    name: 'Entrega Convencional',
    description: 'Transportadora parceira com seguro total',
    price: 26.5,
    deliveryDays: '3 a 5 dias úteis',
  },
  {
    id: 'expressa',
    name: 'Aura Express VIP',
    description: 'Entrega prioritária e embalagem especial para presente',
    price: 39.9,
    deliveryDays: '1 a 2 dias úteis',
  },
];

// ─── Execução do Seed ─────────────────────────────────────────────────────────

function seedProducts() {
  const count = (db.prepare('SELECT COUNT(*) as c FROM products').get() as { c: number }).c;
  if (count > 0) {
    console.log(`⏭  Produtos já existem (${count} registros). Pulando seed de produtos.`);
    return;
  }

  const insert = db.prepare(`
    INSERT INTO products (id, name, slug, description, price, old_price, images, sizes, colors,
      category, stock, rating, reviews, featured, is_new, details)
    VALUES (@id, @name, @slug, @description, @price, @oldPrice, @images, @sizes, @colors,
      @category, @stock, @rating, @reviews, @featured, @isNew, @details)
  `);

  const insertMany = db.transaction(() => {
    for (const p of PRODUCTS) {
      insert.run({
        ...p,
        images: JSON.stringify(p.images),
        sizes: JSON.stringify(p.sizes),
        colors: JSON.stringify(p.colors),
        featured: p.featured ? 1 : 0,
        isNew: p.isNew ? 1 : 0,
        details: p.details ? JSON.stringify(p.details) : null,
      });
    }
  });

  insertMany();
  console.log(`✅ ${PRODUCTS.length} produtos inseridos.`);
}

function seedCategories() {
  const count = (db.prepare('SELECT COUNT(*) as c FROM categories').get() as { c: number }).c;
  if (count > 0) {
    console.log(`⏭  Categorias já existem (${count} registros). Pulando seed de categorias.`);
    return;
  }

  const insert = db.prepare(`
    INSERT INTO categories (id, name, slug, description, image, is_active, item_count)
    VALUES (@id, @name, @slug, @description, @image, @isActive, @itemCount)
  `);

  const insertMany = db.transaction(() => {
    for (const c of CATEGORIES) {
      insert.run({ ...c, isActive: c.isActive ? 1 : 0, itemCount: c.itemCount });
    }
  });

  insertMany();
  console.log(`✅ ${CATEGORIES.length} categorias inseridas.`);
}

function seedCoupons() {
  const count = (db.prepare('SELECT COUNT(*) as c FROM coupons').get() as { c: number }).c;
  if (count > 0) {
    console.log(`⏭  Cupons já existem (${count} registros). Pulando seed de cupons.`);
    return;
  }

  const insert = db.prepare(`
    INSERT INTO coupons (code, discount_percent, description)
    VALUES (@code, @discountPercent, @description)
  `);

  const insertMany = db.transaction(() => {
    for (const c of COUPONS) {
      insert.run(c);
    }
  });

  insertMany();
  console.log(`✅ ${COUPONS.length} cupons inseridos.`);
}

function seedShippingOptions() {
  const count = (db.prepare('SELECT COUNT(*) as c FROM shipping_options').get() as { c: number })
    .c;
  if (count > 0) {
    console.log(
      `⏭  Opções de frete já existem (${count} registros). Pulando seed de frete.`
    );
    return;
  }

  const insert = db.prepare(`
    INSERT INTO shipping_options (id, name, description, price, delivery_days)
    VALUES (@id, @name, @description, @price, @deliveryDays)
  `);

  const insertMany = db.transaction(() => {
    for (const s of SHIPPING_OPTIONS) {
      insert.run(s);
    }
  });

  insertMany();
  console.log(`✅ ${SHIPPING_OPTIONS.length} opções de frete inseridas.`);
}

console.log('🌱 Iniciando seed do banco de dados...');
seedProducts();
seedCategories();
seedCoupons();
seedShippingOptions();
console.log('✅ Seed concluído!');
