// ===== DADOS INICIAIS DA LOJA - MODELO AFILIADOS =====

// Plataformas de afiliados
const PLATAFORMAS = [
    { id: 'shopee', nome: 'Shopee', icone: 'fas fa-store', cor: '#EE4D2D' },
    { id: 'amazon', nome: 'Amazon', icone: 'fab fa-amazon', cor: '#FF9900' },
    { id: 'magalu', nome: 'Magalu', icone: 'fas fa-shopping-bag', cor: '#0086FF' },
    { id: 'mercadolivre', nome: 'Mercado Livre', icone: 'fas fa-handshake', cor: '#FFE600' },
    { id: 'tiktok', nome: 'TikTok Shop', icone: 'fab fa-tiktok', cor: '#000000' },
    { id: 'outro', nome: 'Outro', icone: 'fas fa-link', cor: '#666666' }
];

// Categorias disponíveis
const CATEGORIAS = [
    { id: 'decoracao', nome: 'Decoração', icone: 'fas fa-paint-roller', desc: 'Quadros, vasos, espelhos' },
    { id: 'cozinha', nome: 'Cozinha', icone: 'fas fa-utensils', desc: 'Utensílios e acessórios' },
    { id: 'banheiro', nome: 'Banheiro', icone: 'fas fa-bath', desc: 'Organizadores e decoração' },
    { id: 'organizacao', nome: 'Organização', icone: 'fas fa-box', desc: 'Caixas, cestos, prateleiras' },
    { id: 'iluminacao', nome: 'Iluminação', icone: 'fas fa-lightbulb', desc: 'Luminárias e abajures' },
    { id: 'textil', nome: 'Têxtil', icone: 'fas fa-blanket', desc: 'Almofadas, cortinas, tapetes' }
];

// Produtos iniciais de exemplo
const PRODUTOS_INICIAIS = [
    {
        id: 1,
        nome: 'Kit 3 Quadros Decorativos Minimalistas',
        categoria: 'decoracao',
        preco: 59.90,
        descricao: 'Kit com 3 quadros decorativos com design minimalista. Moldura em MDF, impressão de alta qualidade. Tamanho 30x40cm cada.',
        imagem: '',
        destaque: true,
        badge: 'Novo',
        plataforma: 'shopee',
        linkAfiliado: ''
    },
    {
        id: 2,
        nome: 'Vaso Decorativo Cerâmica Branco',
        categoria: 'decoracao',
        preco: 42.90,
        descricao: 'Vaso decorativo em cerâmica branca. Ideal para flores artificiais ou naturais. Altura 25cm.',
        imagem: '',
        destaque: true,
        badge: '',
        plataforma: 'shopee',
        linkAfiliado: ''
    },
    {
        id: 3,
        nome: 'Espelho Redondo com Moldura Dourada',
        categoria: 'decoracao',
        preco: 78.90,
        descricao: 'Espelho redondo com moldura metálica dourada. Diâmetro 40cm. Perfeito para hall de entrada ou banheiro.',
        imagem: '',
        destaque: true,
        badge: 'Popular',
        plataforma: 'amazon',
        linkAfiliado: ''
    },
    {
        id: 4,
        nome: 'Jogo de Talheres Inox 24 Peças',
        categoria: 'cozinha',
        preco: 56.90,
        descricao: 'Jogo completo de talheres em aço inox com 24 peças. Inclui facas, garfos, colheres de sopa e colheres de sobremesa.',
        imagem: '',
        destaque: true,
        badge: 'Mais Vendido',
        plataforma: 'magalu',
        linkAfiliado: ''
    },
    {
        id: 5,
        nome: 'Conjunto 6 Potes Herméticos Cozinha',
        categoria: 'cozinha',
        preco: 49.90,
        descricao: 'Kit com 6 potes herméticos de plástico resistente com tampa. Ideal para organizar mantimentos. Diversos tamanhos.',
        imagem: '',
        destaque: false,
        badge: '',
        plataforma: 'shopee',
        linkAfiliado: ''
    },
    {
        id: 6,
        nome: 'Escorredor de Louças Inox 2 Andares',
        categoria: 'cozinha',
        preco: 74.90,
        descricao: 'Escorredor de louças em aço inox com 2 andares e bandeja coletora. Comporta até 20 pratos.',
        imagem: '',
        destaque: false,
        badge: '',
        plataforma: 'amazon',
        linkAfiliado: ''
    },
    {
        id: 7,
        nome: 'Kit Organizador Banheiro 4 Peças',
        categoria: 'banheiro',
        preco: 47.90,
        descricao: 'Kit completo para banheiro: porta-escova, saboneteira líquida, porta-algodão e bandeja. Material cerâmico.',
        imagem: '',
        destaque: true,
        badge: 'Novo',
        plataforma: 'mercadolivre',
        linkAfiliado: ''
    },
    {
        id: 8,
        nome: 'Tapete Banheiro Antiderrapante',
        categoria: 'banheiro',
        preco: 33.90,
        descricao: 'Tapete de banheiro com base antiderrapante. Tecido macio e absorvente. Tamanho 50x80cm.',
        imagem: '',
        destaque: false,
        badge: '',
        plataforma: 'shopee',
        linkAfiliado: ''
    },
    {
        id: 9,
        nome: 'Cesto Organizador Seagrass Natural',
        categoria: 'organizacao',
        preco: 54.90,
        descricao: 'Cesto decorativo em fibra natural seagrass. Perfeito para organizar revistas, mantas ou brinquedos. Tamanho médio.',
        imagem: '',
        destaque: true,
        badge: '',
        plataforma: 'amazon',
        linkAfiliado: ''
    },
    {
        id: 10,
        nome: 'Prateleira Flutuante MDF 60cm',
        categoria: 'organizacao',
        preco: 37.90,
        descricao: 'Prateleira flutuante em MDF com acabamento liso. 60x15cm. Suporta até 5kg. Inclui kit de fixação.',
        imagem: '',
        destaque: false,
        badge: '',
        plataforma: 'magalu',
        linkAfiliado: ''
    },
    {
        id: 11,
        nome: 'Luminária de Mesa LED Articulada',
        categoria: 'iluminacao',
        preco: 64.90,
        descricao: 'Luminária de mesa com LED integrado e braço articulado. 3 níveis de intensidade. Base estável com porta-caneta.',
        imagem: '',
        destaque: true,
        badge: 'Oferta',
        plataforma: 'shopee',
        linkAfiliado: ''
    },
    {
        id: 12,
        nome: 'Cordão de Luzes LED 10m Decorativo',
        categoria: 'iluminacao',
        preco: 29.90,
        descricao: 'Cordão de luzes LED com 10 metros e 100 lâmpadas. Luz branca quente. Perfeito para decorar quartos e varandas.',
        imagem: '',
        destaque: false,
        badge: '',
        plataforma: 'shopee',
        linkAfiliado: ''
    },
    {
        id: 13,
        nome: 'Kit 4 Capas de Almofada 45x45cm',
        categoria: 'textil',
        preco: 46.90,
        descricao: 'Kit com 4 capas de almofada decorativas. Tecido suede macio, fecho com zíper invisível. Estampas modernas.',
        imagem: '',
        destaque: true,
        badge: '',
        plataforma: 'shopee',
        linkAfiliado: ''
    },
    {
        id: 14,
        nome: 'Tapete Sala Geométrico 1,5x2m',
        categoria: 'textil',
        preco: 97.90,
        descricao: 'Tapete para sala com estampa geométrica moderna. Material antialérgico, fácil de limpar. Tamanho 1,5 x 2 metros.',
        imagem: '',
        destaque: true,
        badge: 'Popular',
        plataforma: 'amazon',
        linkAfiliado: ''
    },
    {
        id: 15,
        nome: 'Suporte Parede Plantas Kit 3 Vasos',
        categoria: 'decoracao',
        preco: 58.90,
        descricao: 'Kit com 3 suportes de parede para vasos de plantas. Metal preto com vasos plásticos inclusos. Design moderno.',
        imagem: '',
        destaque: false,
        badge: '',
        plataforma: 'mercadolivre',
        linkAfiliado: ''
    },
    {
        id: 16,
        nome: 'Organizador Maquiagem Acrílico',
        categoria: 'organizacao',
        preco: 39.90,
        descricao: 'Organizador de maquiagem em acrílico transparente. Múltiplos compartimentos e gaveta. Tamanho 23x13x18cm.',
        imagem: '',
        destaque: false,
        badge: '',
        plataforma: 'shopee',
        linkAfiliado: ''
    }
];

// ===== FUNÇÕES DE GERENCIAMENTO DE DADOS =====

function getProdutos() {
    const saved = localStorage.getItem('loja_produtos_v2');
    if (saved) {
        return JSON.parse(saved);
    }
    localStorage.setItem('loja_produtos_v2', JSON.stringify(PRODUTOS_INICIAIS));
    return PRODUTOS_INICIAIS;
}

function salvarProdutos(produtos) {
    localStorage.setItem('loja_produtos_v2', JSON.stringify(produtos));
}

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function gerarIdProduto() {
    const produtos = getProdutos();
    if (produtos.length === 0) return 1;
    return Math.max(...produtos.map(p => p.id)) + 1;
}

function getPlataforma(plataformaId) {
    return PLATAFORMAS.find(p => p.id === plataformaId) || PLATAFORMAS[PLATAFORMAS.length - 1];
}
