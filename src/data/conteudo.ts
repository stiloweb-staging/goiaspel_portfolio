/**
 * Conteúdo editorial estruturado. Cada afirmação factual aponta para a sua fonte
 * (PDF = apresentação 2026, página; SITE = site atual, URL) e o status de validação.
 * Status "pendente" exibe um selo em homologação e desativa a animação de contagem.
 */
import type { ImageMetadata } from 'astro';

import flexoComposicao from '../assets/fotos/flexo-composicao.jpg';
import flexoLival from '../assets/fotos/flexo-lival.jpg';
import flexoEmporio from '../assets/fotos/flexo-emporio.jpg';
import flexoApprom from '../assets/fotos/flexo-approm.jpg';
import poliComposicao from '../assets/fotos/poli-composicao.jpg';
import poliAvant from '../assets/fotos/poli-avant.jpg';
import poliSicmol from '../assets/fotos/poli-sicmol.jpg';
import poliMadri from '../assets/fotos/poli-madripaes.jpg';

import piracanjuba from '../assets/clientes/piracanjuba.png';
import tramontina from '../assets/clientes/tramontina.png';
import coty from '../assets/clientes/coty.png';
import wepink from '../assets/clientes/wepink.png';
import hypera from '../assets/clientes/hypera.png';
import lafruit from '../assets/clientes/lafruit.png';
import zupp from '../assets/clientes/zupp.png';
import trilhas from '../assets/clientes/trilhas-da-amazonia.png';
import linea from '../assets/clientes/linea.png';
import pizzaCesar from '../assets/clientes/pizza-cesar.png';
import saccaria from '../assets/clientes-site/saccaria.png';
import windowBlue from '../assets/clientes-site/window_blue.png';
import fastAcai from '../assets/clientes-site/fast-acai.png';
import maxvinil from '../assets/clientes-site/maxvinil.png';
import gravia from '../assets/clientes-site/gravia.png';
import padariaMoreira from '../assets/clientes-site/padaria_moreira.png';
import grafigel from '../assets/clientes-site/grafigel.png';
import zuppani from '../assets/clientes-site/zuppani.png';

export type Status = 'validado' | 'pendente';

export interface Indicador {
  id: string;
  valor: number;
  prefixo?: string;
  sufixo?: string;
  formato?: 'milhar';
  rotulo: string;
  detalhe?: string;
  fonte: string;
  status: Status;
  nota?: string;
}

export const indicadores: Indicador[] = [
  {
    id: 'area',
    valor: 11000,
    formato: 'milhar',
    sufixo: 'm²',
    rotulo: 'de parque fabril',
    detalhe: 'Sede própria em Goiânia desde 2015',
    fonte: 'PDF p. 2 e 6; SITE (início e /conheca-a-goiaspel…)',
    status: 'validado',
    nota: 'Mesmo valor nas duas fontes.',
  },
  {
    id: 'caixas',
    valor: 500,
    rotulo: 'caixas por minuto',
    detalhe: 'em até 3 cores (flexografia)',
    fonte: 'PDF p. 3 e 6 (site atual: 250)',
    status: 'pendente',
    nota: 'Confirmar se é capacidade nominal de uma linha ou do parque.',
  },
  {
    id: 'toneladas',
    valor: 1500,
    formato: 'milhar',
    sufixo: 't+',
    rotulo: 'de capacidade produtiva',
    detalhe: 'Capacidade produtiva instalada',
    fonte: 'PDF p. 6 (site atual: 900)',
    status: 'pendente',
    nota: 'O PDF não informa se é mensal ou anual. Não publicar com período presumido.',
  },
];

export interface Solucao {
  id: string;
  nome: string;
  tag: string;
  tagCor: 'blue' | 'green';
  resumo: string;
  beneficios: string[];
  aplicacao: string;
  imagem: ImageMetadata;
  alt: string;
  galeria: { src: ImageMetadata; alt: string }[];
  pendencia?: string;
}

export const solucoes: Solucao[] = [
  {
    id: 'flexografia',
    nome: 'Caixas em flexografia',
    tag: 'Até 3 cores',
    tagCor: 'blue',
    resumo:
      'Impressão direta no papelão ondulado. Ideal para grandes tiragens com agilidade e padronização.',
    beneficios: ['Alta produtividade', 'Padronização entre lotes', 'Produção em escala'],
    aplicacao: 'Embalagens de transporte, caixas de expedição, linhas de produto com alto giro.',
    imagem: flexoComposicao,
    alt: 'Quatro caixas de papelão impressas em flexografia sobre degraus de pedra: Star Pel, Zupp Amaciante, coletor de perfurocortantes amarelo e caixa Frigorífico Goiás.',
    galeria: [
      { src: flexoLival, alt: 'Caixa de papelão branca impressa em vermelho e preto com a marca Lival.' },
      { src: flexoEmporio, alt: 'Bandeja de papelão vinho com alças vazadas e a marca Empório Sírio Libanês.' },
      { src: flexoApprom, alt: 'Expositor de papelão kraft em formato de cesto com a marca Approm.' },
    ],
    pendencia: 'Limite de 3 cores: PDF p. 4 e FAQ do site atual.',
  },
  {
    id: 'policromia',
    nome: 'Caixas em policromia',
    tag: 'Reprodução fotográfica',
    tagCor: 'green',
    resumo:
      'Impressão de alta definição, com cores vibrantes e riqueza de detalhes. Embalagens que valorizam sua marca.',
    beneficios: ['Qualidade fotográfica', 'Acabamento sofisticado', 'Destaque no ponto de venda'],
    aplicacao: 'Embalagens de apresentação, produtos de varejo, kits e caixas promocionais.',
    imagem: poliComposicao,
    alt: 'Caixas de papelão em policromia: caixa de bolo Europa Pães com alça, caixa Mundial Panificadora, caixa Bosch Service Bomdisa e caixa Imperial Tintas.',
    galeria: [
      { src: poliAvant, alt: 'Expositor hexagonal de papelão impresso em policromia para lâmpadas Avant.' },
      { src: poliSicmol, alt: 'Caixa com janela transparente para acessórios em alumínio Sicmol.' },
      { src: poliMadri, alt: 'Caixa de papelão vermelha impressa com a marca Madri Pães.' },
    ],
  },
];

export const outrasSolucoes = [
  {
    id: 'especiais',
    nome: 'Caixas especiais',
    texto:
      'Formatos com corte e vinco, alças, janelas, expositores e caixas para kits — desenvolvidos a partir da necessidade do produto.',
  },
  {
    id: 'acessorios',
    nome: 'Acessórios de papelão',
    texto:
      'Divisórias, calços e componentes internos que protegem, organizam e estabilizam o produto dentro da caixa.',
  },
];

export const processo = [
  {
    n: '01',
    titulo: 'Entendimento',
    texto:
      'Nossa equipe comercial levanta o produto, as dimensões, o manuseio, a estocagem e o empilhamento. Sem medidas? Agendamos uma visita.',
    fonte: 'SITE /tire-suas-duvidas (perguntas 1 e 3)',
  },
  {
    n: '02',
    titulo: 'Desenvolvimento',
    texto:
      'Definimos estrutura, tipo de onda e papel. O setor de layout desenvolve a arte e a amostra para análise.',
    fonte: 'SITE /criacao-de-layout-e-amostras',
  },
  {
    n: '03',
    titulo: 'Validação',
    texto:
      'A amostra é testada e aprovada pelo cliente antes da produção, seguindo um procedimento para evitar falhas pós-produção.',
    fonte: 'SITE /criacao-de-layout-e-amostras; /tire-suas-duvidas (pergunta 3)',
  },
  {
    n: '04',
    titulo: 'Produção',
    texto:
      'Fabricação no parque de 11.000 m² em Goiânia, com controle de qualidade de impressão, matéria-prima, colagem e fechamento.',
    fonte: 'SITE /produtos-goiaspel…; PDF p. 2–3',
  },
  {
    n: '05',
    titulo: 'Acompanhamento',
    texto:
      'Depois da entrega, acompanhamos o desempenho das embalagens na operação e propomos melhorias.',
    fonte: 'PDF p. 9',
  },
];

export const segmentos = [
  { id: 'alimentos', nome: 'Alimentos', exemplo: 'Panificação, carnes, laticínios', imagem: poliMadri, pos: '50% 50%', alt: 'Caixa de papelão vermelha da Madri Pães.' },
  { id: 'saneantes', nome: 'Saneantes', exemplo: 'Limpeza e higiene', imagem: flexoComposicao, pos: '85% 15%', alt: 'Caixa kraft da Zupp Amaciante impressa em flexografia.' },
  { id: 'construcao', nome: 'Construção civil', exemplo: 'Tintas e acabamentos', imagem: poliComposicao, pos: '85% 85%', alt: 'Caixa Imperial Tintas em policromia.' },
  { id: 'automotivo', nome: 'Automotivo', exemplo: 'Peças e serviços', imagem: poliComposicao, pos: '0% 90%', alt: 'Caixa Bosch Service em policromia.' },
  { id: 'farmaceutico', nome: 'Farmacêutico e saúde', exemplo: 'Coletores e embalagens técnicas', imagem: flexoComposicao, pos: '10% 90%', alt: 'Coletor de perfurocortantes amarelo em papelão.' },
  { id: 'varejo', nome: 'Varejo e utilidades', exemplo: 'Expositores e caixas de apresentação', imagem: poliAvant, pos: '50% 50%', alt: 'Expositor de papelão para lâmpadas Avant.' },
] as const;
// Cosméticos e bebidas constam no site atual, mas não há fotografia de produto que os represente:
// mantidos apenas na lista textual de setores até haver material.
export const outrosSetores = ['Cosméticos', 'Bebidas'];

export const clientes = [
  { nome: 'Piracanjuba', logo: piracanjuba },
  { nome: 'Tramontina', logo: tramontina },
  { nome: 'Coty', logo: coty },
  { nome: 'We Pink', logo: wepink },
  { nome: 'Hypera Pharma', logo: hypera },
  { nome: 'La Fruit', logo: lafruit },
  { nome: 'Zupp', logo: zupp },
  { nome: 'Trilhas da Amazônia', logo: trilhas },
  { nome: 'Linea', logo: linea },
  { nome: 'Pizza Cesar', logo: pizzaCesar },
  // Constam apenas no site atual (imagens/clientes/). Mantidos para não reduzir a prova social.
  { nome: 'Zuppani', logo: zuppani },
  { nome: 'Empório Saccaria', logo: saccaria },
  { nome: 'Window Blue', logo: windowBlue },
  { nome: 'Fast Açaí', logo: fastAcai },
  { nome: 'Tintas Maxvinil', logo: maxvinil },
  { nome: 'Gravia', logo: gravia },
  { nome: 'Panificadora Moreira', logo: padariaMoreira },
  { nome: 'Grafigel', logo: grafigel },
];
/** Exibir as marcas fora de homologação somente após autorização formal de uso. */
export const CLIENTES_AUTORIZADOS = false;

export const praticasAmbientais = [
  {
    id: 'energia',
    titulo: 'Energia solar',
    texto:
      'Sistema fotovoltaico instalado na cobertura da fábrica reduz o consumo da rede elétrica e as emissões associadas.',
    fonte: 'PDF p. 7. O site atual diz “100% movida a energia solar” — não reproduzido sem medição.',
    status: 'validado' as Status,
  },
  {
    id: 'agua',
    titulo: 'Gestão da água',
    texto: 'A água utilizada no processo produtivo passa por tratamento e é reutilizada.',
    fonte: 'PDF p. 7; SITE /responsabilidade-ambiental (tratamento de efluentes).',
    status: 'pendente' as Status,
  },
  {
    id: 'aparas',
    titulo: 'Aparas de papelão',
    texto:
      'As aparas geradas na produção são reaproveitadas no processo ou destinadas à reciclagem por indústrias de papel.',
    fonte: 'PDF p. 7 (“100% reaproveitadas”); SITE /responsabilidade-ambiental.',
    status: 'pendente' as Status,
  },
];

export const historia = [
  { ano: '1992', texto: 'Fundação em Goiânia, como indústria pioneira de embalagens de papelão na região.' },
  { ano: '1997', texto: 'Ampliação da estrutura em novo endereço, com novas máquinas e mais capacidade.' },
  { ano: '2003', texto: 'Inauguração da primeira sede própria, com 3.000 m², no Setor Empresarial.' },
  { ano: '2015', texto: 'Novo parque fabril próprio de 11.000 m² — o grande marco da trajetória.' },
  { ano: 'Hoje', texto: 'Investimento contínuo em tecnologia, energia solar e assistência técnica ao cliente.' },
];
