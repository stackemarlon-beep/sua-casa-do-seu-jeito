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
        id: 17,
        nome: 'Kit 2 Pote de Mantimentos Quadrado Acrílico Slim 1.450 Litros Tampa com Trava',
        categoria: 'cozinha',
        preco: 40.38,
        descricao: 'ORGANIZE SUA DISPENSA E SEUS ALIMENTOS DE FORMA PRÁTICA E ELEGANTE! O Pote Hermético Slim da Plasnorthon é feito em acrílico, bastante espaçoso para armazenar diversos tipos de mantimentos. Por ser hermético conserva o alimento por muito mais tempo. Empilhável e transparente, deixa o alimento visível e protegido pela vedação. Tampa plástica (BPA Free) com 2 travas para melhor segurança.',
        imagem: 'https://m.media-amazon.com/images/I/71bNnfg+y6L._AC_SL1500_.jpg',
        destaque: true,
        badge: 'Oferta',
        plataforma: 'amazon',
        linkAfiliado: 'https://www.amazon.com.br/Mantimentos-Quadrado-Acr%C3%ADlico-Litros-Tampa/dp/B0CB1ZZ1HW?pd_rd_w=N8uRz&content-id=amzn1.sym.93d9e842-b51e-4d42-9d31-198e159c21e4&pf_rd_p=93d9e842-b51e-4d42-9d31-198e159c21e4&pf_rd_r=ZK690MV9P2NGBACS3CVD&pd_rd_wg=RZYrM&pd_rd_r=500724bb-e0f8-4718-a997-9b8d0027a83a&pd_rd_i=B0CB1ZZ1HW&psc=1&linkCode=ll2&tag=suacasadose04-20&linkId=64082addc555b3d4e09648c9dcffeb59&ref_=as_li_ss_tl'
    },
    {
        id: 18,
        nome: 'Jogo de Talheres Faqueiro Inox 24 Peças Búzios Tramontina',
        categoria: 'cozinha',
        preco: 63.80,
        descricao: 'Faqueiro em aço inox resistente com 24 peças, design clássico e sofisticado, ideal para refeições em família e com amigos. Conjunto inclui facas, colheres de chá, colheres de mesa e garfos em acabamento prata, estilo moderno e alto brilho. Lâminas com tratamento térmico para corte preciso, podem ser lavadas na máquina de lavar louças.',
        imagem: 'https://m.media-amazon.com/images/I/61NlXehlnBL._AC_SL1094_.jpg',
        destaque: true,
        badge: 'Mais Vendido',
        plataforma: 'amazon',
        linkAfiliado: 'https://amzn.to/4um6rQk'
    },
    {
        id: 19,
        nome: 'Kit Banheiro Completo Acessórios De Bambu Moderno Lixeira Com Tampa Escova Saboneteira Cor Preto Irsina',
        categoria: 'banheiro',
        preco: 78.99,
        descricao: 'Feito de bambu e plástico. Design elegante e contemporâneo que combina detalhes em bambu. Conjunto completo com 6 peças essenciais para o banheiro. Escova sanitária com cabo em aço inox que não enferruja. Saboneteira líquida com pump de inox para dosagem precisa. Lixeira com tampa giratória.',
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_2X_759793-MLA106843198044_022026-F.webp',
        destaque: true,
        badge: 'Novo',
        plataforma: 'mercadolivre',
        linkAfiliado: 'https://meli.la/2HfS6VA'
    },
    {
        id: 20,
        nome: 'Coberdrom Casal Queen Size Sherpa Cobertor Edredom Inverno Pele Lã Carneiro Super Macio',
        categoria: 'textil',
        preco: 114.98,
        descricao: 'Tamanho Queen 2.4x2.2m. Desenho liso, 100% poliéster. Tecido externo de 200 fios com enchimento acolchoado. Dupla face, hipoalergênico. Apto para máquinas de lavar. Maior conforto durante as suas horas de descanso.',
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_2X_811551-MLA99938959445_112025-F.webp',
        destaque: true,
        badge: 'Mais Vendido',
        plataforma: 'mercadolivre',
        linkAfiliado: 'https://meli.la/2YzaK1K'
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
