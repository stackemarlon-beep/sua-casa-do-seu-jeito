// ===== APP.JS - Página Principal (Modelo Afiliados) =====

document.addEventListener('DOMContentLoaded', () => {
    renderCategorias();
    renderProdutos();
    setupFilters();
    setupSearch();
    setupModal();
    setupMobileMenu();
});

// ===== RENDERIZAR CATEGORIAS =====
function renderCategorias() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = CATEGORIAS.map(cat => `
        <div class="category-card" data-category="${cat.id}">
            <i class="${cat.icone}"></i>
            <h3>${cat.nome}</h3>
            <p>${cat.desc}</p>
        </div>
    `).join('');

    grid.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const catId = card.dataset.category;
            filtrarProdutos(catId);

            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            const btn = document.querySelector(`.filter-btn[data-category="${catId}"]`);
            if (btn) btn.classList.add('active');

            document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ===== RENDERIZAR PRODUTOS =====
function renderProdutos(produtosFiltrados = null) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const produtos = produtosFiltrados || getProdutos();

    if (produtos.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
                <p>Nenhum produto encontrado</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = produtos.map(produto => {
        const plat = getPlataforma(produto.plataforma);
        const imagemHTML = produto.imagem
            ? `<img src="${sanitizeURL(produto.imagem)}" alt="${escapeHTML(produto.nome)}">`
            : `<i class="fas fa-image placeholder-icon"></i>`;
        const badgeHTML = produto.badge
            ? `<span class="badge">${escapeHTML(produto.badge)}</span>`
            : '';

        return `
            <div class="product-card" data-id="${produto.id}">
                <div class="product-image">
                    ${imagemHTML}
                    ${badgeHTML}
                </div>
                <div class="product-info">
                    <div class="product-top-row">
                        <span class="product-category">${escapeHTML(getCategoryName(produto.categoria))}</span>
                        <span class="platform-badge" style="background: ${plat.cor};">
                            <i class="${plat.icone}"></i> ${escapeHTML(plat.nome)}
                        </span>
                    </div>
                    <h3 class="product-name">${escapeHTML(produto.nome)}</h3>
                    <div class="product-price">
                        <span class="price">${formatarPreco(produto.preco)}</span>
                    </div>
                    <div class="product-actions">
                        <a href="${produto.linkAfiliado ? sanitizeURL(produto.linkAfiliado) : '#'}" 
                           class="btn btn-primary btn-sm btn-buy" 
                           data-id="${produto.id}"
                           ${produto.linkAfiliado ? 'target="_blank" rel="noopener noreferrer"' : ''}
                           onclick="${!produto.linkAfiliado ? 'event.preventDefault(); abrirModal(' + produto.id + ')' : ''}">
                            <i class="fas fa-external-link-alt"></i> Comprar
                        </a>
                        <button class="btn btn-outline btn-sm btn-view" data-id="${produto.id}">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Eventos
    grid.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = Number(btn.dataset.id);
            abrirModal(id);
        });
    });

    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Não abrir modal se clicou no botão de comprar
            if (e.target.closest('.btn-buy')) return;
            const id = Number(card.dataset.id);
            abrirModal(id);
        });
    });
}

// ===== FILTROS =====
function setupFilters() {
    const container = document.getElementById('filterButtons');
    if (!container) return;

    container.innerHTML = CATEGORIAS.map(cat =>
        `<button class="filter-btn" data-category="${cat.id}">${escapeHTML(cat.nome)}</button>`
    ).join('');

    const allBtns = document.querySelectorAll('.filter-btn');
    allBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            allBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtrarProdutos(btn.dataset.category);
        });
    });
}

function filtrarProdutos(categoria) {
    const produtos = getProdutos();
    if (categoria === 'todos') {
        renderProdutos(produtos);
    } else {
        renderProdutos(produtos.filter(p => p.categoria === categoria));
    }
}

// ===== BUSCA =====
function setupSearch() {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    if (!input) return;

    const executarBusca = () => {
        const termo = input.value.trim().toLowerCase();
        if (!termo) {
            renderProdutos();
            return;
        }
        const produtos = getProdutos();
        const filtrados = produtos.filter(p =>
            p.nome.toLowerCase().includes(termo) ||
            p.descricao.toLowerCase().includes(termo) ||
            p.categoria.toLowerCase().includes(termo)
        );
        renderProdutos(filtrados);
        document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    };

    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') executarBusca();
    });
    if (btn) btn.addEventListener('click', executarBusca);
}

// ===== MODAL =====
function setupModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('modalClose');
    if (!modal) return;

    closeBtn.addEventListener('click', () => fecharModal());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });
}

function abrirModal(produtoId) {
    const produtos = getProdutos();
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const plat = getPlataforma(produto.plataforma);

    const modalImg = document.getElementById('modalImage');
    const modalImageDiv = document.querySelector('.modal-image');

    if (produto.imagem) {
        modalImg.src = sanitizeURL(produto.imagem);
        modalImg.alt = produto.nome;
        modalImg.style.display = 'block';
    } else {
        modalImg.style.display = 'none';
        modalImageDiv.innerHTML = '<i class="fas fa-image" style="font-size:5rem;color:#ccc;"></i>';
    }

    document.getElementById('modalCategory').textContent = getCategoryName(produto.categoria);
    document.getElementById('modalName').textContent = produto.nome;
    document.getElementById('modalDescription').textContent = produto.descricao;
    document.getElementById('modalPrice').textContent = formatarPreco(produto.preco);

    // Plataforma
    document.getElementById('modalPlatform').innerHTML = `
        <span class="platform-badge-lg" style="background: ${plat.cor};">
            <i class="${plat.icone}"></i> Disponível na ${escapeHTML(plat.nome)}
        </span>
    `;

    // Botão de compra
    const buyBtn = document.getElementById('modalBuyBtn');
    if (produto.linkAfiliado) {
        buyBtn.href = sanitizeURL(produto.linkAfiliado);
        buyBtn.innerHTML = `<i class="${plat.icone}"></i> Comprar na ${escapeHTML(plat.nome)}`;
        buyBtn.style.background = plat.cor;
        buyBtn.onclick = null;
    } else {
        buyBtn.href = '#';
        buyBtn.innerHTML = '<i class="fas fa-clock"></i> Link em breve';
        buyBtn.style.background = '#999';
        buyBtn.onclick = (e) => {
            e.preventDefault();
            mostrarToast('Link de compra será adicionado em breve!');
        };
    }

    document.getElementById('productModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    document.getElementById('productModal').classList.remove('show');
    document.body.style.overflow = '';

    const modalImageDiv = document.querySelector('.modal-image');
    if (!modalImageDiv.querySelector('img')) {
        modalImageDiv.innerHTML = '<img id="modalImage" src="" alt="">';
    }
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => menu.classList.toggle('show'));
}

// ===== TOAST =====
function mostrarToast(mensagem) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== UTILIDADES =====
function getCategoryName(catId) {
    const cat = CATEGORIAS.find(c => c.id === catId);
    return cat ? cat.nome : catId;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function sanitizeURL(url) {
    if (!url) return '';
    try {
        const parsed = new URL(url, window.location.origin);
        if (['http:', 'https:'].includes(parsed.protocol)) {
            return url;
        }
    } catch {
        if (/^[a-zA-Z0-9_.\/\-]+$/.test(url)) {
            return url;
        }
    }
    return '';
}
