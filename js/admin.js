// ===== ADMIN.JS - Painel Administrativo (Modelo Afiliados) =====

const ADMIN_SENHA = 'admin123';
let editandoId = null;

document.addEventListener('DOMContentLoaded', () => {
    setupLogin();
    setupMobileMenuAdmin();
});

// ===== LOGIN =====
function setupLogin() {
    const loginDiv = document.getElementById('adminLogin');
    const contentDiv = document.getElementById('adminContent');
    const loginBtn = document.getElementById('loginBtn');
    const passInput = document.getElementById('adminPassword');

    if (sessionStorage.getItem('admin_logado') === 'true') {
        loginDiv.style.display = 'none';
        contentDiv.style.display = 'block';
        initAdmin();
        return;
    }

    loginBtn.addEventListener('click', tentarLogin);
    passInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') tentarLogin();
    });

    function tentarLogin() {
        if (passInput.value === ADMIN_SENHA) {
            sessionStorage.setItem('admin_logado', 'true');
            loginDiv.style.display = 'none';
            contentDiv.style.display = 'block';
            initAdmin();
        } else {
            document.getElementById('loginError').style.display = 'block';
            passInput.value = '';
            passInput.focus();
        }
    }
}

// ===== INIT =====
function initAdmin() {
    renderStats();
    renderSelects();
    renderTabelaProdutos();
    setupFormulario();
}

// ===== STATS =====
function renderStats() {
    const container = document.getElementById('adminStats');
    const produtos = getProdutos();
    const comLink = produtos.filter(p => p.linkAfiliado).length;
    const semLink = produtos.length - comLink;

    // Contar plataformas
    const plataformasUsadas = new Set(produtos.map(p => p.plataforma)).size;

    container.innerHTML = `
        <div class="stat-card">
            <i class="fas fa-boxes"></i>
            <div class="stat-value">${produtos.length}</div>
            <div class="stat-label">Total de Produtos</div>
        </div>
        <div class="stat-card">
            <i class="fas fa-link" style="color: var(--primary-light);"></i>
            <div class="stat-value">${comLink}</div>
            <div class="stat-label">Com Link de Afiliado</div>
        </div>
        <div class="stat-card">
            <i class="fas fa-exclamation-triangle" style="color: var(--accent);"></i>
            <div class="stat-value">${semLink}</div>
            <div class="stat-label">Sem Link (pendentes)</div>
        </div>
        <div class="stat-card">
            <i class="fas fa-store"></i>
            <div class="stat-value">${plataformasUsadas}</div>
            <div class="stat-label">Plataformas</div>
        </div>
    `;
}

// ===== SELECTS =====
function renderSelects() {
    const catSelect = document.getElementById('prodCategoria');
    CATEGORIAS.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = cat.nome;
        catSelect.appendChild(opt);
    });

    const platSelect = document.getElementById('prodPlataforma');
    PLATAFORMAS.forEach(plat => {
        const opt = document.createElement('option');
        opt.value = plat.id;
        opt.textContent = plat.nome;
        platSelect.appendChild(opt);
    });
}

// ===== FORMULÁRIO =====
function setupFormulario() {
    document.getElementById('saveProductBtn').addEventListener('click', salvarProduto);
    document.getElementById('cancelEditBtn').addEventListener('click', cancelarEdicao);
}

function salvarProduto() {
    const nome = document.getElementById('prodNome').value.trim();
    const categoria = document.getElementById('prodCategoria').value;
    const preco = Number(document.getElementById('prodPreco').value);
    const plataforma = document.getElementById('prodPlataforma').value;
    const linkAfiliado = document.getElementById('prodLink').value.trim();
    const descricao = document.getElementById('prodDescricao').value.trim();
    const imagem = document.getElementById('prodImagem').value.trim();
    const badge = document.getElementById('prodBadge').value;
    const destaque = document.getElementById('prodDestaque').value === 'true';

    // Validações
    if (!nome) { alert('Preencha o nome do produto'); return; }
    if (!categoria) { alert('Selecione uma categoria'); return; }
    if (preco <= 0) { alert('Informe um preço válido'); return; }
    if (!plataforma) { alert('Selecione a plataforma'); return; }

    // Validar URLs
    if (linkAfiliado && !validarURL(linkAfiliado)) {
        alert('Link de afiliado inválido. Use uma URL válida (https://...)');
        return;
    }
    if (imagem && !validarURL(imagem)) {
        alert('URL da imagem inválida');
        return;
    }

    const produtos = getProdutos();

    if (editandoId !== null) {
        const idx = produtos.findIndex(p => p.id === editandoId);
        if (idx >= 0) {
            produtos[idx] = { ...produtos[idx], nome, categoria, preco, plataforma, linkAfiliado, descricao, imagem, badge, destaque };
        }
        editandoId = null;
        mostrarToast('Produto atualizado!');
    } else {
        produtos.push({
            id: gerarIdProduto(),
            nome, categoria, preco, descricao, imagem, destaque, badge, plataforma, linkAfiliado
        });
        mostrarToast('Produto adicionado!');
    }

    salvarProdutos(produtos);
    limparFormulario();
    renderTabelaProdutos();
    renderStats();
}

function editarProduto(id) {
    const produtos = getProdutos();
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    editandoId = id;

    document.getElementById('prodNome').value = produto.nome;
    document.getElementById('prodCategoria').value = produto.categoria;
    document.getElementById('prodPreco').value = produto.preco;
    document.getElementById('prodPlataforma').value = produto.plataforma || '';
    document.getElementById('prodLink').value = produto.linkAfiliado || '';
    document.getElementById('prodDescricao').value = produto.descricao;
    document.getElementById('prodImagem').value = produto.imagem || '';
    document.getElementById('prodBadge').value = produto.badge || '';
    document.getElementById('prodDestaque').value = produto.destaque ? 'true' : 'false';

    document.getElementById('formTitle').innerHTML = '<i class="fas fa-edit"></i> Editando Produto';
    document.getElementById('saveProductBtn').innerHTML = '<i class="fas fa-save"></i> Atualizar';
    document.getElementById('cancelEditBtn').style.display = 'inline-flex';

    document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
}

function cancelarEdicao() {
    editandoId = null;
    limparFormulario();
}

function limparFormulario() {
    document.getElementById('prodNome').value = '';
    document.getElementById('prodCategoria').value = '';
    document.getElementById('prodPreco').value = '';
    document.getElementById('prodPlataforma').value = '';
    document.getElementById('prodLink').value = '';
    document.getElementById('prodDescricao').value = '';
    document.getElementById('prodImagem').value = '';
    document.getElementById('prodBadge').value = '';
    document.getElementById('prodDestaque').value = 'true';

    document.getElementById('formTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Adicionar Produto';
    document.getElementById('saveProductBtn').innerHTML = '<i class="fas fa-save"></i> Salvar Produto';
    document.getElementById('cancelEditBtn').style.display = 'none';
    editandoId = null;
}

function deletarProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    let produtos = getProdutos();
    produtos = produtos.filter(p => p.id !== id);
    salvarProdutos(produtos);
    renderTabelaProdutos();
    renderStats();
    mostrarToast('Produto excluído');
}

// ===== TABELA =====
function renderTabelaProdutos() {
    const tbody = document.getElementById('productsTableBody');
    const totalSpan = document.getElementById('totalProdutos');
    const produtos = getProdutos();

    totalSpan.textContent = produtos.length;

    if (produtos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #999;">
                    Nenhum produto cadastrado
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = produtos.map(p => {
        const plat = getPlataforma(p.plataforma);
        const imgHTML = p.imagem
            ? `<img src="${sanitizeURL(p.imagem)}" class="product-thumb" alt="">`
            : `<div class="product-thumb" style="display:flex;align-items:center;justify-content:center;"><i class="fas fa-image" style="color:#ccc;"></i></div>`;

        const linkStatus = p.linkAfiliado
            ? `<span style="color: var(--primary-light);"><i class="fas fa-check-circle"></i> Ativo</span>`
            : `<span style="color: var(--accent);"><i class="fas fa-exclamation-circle"></i> Pendente</span>`;

        return `
            <tr>
                <td>${imgHTML}</td>
                <td><strong>${escapeHTML(p.nome)}</strong></td>
                <td>${escapeHTML(getCategoryName(p.categoria))}</td>
                <td style="color: var(--primary); font-weight: 600;">${formatarPreco(p.preco)}</td>
                <td>
                    <span class="platform-badge-sm" style="background: ${plat.cor};">
                        <i class="${plat.icone}"></i> ${escapeHTML(plat.nome)}
                    </span>
                </td>
                <td>${linkStatus}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-edit" onclick="editarProduto(${p.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" onclick="deletarProduto(${p.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ===== UTILIDADES =====
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

function validarURL(url) {
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

function getCategoryName(catId) {
    const cat = CATEGORIAS.find(c => c.id === catId);
    return cat ? cat.nome : catId;
}

function mostrarToast(mensagem) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function setupMobileMenuAdmin() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => menu.classList.toggle('show'));
}
