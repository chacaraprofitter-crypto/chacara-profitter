(function() {
  if (window.__chacaraAdminLoaded) return;
  window.__chacaraAdminLoaded = true;

  const SUPABASE_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';
  const ADMIN_EMAIL = 'sidneyjer68@gmail.com';
  const REDIRECT_URL = 'https://chacaraprofitter-crypto.github.io/chacara-profitter/';

  const MENUS_ORIGINAIS_SITE = [
    '\uD83C\uDFCA PISCINA & \u00C1TRIO',
    '\uD83C\uDF33 CLUBE & LAGO',
    '\uD83E\uDD69 ESPA\u00C7O GOURMET',
    '\uD83D\uDD2E NOITE & UV',
    '\uD83D\uDECF\uFE0F SU\u00CDTES & QUARTOS',
    '\uD83C\uDF89 SAL\u00C3O DE FESTAS',
    '\uD83C\uDF77 LIVING & LAREIRA',
    '\u2615 COZINHA & BAR',
    '\uD83D\uDEBF BANHEIROS & VARANDA',
    '\uD83C\uDFAC V\u00CDDEOS OFICIAIS'
  ];

  let isAdminLogado = false;
  let filtroSiteAtivo = 'todas';

  function carregarSDK(callback) {
    if (typeof window.supabase !== 'undefined') {
      if (!window.supabaseClient) {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      }
      return callback();
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => {
      window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      callback();
    };
    document.head.appendChild(script);
  }

  function dispararLoginGoogle() {
    carregarSDK(async () => {
      try {
        const { error } = await window.supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: REDIRECT_URL }
        });
        if (error) throw error;
      } catch (err) {
        alert('Erro ao ligar ao Google: ' + err.message);
      }
    });
  }

  window.entrarComGoogle = dispararLoginGoogle;
  window.loginWithGoogle = dispararLoginGoogle;
  window.abrirPainelAdmin = dispararLoginGoogle;

  function criarBotoesAcesso() {
    // Botao flutuante visivel em qualquer lugar
    if (!document.getElementById('btn-flutuante-admin-master')) {
      const btn = document.createElement('button');
      btn.id = 'btn-flutuante-admin-master';
      btn.innerHTML = '\uD83D\uDD10 Login Admin VIP';
      btn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg,#ffd700,#e5b842);color:#000;border:2px solid #fff;padding:12px 22px;border-radius:30px;z-index:999998;cursor:pointer;font-weight:bold;font-family:sans-serif;font-size:14px;box-shadow:0 4px 25px rgba(0,0,0,0.85);';
      btn.onclick = (e) => {
        e.preventDefault();
        dispararLoginGoogle();
      };
      document.body.appendChild(btn);
    }

    // Captura e reescreve qualquer botao de login existente no topo do site
    document.querySelectorAll('button, a, [role="button"]').forEach(el => {
      const txt = (el.innerText || el.textContent || '').trim().toLowerCase();
      if (txt.includes('login') || txt.includes('google') || txt.includes('entrar')) {
        el.style.cursor = 'pointer';
        el.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          dispararLoginGoogle();
        };
      }
    });
  }

  async function sincronizarMenusOriginaisDoSite() {
    if (!window.supabaseClient) return;
    const { data: existentes } = await window.supabaseClient.from('categorias').select('*');
    if (!existentes || existentes.length === 0) {
      const payload = MENUS_ORIGINAIS_SITE.map(nome => ({ nome: nome, pai_id: null }));
      await window.supabaseClient.from('categorias').insert(payload);
    }
  }

  async function atualizarGaleriaNoSite() {
    if (!window.supabaseClient) return;
    const { data: cats } = await window.supabaseClient.from('categorias').select('*').order('created_at', { ascending: true });
    const { data: midias } = await window.supabaseClient.from('conteudos').select('*').order('created_at', { ascending: false });

    const listaCategorias = (cats && cats.length > 0) ? cats : MENUS_ORIGINAIS_SITE.map((n, i) => ({ id: 'temp_' + i, nome: n, pai_id: null }));
    const listaMidias = midias || [];

    let galeriaSection = document.getElementById('galeria-premium');
    if (!galeriaSection) {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
      const hMenu = headings.find(h => (h.innerText || '').includes('Menu de') || (h.innerText || '').includes('Ambientes'));
      if (hMenu) galeriaSection = hMenu.closest('section, div');
    }
    if (!galeriaSection) return;

    let wrapperDinamico = document.getElementById('chacara-albuns-dinamico');
    if (!wrapperDinamico) {
      const todosBotoes = Array.from(galeriaSection.querySelectorAll('button, a, div, span'));
      const btnTodos = todosBotoes.find(el => {
        const txt = (el.innerText || '').trim().toUpperCase();
        return (txt.includes('TODOS OS AMBIENTES') || txt.includes('PISCINA &')) && el.children.length <= 2;
      });

      wrapperDinamico = document.createElement('div');
      wrapperDinamico.id = 'chacara-albuns-dinamico';
      wrapperDinamico.style.cssText = 'width:100%;max-width:1300px;margin:20px auto 0 auto;padding:0 15px;box-sizing:border-box;';

      if (btnTodos && btnTodos.parentElement) {
        const containerOriginalBotoes = btnTodos.parentElement;
        containerOriginalBotoes.style.display = 'none';
        containerOriginalBotoes.parentNode.insertBefore(wrapperDinamico, containerOriginalBotoes.nextSibling);
      } else {
        galeriaSection.appendChild(wrapperDinamico);
      }
    }

    const principais = listaCategorias.filter(c => !c.pai_id);

    function desenharMenuEGaleria() {
      const estiloAtivo = 'background:linear-gradient(135deg,#e5b842,#c8961e);color:#000;border:1px solid #ffd700;padding:12px 22px;border-radius:30px;cursor:pointer;font-weight:bold;font-size:13px;letter-spacing:0.5px;box-shadow:0 0 25px rgba(229,184,66,0.45);transition:all 0.25s;';
      const estiloInativo = 'background:#111622;color:#e2e8f0;border:1px solid #263042;padding:12px 22px;border-radius:30px;cursor:pointer;font-weight:600;font-size:13px;letter-spacing:0.5px;transition:all 0.25s;';

      let htmlBotoes = `<button class="btn-album-site" data-id="todas" style="${filtroSiteAtivo === 'todas' ? estiloAtivo : estiloInativo}">\u2728 TODOS OS AMBIENTES (${listaMidias.length})</button>`;

      principais.forEach(p => {
        const qtdFilhos = listaCategorias.filter(s => s.pai_id === p.id).map(s => s.id);
        const qtdFotos = listaMidias.filter(m => m.categoria_id === p.id || qtdFilhos.includes(m.categoria_id)).length;
        const ativo = (filtroSiteAtivo === p.id);
        htmlBotoes += `<button class="btn-album-site" data-id="${p.id}" style="${ativo ? estiloAtivo : estiloInativo}">${p.nome}${qtdFotos > 0 ? ' (' + qtdFotos + ')' : ''}</button>`;
      });

      let catPaiSelecionada = principais.find(p => p.id === filtroSiteAtivo);
      if (!catPaiSelecionada) {
        const subSel = listaCategorias.find(s => s.id === filtroSiteAtivo);
        if (subSel && subSel.pai_id) {
          catPaiSelecionada = principais.find(p => p.id === subSel.pai_id);
        }
      }

      let htmlSubmenus = '';
      if (catPaiSelecionada) {
        const submenus = listaCategorias.filter(s => s.pai_id === catPaiSelecionada.id);
        if (submenus.length > 0) {
          htmlSubmenus = '<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,215,0,0.2);">';
          const paiAtivo = (filtroSiteAtivo === catPaiSelecionada.id);
          htmlSubmenus += `<button class="btn-album-site" data-id="${catPaiSelecionada.id}" style="background:${paiAtivo ? '#ffd700' : '#1a202c'};color:${paiAtivo ? '#000' : '#ffd700'};border:1px solid #ffd700;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:12px;font-weight:bold;">Ver Tudo em ${catPaiSelecionada.nome}</button>`;
          submenus.forEach(s => {
            const subAtivo = (filtroSiteAtivo === s.id);
            const qtdSub = listaMidias.filter(m => m.categoria_id === s.id).length;
            htmlSubmenus += `<button class="btn-album-site" data-id="${s.id}" style="background:${subAtivo ? '#ffd700' : '#1a202c'};color:${subAtivo ? '#000' : '#fff'};border:1px solid ${subAtivo ? '#ffd700' : '#3a465e'};padding:8px 16px;border-radius:20px;cursor:pointer;font-size:12px;font-weight:bold;">\u21B3 ${s.nome}${qtdSub > 0 ? ' (' + qtdSub + ')' : ''}</button>`;
          });
          htmlSubmenus += '</div>';
        }
      }

      let midiasExibidas = listaMidias;
      if (filtroSiteAtivo !== 'todas') {
        const idsSub = listaCategorias.filter(s => s.pai_id === filtroSiteAtivo).map(s => s.id);
        midiasExibidas = listaMidias.filter(m => m.categoria_id === filtroSiteAtivo || idsSub.includes(m.categoria_id));
      }

      let htmlGrid = '';
      if (midiasExibidas.length === 0) {
        const nomeMenuAtual = filtroSiteAtivo === 'todas'
          ? 'Todos os Ambientes'
          : ((listaCategorias.find(c => c.id === filtroSiteAtivo) || {}).nome || 'este ambiente');

        htmlGrid = `
          <div style="grid-column:1/-1;text-align:center;padding:45px 20px;background:rgba(17,22,34,0.6);border:1px dashed #2e3b52;border-radius:16px;margin-top:10px;">
            <p style="color:#94a3b8;font-size:15px;margin:0 0 12px 0;">Nenhuma foto ou v\u00EDdeo cadastrado em <b style="color:#ffd700;">${nomeMenuAtual}</b> ainda.</p>${isAdminLogado ? `<button id="btn-atalho-upload-site" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:25px;font-weight:bold;cursor:pointer;font-size:13px;">+ Adicionar Fotos em ${nomeMenuAtual}</button>` : ''}
          </div>
        `;
      } else {
        midiasExibidas.forEach(item => {
          const isVideo = item.url && item.url.match(/\.(mp4|mov|webm|ogg)$/i);
          const catObj = listaCategorias.find(c => c.id === item.categoria_id);
          const nomeCat = catObj ? catObj.nome : 'Galeria';

          const midiaTag = isVideo
            ? `<video src="${item.url}" controls style="width:100%;height:260px;object-fit:cover;display:block;background:#000;"></video>`
            : `<img src="${item.url}" loading="lazy" onclick="window.open('${item.url}','_blank')" style="width:100%;height:260px;object-fit:cover;display:block;cursor:pointer;transition:transform 0.35s;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">`;

          const btnExcluirDireto = isAdminLogado
            ? `<button class="btn-del-midia-site" data-id="${item.id}" data-titulo="${item.titulo || ''}" style="position:absolute;top:10px;right:10px;background:#d9534f;color:#fff;border:none;padding:6px 10px;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;box-shadow:0 2px 10px rgba(0,0,0,0.7);">\uD83D\uDDD1\uFE0F Excluir</button>`
            : '';

          htmlGrid += `
            <div style="background:#0f1420;border:1px solid #232d3f;border-radius:14px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.5);">
              <div style="overflow:hidden;position:relative;">
                ${midiaTag}
                <span style="position:absolute;top:10px;left:10px;background:rgba(10,14,23,0.85);color:#ffd700;padding:4px 12px;border-radius:20px;font-size:11px;border:1px solid rgba(255,215,0,0.4);font-weight:600;">${nomeCat}</span>${btnExcluirDireto}
              </div>
              <div style="padding:14px 16px;">
                <h4 style="margin:0 0 4px 0;color:#f8fafc;font-size:15px;">${item.titulo \vert{}\vert{} nomeCat}</h4>${item.descricao ? `<p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.4;">${item.descricao}</p>` : ''}
              </div>
            </div>
          `;
        });
      }

      wrapperDinamico.innerHTML = `
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:10px;">
          ${htmlBotoes}
        </div>
        ${htmlSubmenus}
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:22px;margin-top:30px;">
          ${htmlGrid}
        </div>
      `;

      wrapperDinamico.querySelectorAll('.btn-album-site').forEach(btn => {
        btn.onclick = () => {
          filtroSiteAtivo = btn.getAttribute('data-id');
          desenharMenuEGaleria();
        };
      });

      const btnAtalho = document.getElementById('btn-atalho-upload-site');
      if (btnAtalho) {
        btnAtalho.onclick = () => {
          const painel = document.getElementById('ultra-admin-dashboard');
          if (painel) {
            painel.style.display = 'flex';
            document.getElementById('tab-btn-conteudos').click();
            if (filtroSiteAtivo !== 'todas') {
              document.getElementById('admin-categoria-select').value = filtroSiteAtivo;
            }
          }
        };
      }

      wrapperDinamico.querySelectorAll('.btn-del-midia-site').forEach(btn => {
        btn.onclick = async (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          const tit = btn.getAttribute('data-titulo');
          if (confirm('Deseja excluir esta foto/vídeo (' + tit + ')?')) {
            await window.supabaseClient.from('conteudos').delete().eq('id', id);
            atualizarGaleriaNoSite();
          }
        };
      });
    }

    desenharMenuEGaleria();
  }

  async function renderizarPainelAdmin(userEmail) {
    isAdminLogado = true;
    criarBotoesAcesso();
    await sincronizarMenusOriginaisDoSite();
    await atualizarGaleriaNoSite();

    let painel = document.getElementById('ultra-admin-dashboard');
    if (painel) painel.remove();

    painel = document.createElement('div');
    painel.id = 'ultra-admin-dashboard';
    painel.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(8,8,8,0.98);backdrop-filter:blur(12px);z-index:999999;color:#fff;font-family:Segoe UI,Tahoma,sans-serif;display:flex;flex-direction:column;overflow-y:auto;padding:25px;box-sizing:border-box;';

    painel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #ffd700;padding-bottom:15px;margin-bottom:20px;flex-wrap:wrap;gap:15px;">
        <div>
          <h2 style="margin:0;color:#ffd700;font-size:24px;letter-spacing:1px;">CHÁCARA PROFITTER | PAINEL MESTRE QUÂNTICO</h2>
          <p style="margin:5px 0 0 0;color:#aaa;font-size:13px;">Sincronizado ao Menu de Álbuns & Ambientes | Admin: <b style="color:#ffd700;">${userEmail}</b></p>
        </div>
        <div>
          <button id="btn-fechar-painel" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:8px 16px;border-radius:6px;cursor:pointer;margin-right:10px;font-weight:bold;">Minimizar / Ver Site</button>
          <button id="btn-sair-admin" style="background:#c9302c;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair</button>
        </div>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
        <button id="tab-btn-conteudos" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">📸 Inserir / Excluir Fotos e Vídeos</button>
        <button id="tab-btn-categorias" style="background:#222;color:#ccc;border:1px solid #444;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">📂 Gerenciar Menus e Submenus</button>
      </div>

      <div id="tab-conteudos" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:25px;max-width:1400px;margin:0 auto;width:100%;">
        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:10px;font-size:16px;">Inserir Fotos ou Vídeos nos Menus</h3>
          <form id="form-upload-conteudo" style="display:flex;flex-direction:column;gap:12px;">
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">1. Escolha o Menu ou Submenu *</label>
              <select id="admin-categoria-select" required style="width:100%;padding:11px;background:#1e1e1e;border:1px solid #ffd700;color:#fff;border-radius:6px;box-sizing:border-box;font-size:14px;">
                <option value="">A carregar menus...</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">2. Selecionar Arquivos (Pode escolher vários) *</label>
              <input type="file" id="admin-arquivo" accept="image/*,video/*" multiple required style="width:100%;color:#fff;padding:10px;background:#1e1e1e;border:1px solid #444;border-radius:6px;box-sizing:border-box;cursor:pointer;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Título (Opcional)</label>
              <input type="text" id="admin-titulo" placeholder="Ex: Vista da Piscina" style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Descrição (Opcional)</label>
              <textarea id="admin-descricao" rows="2" placeholder="Detalhes..." style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;resize:vertical;"></textarea>
            </div>
            <button type="submit" id="btn-enviar-midia" style="background:#ffd700;color:#000;border:none;padding:14px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:14px;">🚀 Publicar no Menu Selecionado</button>
          </form>
        </div>

        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:10px;font-size:16px;">Gerenciar Fotos Publicadas</h3>
          <div id="lista-conteudos-admin" style="max-height:480px;overflow-y:auto;padding-right:5px;">
            <p style="color:#888;text-align:center;margin-top:30px;">A carregar...</p>
          </div>
        </div>
      </div>

      <div id="tab-categorias" style="display:none;max-width:1050px;margin:0 auto;width:100%;background:#141414;padding:25px;border-radius:12px;border:1px solid #282828;">
        <h3 style="color:#ffd700;margin-top:0;">Gerenciar Menus do Site e Submenus</h3>
        <form id="form-criar-categoria" style="display:flex;gap:15px;margin-bottom:25px;flex-wrap:wrap;align-items:flex-end;background:#1a1a1a;padding:15px;border-radius:8px;">
          <div style="flex:1;min-width:240px;">
            <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">Nome do Novo Menu ou Submenu</label>
            <input type="text" id="cat-nome" placeholder="Ex: Quadra de Ténis" required style="width:100%;padding:10px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;">
          </div>
          <div style="width:280px;">
            <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">Pertence a (Opcional p/ Submenu)</label>
            <select id="cat-pai" style="width:100%;padding:10px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;">
              <option value="">Menu Principal</option>
            </select>
          </div>
          <button type="submit" style="background:#ffd700;color:#000;border:none;padding:10px 22px;border-radius:6px;font-weight:bold;cursor:pointer;height:41px;">+ Criar Menu</button>
        </form>
        <div id="lista-categorias-admin" style="max-height:420px;overflow-y:auto;">
          <p style="color:#888;text-align:center;">A carregar menus...</p>
        </div>
      </div>
    `;

    document.body.appendChild(painel);

    document.getElementById('tab-btn-conteudos').onclick = () => {
      document.getElementById('tab-conteudos').style.display = 'grid';
      document.getElementById('tab-categorias').style.display = 'none';
      document.getElementById('tab-btn-conteudos').style.background = '#ffd700';
      document.getElementById('tab-btn-conteudos').style.color = '#000';
      document.getElementById('tab-btn-categorias').style.background = '#222';
      document.getElementById('tab-btn-categorias').style.color = '#ccc';
    };

    document.getElementById('tab-btn-categorias').onclick = () => {
      document.getElementById('tab-conteudos').style.display = 'none';
      document.getElementById('tab-categorias').style.display = 'block';
      document.getElementById('tab-btn-categorias').style.background = '#ffd700';
      document.getElementById('tab-btn-categorias').style.color = '#000';
      document.getElementById('tab-btn-conteudos').style.background = '#222';
      document.getElementById('tab-btn-conteudos').style.color = '#ccc';
      carregarCategoriasAdmin();
    };

    document.getElementById('btn-fechar-painel').onclick = () => {
      painel.style.display = 'none';
      atualizarGaleriaNoSite();
      criarBotoesAcesso();
    };

    document.getElementById('btn-sair-admin').onclick = async () => {
      isAdminLogado = false;
      await window.supabaseClient.auth.signOut();
      window.location.href = REDIRECT_URL;
    };

    document.getElementById('form-criar-categoria').onsubmit = async (e) => {
      e.preventDefault();
      const nome = document.getElementById('cat-nome').value.trim();
      const paiId = document.getElementById('cat-pai').value || null;
      if (!nome) return;

      const { error } = await window.supabaseClient.from('categorias').insert([{ nome, pai_id: paiId }]);
      if (error) alert('Erro: ' + error.message);
      else {
        document.getElementById('cat-nome').value = '';
        await carregarCategoriasAdmin();
        await carregarSelectCategorias();
        await atualizarGaleriaNoSite();
      }
    };

    document.getElementById('form-upload-conteudo').onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-enviar-midia');
      const tituloInput = document.getElementById('admin-titulo').value.trim();
      const selectEl = document.getElementById('admin-categoria-select');
      const categoriaId = selectEl.value;
      const nomeCatLimpo = selectEl.options[selectEl.selectedIndex] ? selectEl.options[selectEl.selectedIndex].text.replace(/[\u21B3\-\s]+/g, ' ').trim() : 'Chácara';
      const descricao = document.getElementById('admin-descricao').value.trim();
      const fileInput = document.getElementById('admin-arquivo');
      const files = fileInput.files;

      if (!categoriaId) return alert('Escolha um menu!');

      btn.disabled = true;
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          btn.innerText = `A enviar ${i + 1} de${files.length}...`;
          const fileName = Date.now() + '_' + i + '_' + file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const { error: upErr } = await window.supabaseClient.storage.from('chacara-media').upload(fileName, file);
          if (upErr) throw new Error(upErr.message);

          const publicUrl = window.supabaseClient.storage.from('chacara-media').getPublicUrl(fileName).data.publicUrl;
          const tituloFinal = tituloInput ? (files.length > 1 ? `${tituloInput} (${i + 1})` : tituloInput) : nomeCatLimpo;

          await window.supabaseClient.from('conteudos').insert([{ titulo: tituloFinal, categoria_id: categoriaId, descricao, url: publicUrl, categoria: 'geral' }]);
        }
        alert(files.length + ' ficheiro(s) enviado(s) com sucesso!');
        fileInput.value = '';
        document.getElementById('admin-titulo').value = '';
        document.getElementById('admin-descricao').value = '';
        await carregarConteudosAdmin();
        await atualizarGaleriaNoSite();
      } catch (err) {
        alert('Erro: ' + err.message);
      } finally {
        btn.innerText = '🚀 Publicar no Menu Selecionado';
        btn.disabled = false;
      }
    };

    await carregarSelectCategorias();
    await carregarConteudosAdmin();
    await carregarCategoriasAdmin();
  }

  async function carregarSelectCategorias() {
    const select = document.getElementById('admin-categoria-select');
    const selectPai = document.getElementById('cat-pai');
    if (!select) return;

    const { data: cats } = await window.supabaseClient.from('categorias').select('*').order('created_at', { ascending: true });
    if (!cats) return;

    select.innerHTML = '<option value="">-- Escolha o Menu --</option>';
    if (selectPai) selectPai.innerHTML = '<option value="">Menu Principal</option>';

    const principais = cats.filter(c => !c.pai_id);
    principais.forEach(p => {
      select.innerHTML += `<option value="${p.id}" style="font-weight:bold;color:#ffd700;">${p.nome}</option>`;
      if (selectPai) selectPai.innerHTML += `<option value="${p.id}">Dentro de: ${p.nome}</option>`;
      cats.filter(s => s.pai_id === p.id).forEach(s => {
        select.innerHTML += `<option value="${s.id}">&nbsp;&nbsp;&nbsp;&nbsp;\u21B3 Submenu: ${s.nome}</option>`;
      });
    });
  }

  async function carregarCategoriasAdmin() {
    const container = document.getElementById('lista-categorias-admin');
    if (!container) return;
    const { data: cats } = await window.supabaseClient.from('categorias').select('*').order('created_at', { ascending: true });
    if (!cats) return;

    container.innerHTML = '';
    cats.filter(c => !c.pai_id).forEach(p => {
      const card = document.createElement('div');
      card.style.cssText = 'background:#1c1c1c;border:1px solid #333;padding:12px;border-radius:8px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;';
      card.innerHTML = `
        <b style="color:#ffd700;font-size:15px;">${p.nome}</b>
        <div style="display:flex;gap:6px;">
          <button class="btn-del-cat" data-id="${p.id}" style="background:#d9534f;color:#fff;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">Excluir</button>
        </div>
      `;
      card.querySelector('.btn-del-cat').onclick = async () => {
        if (confirm('Deseja excluir este menu?')) {
          await window.supabaseClient.from('categorias').delete().eq('id', p.id);
          carregarCategoriasAdmin();
          carregarSelectCategorias();
          atualizarGaleriaNoSite();
        }
      };
      container.appendChild(card);
    });
  }

  async function carregarConteudosAdmin() {
    const container = document.getElementById('lista-conteudos-admin');
    if (!container) return;
    const { data } = await window.supabaseClient.from('conteudos').select('*, categorias(nome)').order('created_at', { ascending: false });
    if (!data || data.length === 0) {
      container.innerHTML = '<p style="color:#888;text-align:center;margin-top:30px;">Nenhuma foto cadastrada ainda.</p>';
      return;
    }

    container.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.style.cssText = 'background:#1c1c1c;border:1px solid #2e2e2e;padding:10px;border-radius:8px;margin-bottom:8px;display:flex;gap:10px;align-items:center;';
      card.innerHTML = `
        <img src="${item.url}" style="width:50px;height:50px;object-fit:cover;border-radius:6px;background:#000;">
        <div style="flex-grow:1;overflow:hidden;">
          <h4 style="margin:0 0 2px 0;color:#ffd700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.titulo || 'Foto'}</h4>
          <span style="background:#2a2a2a;color:#ffd700;font-size:10px;padding:2px 6px;border-radius:3px;">${item.categorias ? item.categorias.nome : 'Geral'}</span>
        </div>
        <button class="btn-apagar-item" style="background:#d9534f;color:#fff;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:bold;">Excluir</button>
      `;
      card.querySelector('.btn-apagar-item').onclick = async () => {
        if (confirm('Excluir foto?')) {
          await window.supabaseClient.from('conteudos').delete().eq('id', item.id);
          carregarConteudosAdmin();
          atualizarGaleriaNoSite();
        }
      };
      container.appendChild(card);
    });
  }

  function iniciarSistema() {
    criarBotoesAcesso();
    setInterval(criarBotoesAcesso, 1500);

    carregarSDK(async () => {
      // Verifica se o URL tem #admin para forçar o login imediatamente
      if (window.location.hash.includes('admin')) {
        dispararLoginGoogle();
        return;
      }

      const { data: { session } } = await window.supabaseClient.auth.getSession();
      if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        isAdminLogado = true;
        criarBotoesAcesso();
        renderizarPainelAdmin(session.user.email);
      } else {
        atualizarGaleriaNoSite();
      }

      window.supabaseClient.auth.onAuthStateChange((event, session) => {
        if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          isAdminLogado = true;
          criarBotoesAcesso();
          renderizarPainelAdmin(session.user.email);
        }
      });
    });

    document.addEventListener('click', (e) => {
      const el = e.target.closest('button, a, [role="button"]');
      if (!el) return;
      if (el.closest('#ultra-admin-dashboard') || el.closest('#chacara-albuns-dinamico') || el.id === 'btn-flutuante-admin-master') return;
      const txt = (el.innerText || el.textContent || '').trim().toLowerCase();
      if (txt.includes('login') || txt.includes('google') || txt.includes('admin')) {
        e.preventDefault();
        e.stopPropagation();
        dispararLoginGoogle();
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSistema);
  } else {
    iniciarSistema();
  }
})();