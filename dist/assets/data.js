// All project images were extracted from the supplied previous-site PDF.
// Add only categories supported by the original work. Empty filters are intentional.
export const contact = {
  email: 'contato@jeremiasthomaz.com',
  phone: '5511958172367',
  phoneLabel: '(11) 95817-2367',
  message: 'Olá, Jeremias! Gostaria de conversar sobre um projeto.',
  instagram: '',
  behance: '',
};

export const categories = ['Todos', 'Identidade Visual', 'Rebranding', 'Design Gráfico', 'Motion Design', 'Vídeo', 'Web Design'];

export const projects = [
  { id: 'naturalle', title: 'Naturalle', category: 'Rebranding', categories: ['Rebranding', 'Identidade Visual'], image: './assets/naturalle.webp', alt: 'Aplicação da marca Naturalle em uma bolsa de tecido', description: 'Rebranding e aplicações de marca.', featured: true },
  { id: 'design-360', title: 'Design 360', category: 'Web Design', categories: ['Web Design'], image: './assets/design-360.webp', alt: 'Site Design 360 apresentado em um notebook com iluminação verde', description: 'Projeto de design para a web.', featured: true },
  { id: 'sajotur', title: 'Sajotur', category: 'Identidade Visual', categories: ['Identidade Visual'], image: './assets/sajotur.webp', alt: 'Identidade visual Sajotur com símbolo de avião branco em fundo verde', description: 'Identidade visual da São João Turismo.' },
  { id: 'konekta', title: 'Konekta', category: 'Identidade Visual', categories: ['Identidade Visual'], image: './assets/konekta.webp', alt: 'Marca Konekta em branco e verde sobre fundo escuro', description: 'Projeto de identidade visual.' },
  { id: 'mes-portal', title: 'Mês Portal', category: 'Design Gráfico', categories: ['Design Gráfico'], image: './assets/mes-portal.webp', alt: 'Peça visual do congresso Portal em azul, verde e branco', description: 'Projeto visual para o congresso Portal.' },
  { id: 'leatto', title: 'Leatto', category: 'Identidade Visual', categories: ['Identidade Visual'], image: './assets/leatto.webp', alt: 'Marca Leatto Consultoria Imobiliária sobre fundo verde escuro', description: 'Identidade visual para consultoria imobiliária.' },
];

export const testimonials = [
  { name: 'Nextage', service: 'ID Completa', initial: 'N', quote: 'Entrega impecável, com uma identidade visual moderna, estratégica e pronta para escalar.' },
  { name: 'Naturalle', service: 'Rebranding', initial: 'n', quote: 'Resultado leve, harmônico e fiel à essência da marca, com alto nível de acabamento e entrega 100% profissional.' },
  { name: 'Leatto', service: 'ID Completa', initial: 'L', quote: 'Resultado extremamente profissional, com uma marca sofisticada e alinhada ao nosso posicionamento.' },
];

export const tools = [
  { short: 'Ps', name: 'Photoshop', fullName: 'Adobe Photoshop', color: '#66b9ff' },
  { short: 'Ai', name: 'Illustrator', fullName: 'Adobe Illustrator', color: '#ffb45f' },
  { short: 'Pr', name: 'Premiere Pro', fullName: 'Adobe Premiere Pro', color: '#b4a1ff' },
  { short: 'Ae', name: 'After Effects', fullName: 'Adobe After Effects', color: '#b4a1ff' },
  { short: 'Cc', name: 'CapCut', fullName: 'CapCut', color: '#f4f4f6' },
  { short: 'Fi', name: 'Figma', fullName: 'Figma', color: '#ff877a' },
  { short: 'Cd', name: 'CorelDRAW', fullName: 'CorelDRAW', color: '#85ce9c' },
];
