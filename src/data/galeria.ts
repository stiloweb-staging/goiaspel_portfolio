/**
 * Portfólio de produtos — fotografias reais migradas do site atual
 * (/site/fotos/produtos/...). Resolução original ~375 px: exibidas em miniatura
 * e ampliadas no máximo ao tamanho nativo. Substituir por nova sessão de fotos (ver pendências).
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/galeria/*/*.png', { eager: true });

export type Categoria = 'flexografia' | 'policromia' | 'especiais' | 'acessorios';

export const categorias: { id: Categoria; nome: string }[] = [
  { id: 'flexografia', nome: 'Flexografia' },
  { id: 'policromia', nome: 'Policromia' },
  { id: 'especiais', nome: 'Caixas especiais' },
  { id: 'acessorios', nome: 'Acessórios' },
];

const legendas: Record<Categoria, string[]> = {
  flexografia: [
    'Caixa kraft Zupp Amaciante impressa em azul e vermelho',
    'Caixa branca Star Pel com aviso “cuidado frágil”',
    'Caixa branca impressa em azul, com abas abertas',
    'Caixa kraft com impressão em vermelho e azul',
    'Caixa vertical kraft Fruit Soy',
    'Caixa kraft aberta com frascos acomodados',
    'Caixa branca com faixas de identificação em azul',
    'Caixa octogonal branca com a marca Goiaspel',
    'Caixa de pizza branca com a marca Goiaspel',
    'Coletor de perfurocortantes amarelo',
    'Caixa branca para torta de sorvete Sorvetto',
    'Caixa branca para sorvete com impressão em azul e vermelho',
    'Caixa kraft e laranja Gerenciar',
    'Expositor de balcão Diário da Manhã',
    'Caixa branca Lival impressa em vermelho e preto',
    'Bandeja kraft com recortes',
    'Bandeja kraft com a marca Scania',
    'Caixa branca Leve com alça recortada',
    'Caixa kraft com padrão quadriculado',
    'Caixa kraft para tomates',
    'Bandeja vinho Empório Sírio Libanês',
    'Caixa Colombina com padrão geométrico',
    'Expositor kraft com impressão em uma cor',
    'Expositor em formato de cesto Approm',
    'Caixa Frigorífico Goiás com ilustrações em preto',
  ],
  policromia: [
    'Caixa Imperial Tintas com impressão fotográfica',
    'Expositor Viva Bem com impressão colorida',
    'Caixa Cifer para discos de embreagem',
    'Caixa Pró Bolo em vermelho e branco',
    'Expositor hexagonal para lâmpadas Avant',
    'Caixa Bosch Service Bomdisa com foto de caminhão',
    'Caixa com alça Europa Pães para bolos e tortas',
    'Caixa Madri Pães em vermelho',
    'Caixa com alça para garrafas de malte',
    'Caixa preta com alça para garrafas de malte',
    'Caixa Mundial Panificadora',
    'Caixa vertical azul com imagem de garrafa',
    'Caixa de pizza octogonal Marista',
    'Caixa de pizza octogonal com foto de pizza',
    'Caixa de pizza Vecchia Pizzeria',
    'Caixa Polos com padrão de marca',
    'Caixa ilustrada com a marca Goiaspel',
    'Caixa com janela para acessórios Sicmol',
  ],
  especiais: [
    'Caixa natalina vermelha “Feliz Natal”',
    'Caixa “Boas Festas” com sinos dourados',
    'Caixa octogonal kraft com fitas',
    'Caixa-armário para roupas com cabideiro',
    'Detalhe de chapa de papelão ondulado em corte',
    'Caixa com janela transparente Sicmol (outro ângulo)',
    'Expositor hexagonal Avant (outro ângulo)',
  ],
  acessorios: [
    'Divisória colmeia de papelão',
    'Chapa lisa de papelão ondulado',
    'Chapas de papelão empilhadas',
    'Calços e cantoneiras de papelão dobrado',
  ],
};

export interface ItemGaleria { src: ImageMetadata; alt: string; cat: Categoria; n: number }

export const galeria: ItemGaleria[] = categorias.flatMap(({ id }) =>
  legendas[id].map((alt, i) => {
    const mod = files[`../assets/galeria/${id}/${i + 1}.png`];
    if (!mod) throw new Error(`Imagem ausente: galeria/${id}/${i + 1}.png`);
    return { src: mod.default, alt, cat: id, n: i + 1 };
  }),
);
