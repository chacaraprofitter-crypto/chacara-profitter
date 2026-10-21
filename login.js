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

  // Se ja estiver logado como Admin, abre o painel na hora; se nao, chama o OAuth do Google
  async function acionarAcessoAdmin() {
    carregarSDK(async () => {
      try {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session && session.user) {
          if (session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
            const painelExistente = document.getElementById('ultra-admin-dashboard');
            if (painelExistente) {
              painelExistente.style.display = 'flex';
            } else {
              await renderizarPainelAdmin(session.user.email);
            }
            return;
          } else {
            alert('Acesso restrito ao administrador (' + ADMIN_EMAIL + '). Voce esta conectado como: ' + session.user.email);
            await window.supabaseClient.auth.signOut();
          }
        }

        const { error } = await window.supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: REDIRECT_URL }
        });
        if (error) throw error;
      } catch (err) {
        alert('Erro ao abrir login do Google: ' + err.message);
      }
    });
  }

  window.entrarComGoogle = acionarAcessoAdmin;
  window.loginWithGoogle = acionarAcessoAdmin;
  window.abrirPainelAdmin = acionarAcessoAdmin;

  // Vincula diretamente todos os botoes "Login Google" do topo do site
  function vincularBotoesTopoSite() {
    const elementos = document.querySelectorAll('button, a, [role="button"], div, span');
    elementos.forEach(el => {
      if (el.children.length > 2) return;
      const txt = (el.innerText || el.textContent || '').trim().toLowerCase();
      if (txt === 'login google' || txt === 'login' || txt === 'entrar' || txt.includes('login google')) {
        el.style.cursor = 'pointer';
        el.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          acionarAcessoAdmin();
        };
      }
    });
  }

  function garantirBotaoFlutuante() {
    let btn = document.getElementById('btn-flutuante-admin-master');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'btn-flutuante-admin-master';
      btn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg,#ffd700,#e5b842);color:#000;border:2px solid #fff;padding:12px 22px;border-radius:30px;z-index:999998;cursor:pointer;font-weight:bold;font-family:sans-serif;font-size:14px;box-shadow:0 4px 25px rgba(0,0,0,0.85);';
      btn.onclick = (e) => {
        e.preventDefault();
        acionarAcessoAdmin();
      };
      document.body.appendChild(btn);
    }
    btn.innerHTML = isAdminLogado ? '\u2699\uFE0F Abrir Painel Admin' : '\uD83D\uDD10 Login Admin VIP';
  }

  async function sincronizarMenusOriginaisDoSite() {
    if (!window.supabaseClient) return;
    const { data: existentes, error } = await window.supabaseClient
      .from('categorias')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) return;

    if (!existentes || existentes.length === 0) {
      const payload = MENUS_ORIGINAIS_SITE.map(nome => ({ nome: nome, pai_id: null }));
      await window.supabaseClient.from('categorias').insert(payload);

      const galeriaSec = document.getElementById('galeria-premium');
      if (galeriaSec) {
        const imgs = Array.from(galeriaSec.querySelectorAll('img'));
        const { data: novasCats } = await window.supabaseClient.from('categorias').select('*');
        if (imgs.length > 0 && novasCats && novasCats.length > 0) {
          const fotosParaImportar = [];
          imgs.forEach((img, idx) => {
            if (img.src && !img.src.includes('avatar') && !img.src.includes('logo')) {
              fotosParaImportar.push({
                titulo: img.alt || ('Foto da Ch\u00E1cara ' + (idx + 1)),
                categoria_id: novasCats[0].id,
                categoria: 'geral',
                descricao: '',
                url: img.src
              });
            }
          });
          if (fotosParaImportar.length > 0) {
            await window.supabaseClient.from('conteudos').insert(fotosParaImportar);
          }
        }
      }
    }
  }

  async function atualizarGaleriaNoSite() {
    if (!window.supabaseClient) return;

    const { data: cats } = await window.supabaseClient
      .from('categorias')
      .select('*')
      .order('created_at', { ascending: true });

    const { data: midias } = await window.supabaseClient
      .from('conteudos')
      .select('*')
      .order('created_at', { ascending: false });

    const listaCategorias = (cats && cats.length > 0)
      ? cats
      : MENUS_ORIGINAIS_SITE.map((n, i) => ({ id: 'temp_' + i, nome: n, pai_id: null }));

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
          if (confirm('Deseja excluir esta foto/v\u00EDdeo (' + tit + ')?')) {
            await window.supabaseClient.from('conteudos').delete().eq('id', id);
            atualizarGaleriaNoSite();
            carregarConteudosAdmin();
          }
        };
      });
    }

    desenharMenuEGaleria();
  }

  async function renderizarPainelAdmin(userEmail) {
    isAdminLogado = true;
    garantirBotaoFlutuante();

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
          <h2 style="margin:0;color:#ffd700;font-size:24px;letter-spacing:1px;">CH\u00C1CARA PROFITTER | PAINEL MESTRE QU\u00C2NTICO</h2>
          <p style="margin:5px 0 0 0;color:#aaa;font-size:13px;">Sincronizado ao Menu de \u00C1lbuns & Ambientes do Site | Admin: <b style="color:#ffd700;">${userEmail}</b></p>
        </div>
        <div>
          <button id="btn-fechar-painel" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:8px 16px;border-radius:6px;cursor:pointer;margin-right:10px;font-weight:bold;">Minimizar / Ver Site</button>
          <button id="btn-sair-admin" style="background:#c9302c;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair</button>
        </div>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
        <button id="tab-btn-conteudos" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">\uD83D\uDCF8 Inserir / Excluir Fotos e V\u00EDdeos nos Menus</button>
        <button id="tab-btn-categorias" style="background:#222;color:#ccc;border:1px solid #444;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">\uD83D\uDCC2 Gerenciar Menus do Site e Submenus (Criar / Excluir / Renomear)</button>
      </div>

      <div id="tab-conteudos" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:25px;max-width:1400px;margin:0 auto;width:100%;">
        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
          <h3 id="titulo-form-admin" style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:10px;font-size:16px;">Inserir Fotos ou V\u00EDdeos nos Menus do Site</h3>
          <form id="form-upload-conteudo" style="display:flex;flex-direction:column;gap:12px;">
            <input type="hidden" id="admin-edit-id" value="">
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">1. Escolha o Menu do Site ou Submenu *</label>
              <select id="admin-categoria-select" required style="width:100%;padding:11px;background:#1e1e1e;border:1px solid #ffd700;color:#fff;border-radius:6px;box-sizing:border-box;font-size:14px;">
                <option value="">Carregando menus do site...</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">2. Selecionar Fotos ou V\u00EDdeos (Pode escolher v\u00E1rios de uma vez) *</label>
              <input type="file" id="admin-arquivo" accept="image/*,video/*" multiple required style="width:100%;color:#fff;padding:10px;background:#1e1e1e;border:1px solid #444;border-radius:6px;box-sizing:border-box;cursor:pointer;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">T\u00EDtulo (Opcional - se deixar vazio, usa o nome do Menu)</label>
              <input type="text" id="admin-titulo" placeholder="Ex: Piscina Aquecida / Vista Noturna" style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Descri\u00E7\u00E3o (Opcional)</label>
              <textarea id="admin-descricao" rows="2" placeholder="Detalhes opcionais..." style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;resize:vertical;"></textarea>
            </div>
            <div style="display:flex;gap:10px;">
              <button type="submit" id="btn-enviar-midia" style="flex:1;background:#ffd700;color:#000;border:none;padding:14px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:14px;">\uD83D\uDE80 Publicar no Menu Selecionado</button>
              <button type="button" id="btn-cancelar-edicao" style="display:none;background:#444;color:#fff;border:none;padding:14px;border-radius:6px;font-weight:bold;cursor:pointer;">Cancelar</button>
            </div>
          </form>
        </div>

        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #222;padding-bottom:10px;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
            <h3 style="color:#ffd700;margin:0;font-size:16px;">Fotos e V\u00EDdeos nos Menus</h3>
            <div style="display:flex;gap:8px;">
              <select id="filtro-admin-midias" style="background:#1e1e1e;color:#fff;border:1px solid #444;padding:5px 10px;border-radius:4px;font-size:12px;">
                <option value="todas">Todos os Menus</option>
              </select>
              <button id="btn-atualizar-lista" style="background:#222;color:#ffd700;border:1px solid #444;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:11px;">\uD83D\uDD04 Atualizar</button>
            </div>
          </div>
          <div id="lista-conteudos-admin" style="max-height:480px;overflow-y:auto;padding-right:5px;">
            <p style="color:#888;text-align:center;margin-top:30px;">Carregando...</p>
          </div>
        </div>
      </div>

      <div id="tab-categorias" style="display:none;max-width:1050px;margin:0 auto;width:100%;background:#141414;padding:25px;border-radius:12px;border:1px solid #282828;">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #222;padding-bottom:12px;margin-bottom:18px;flex-wrap:wrap;gap:10px;">
          <div>
            <h3 style="color:#ffd700;margin:0;">Menus do Site ("Menu de \u00C1lbuns & Ambientes") e Submenus</h3>
            <p style="color:#aaa;font-size:12px;margin:4px 0 0 0;">Estes s\u00E3o os menus ativos no seu site. Voc\u00EA pode inserir fotos neles, criar submenus, renomear, excluir ou criar novos.</p>
          </div>
          <button id="btn-restaurar-menus-site" style="background:#28a745;color:#fff;border:none;padding:9px 15px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px;">\u26A1 Restaurar Menus Originais do Site</button>
        </div>

        <form id="form-criar-categoria" style="display:flex;gap:15px;margin-bottom:25px;flex-wrap:wrap;align-items:flex-end;background:#1a1a1a;padding:15px;border-radius:8px;border:1px solid #2e2e2e;">
          <div style="flex:1;min-width:240px;">
            <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">1. Nome do Novo Menu ou Submenu</label>
            <input type="text" id="cat-nome" placeholder="Ex: \uD83C\uDFBE Quadra de T\u00EAnis / Piscina Aquecida..." required style="width:100%;padding:10px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;box-sizing:border-box;">
          </div>
          <div style="width:280px;">
            <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">2. Onde vai entrar?</label>
            <select id="cat-pai" style="width:100%;padding:10px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;box-sizing:border-box;">
              <option value="">Menu Principal (Bot\u00E3o no Site)</option>
            </select>
          </div>
          <button type="submit" style="background:#ffd700;color:#000;border:none;padding:10px 22px;border-radius:6px;font-weight:bold;cursor:pointer;height:41px;">+ Criar Menu / Submenu</button>
        </form>

        <h4 style="color:#ccc;border-bottom:1px solid #222;padding-bottom:8px;">Menus Ativos no Site Agora:</h4>
        <div id="lista-categorias-admin" style="max-height:420px;overflow-y:auto;">
          <p style="color:#888;text-align:center;">Carregando menus...</p>
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
      garantirBotaoFlutuante();
    };

    document.getElementById('btn-sair-admin').onclick = async () => {
      isAdminLogado = false;
      await window.supabaseClient.auth.signOut();
      window.location.href = REDIRECT_URL;
    };

    document.getElementById('btn-atualizar-lista').onclick = carregarConteudosAdmin;
    document.getElementById('filtro-admin-midias').onchange = carregarConteudosAdmin;

    document.getElementById('btn-restaurar-menus-site').onclick = async () => {
      const { data: atuais } = await window.supabaseClient.from('categorias').select('*');
      const nomesAtuais = (atuais || []).map(c => c.nome.toUpperCase());
      const faltantes = MENUS_ORIGINAIS_SITE.filter(n => !nomesAtuais.includes(n.toUpperCase()));
      if (faltantes.length === 0) {
        alert('Todos os menus originais do site j\u00E1 est\u00E3o presentes na lista!');
        return;
      }
      await window.supabaseClient.from('categorias').insert(faltantes.map(nome => ({ nome, pai_id: null })));
      await carregarCategoriasAdmin();
      await carregarSelectCategorias();
      await atualizarGaleriaNoSite();
      alert('Menus originais restaurados com sucesso!');
    };

    document.getElementById('form-criar-categoria').onsubmit = async (e) => {
      e.preventDefault();
      const nome = document.getElementById('cat-nome').value.trim();
      const paiId = document.getElementById('cat-pai').value || null;
      if (!nome) return;

      const { error } = await window.supabaseClient
        .from('categorias')
        .insert([{ nome, pai_id: paiId }]);

      if (error) {
        alert('Erro ao criar menu: ' + error.message);
      } else {
        document.getElementById('cat-nome').value = '';
        await carregarCategoriasAdmin();
        await carregarSelectCategorias();
        await atualizarGaleriaNoSite();
      }
    };

    const btnCancelar = document.getElementById('btn-cancelar-edicao');
    btnCancelar.onclick = () => {
      document.getElementById('form-upload-conteudo').reset();
      document.getElementById('admin-edit-id').value = '';
      document.getElementById('admin-arquivo').required = true;
      document.getElementById('titulo-form-admin').innerText = 'Inserir Fotos ou V\u00EDdeos nos Menus do Site';
      document.getElementById('btn-enviar-midia').innerText = '\uD83D\uDE80 Publicar no Menu Selecionado';
      btnCancelar.style.display = 'none';
    };

    document.getElementById('form-upload-conteudo').onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-enviar-midia');
      const editId = document.getElementById('admin-edit-id').value;
      const tituloInput = document.getElementById('admin-titulo').value.trim();
      const selectEl = document.getElementById('admin-categoria-select');
      const categoriaId = selectEl.value;
      const nomeCategoriaLimpo = selectEl.options[selectEl.selectedIndex]
        ? selectEl.options[selectEl.selectedIndex].text.replace(/[\u21B3\-\s]+/g, ' ').trim()
        : 'Ch\u00E1cara Profitter';
      const descricao = document.getElementById('admin-descricao').value.trim();
      const fileInput = document.getElementById('admin-arquivo');
      const files = fileInput.files;

      if (!categoriaId) return alert('Escolha um Menu ou Submenu na lista!');

      btn.disabled = true;

      try {
        if (editId) {
          btn.innerText = '\u23F3 Salvando altera\u00E7\u00F5es...';
          let publicUrl = null;
          if (files && files[0]) {
            const file = files[0];
            const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            const fileName = Date.now() + '_' + sanitizedName;
            const { error: uploadError } = await window.supabaseClient.storage.from('chacara-media').upload(fileName, file);
            if (uploadError) throw new Error('Erro no Storage: ' + uploadError.message);
            publicUrl = window.supabaseClient.storage.from('chacara-media').getPublicUrl(fileName).data.publicUrl;
          }
          const updatePayload = { titulo: tituloInput || nomeCategoriaLimpo, categoria_id: categoriaId, descricao };
          if (publicUrl) updatePayload.url = publicUrl;

          const { error: dbError } = await window.supabaseClient.from('conteudos').update(updatePayload).eq('id', editId);
          if (dbError) throw new Error('Erro ao atualizar: ' + dbError.message);
          alert('Conte\u00FAdo atualizado com sucesso!');
        } else {
          if (!files || files.length === 0) throw new Error('Selecione pelo menos 1 foto ou v\u00EDdeo!');

          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            btn.innerText = `\u23F3 Enviando ${i + 1} de${files.length}...`;
            const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            const fileName = Date.now() + '_' + i + '_' + sanitizedName;

            const { error: uploadError } = await window.supabaseClient.storage
              .from('chacara-media')
              .upload(fileName, file);

            if (uploadError) throw new Error('Erro ao enviar ' + file.name + ': ' + uploadError.message);

            const publicUrl = window.supabaseClient.storage.from('chacara-media').getPublicUrl(fileName).data.publicUrl;
            const tituloFinal = tituloInput
              ? (files.length > 1 ? `${tituloInput} (${i + 1})` : tituloInput)
              : nomeCategoriaLimpo;

            const { error: dbError } = await window.supabaseClient
              .from('conteudos')
              .insert([{ titulo: tituloFinal, categoria_id: categoriaId, descricao, url: publicUrl, categoria: 'geral' }]);

            if (dbError) throw new Error('Erro no Banco: ' + dbError.message);
          }

          alert(files.length + ' arquivo(s) inserido(s) com sucesso no menu!');
        }

        const catMantida = categoriaId;
        btnCancelar.click();
        document.getElementById('admin-categoria-select').value = catMantida;
        await carregarConteudosAdmin();
        await atualizarGaleriaNoSite();
      } catch (err) {
        console.error(err);
        alert('Aten\u00E7\u00E3o: ' + err.message);
      } finally {
        btn.innerText = editId ? 'Salvar Altera\u00E7\u00F5es' : '\uD83D\uDE80 Publicar no Menu Selecionado';
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
    const filtroMidias = document.getElementById('filtro-admin-midias');
    if (!select) return;

    const { data: cats, error } = await window.supabaseClient
      .from('categorias')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !cats) return;

    select.innerHTML = '<option value="">-- Escolha o Menu do Site ou Submenu --</option>';
    if (selectPai) selectPai.innerHTML = '<option value="">Menu Principal (Novo Bot\u00E3o no Site)</option>';
    if (filtroMidias) filtroMidias.innerHTML = '<option value="todas">Todos os Menus do Site</option>';

    const principais = cats.filter(c => !c.pai_id);
    principais.forEach(p => {
      select.innerHTML += `<option value="${p.id}" style="font-weight:bold;color:#ffd700;">${p.nome}</option>`;
      if (selectPai) selectPai.innerHTML += `<option value="${p.id}">Dentro de: ${p.nome} (Criar Submenu)</option>`;
      if (filtroMidias) filtroMidias.innerHTML += `<option value="${p.id}">${p.nome}</option>`;

      const submenus = cats.filter(s => s.pai_id === p.id);
      submenus.forEach(s => {
        select.innerHTML += `<option value="${s.id}">&nbsp;&nbsp;&nbsp;&nbsp;\u21B3 Submenu: ${s.nome}</option>`;
        if (filtroMidias) filtroMidias.innerHTML += `<option value="${s.id}">&nbsp;&nbsp;&nbsp;&nbsp;\u21B3 ${s.nome}</option>`;
      });
    });
  }

  async function carregarCategoriasAdmin() {
    const container = document.getElementById('lista-categorias-admin');
    if (!container) return;
    container.innerHTML = '<p style="color:#888;text-align:center;">Carregando menus do site...</p>';

    const { data: cats, error } = await window.supabaseClient
      .from('categorias')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !cats || cats.length === 0) {
      container.innerHTML = '<p style="color:#ffd700;text-align:center;">Nenhum menu encontrado.</p>';
      return;
    }

    container.innerHTML = '';
    const principais = cats.filter(c => !c.pai_id);

    principais.forEach(p => {
      const card = document.createElement('div');
      card.style.cssText = 'background:#1c1c1c;border:1px solid #333;padding:14px;border-radius:8px;margin-bottom:10px;';

      let html = `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <b style="color:#ffd700;font-size:15px;">${p.nome}</b>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button class="btn-atalho-up" data-id="${p.id}" style="background:#0275d8;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">\uD83D\uDCF8 Inserir Fotos Aqui</button>
          <button class="btn-add-sub" data-id="${p.id}" data-nome="${p.nome}" style="background:#28a745;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">+ Criar Submenu</button>
          <button class="btn-ren-cat" data-id="${p.id}" data-nome="${p.nome}" style="background:#f0ad4e;color:#000;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">Renomear</button>
          <button class="btn-del-cat" data-id="${p.id}" style="background:#d9534f;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">Excluir do Site</button>
        </div>
      </div>`;

      const submenus = cats.filter(s => s.pai_id === p.id);
      if (submenus.length > 0) {
        html += '<div style="margin-top:10px;padding-left:20px;border-left:2px solid #ffd700;display:flex;flex-direction:column;gap:6px;">';
        submenus.forEach(s => {
          html += `<div style="display:flex;justify-content:space-between;align-items:center;background:#141414;padding:8px 12px;border-radius:6px;border:1px solid #282828;flex-wrap:wrap;gap:6px;">
            <span style="color:#eee;font-size:13px;">\u21B3 Submenu: <b>${s.nome}</b></span>
            <div style="display:flex;gap:6px;">
              <button class="btn-atalho-up" data-id="${s.id}" style="background:#0275d8;color:#fff;border:none;padding:4px 9px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:bold;">\uD83D\uDCF8 Inserir Fotos</button>
              <button class="btn-ren-cat" data-id="${s.id}" data-nome="${s.nome}" style="background:#f0ad4e;color:#000;border:none;padding:4px 9px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:bold;">Renomear</button>
              <button class="btn-del-cat" data-id="${s.id}" style="background:#d9534f;color:#fff;border:none;padding:4px 9px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:bold;">Excluir Submenu</button>
            </div>
          </div>`;
        });
        html += '</div>';
      }

      card.innerHTML = html;
      container.appendChild(card);
    });

    container.querySelectorAll('.btn-atalho-up').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        document.getElementById('tab-btn-conteudos').click();
        document.getElementById('admin-categoria-select').value = id;
        document.getElementById('admin-arquivo').focus();
      };
    });

    container.querySelectorAll('.btn-add-sub').forEach(btn => {
      btn.onclick = async () => {
        const paiId = btn.getAttribute('data-id');
        const paiNome = btn.getAttribute('data-nome');
        const subNome = prompt('Digite o nome do novo Submenu dentro de "' + paiNome + '":');
        if (subNome && subNome.trim()) {
          const { error } = await window.supabaseClient.from('categorias').insert([{ nome: subNome.trim(), pai_id: paiId }]);
          if (error) alert('Erro: ' + error.message);
          else {
            await carregarCategoriasAdmin();
            await carregarSelectCategorias();
            await atualizarGaleriaNoSite();
          }
        }
      };
    });

    container.querySelectorAll('.btn-ren-cat').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const nomeAtual = btn.getAttribute('data-nome');
        const novoNome = prompt('Digite o novo nome para o menu/submenu:', nomeAtual);
        if (novoNome && novoNome.trim() && novoNome.trim() !== nomeAtual) {
          const { error } = await window.supabaseClient.from('categorias').update({ nome: novoNome.trim() }).eq('id', id);
          if (error) alert('Erro ao renomear: ' + error.message);
          else {
            await carregarCategoriasAdmin();
            await carregarSelectCategorias();
            await carregarConteudosAdmin();
            await atualizarGaleriaNoSite();
          }
        }
      };
    });

    container.querySelectorAll('.btn-del-cat').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Deseja realmente excluir este menu/submenu do site?')) {
          const { error } = await window.supabaseClient.from('categorias').delete().eq('id', id);
          if (error) alert('Erro ao excluir: ' + error.message);
          else {
            await carregarCategoriasAdmin();
            await carregarSelectCategorias();
            await atualizarGaleriaNoSite();
          }
        }
      };
    });
  }

  async function carregarConteudosAdmin() {
    const container = document.getElementById('lista-conteudos-admin');
    const filtroMidias = document.getElementById('filtro-admin-midias');
    if (!container) return;
    container.innerHTML = '<p style="color:#888;text-align:center;">Sincronizando...</p>';

    try {
      let query = window.supabaseClient
        .from('conteudos')
        .select('*, categorias(nome)')
        .order('created_at', { ascending: false });

      if (filtroMidias && filtroMidias.value && filtroMidias.value !== 'todas') {
        query = query.eq('categoria_id', filtroMidias.value);
      }

      const { data, error } = await query;

      if (error) {
        container.innerHTML = '<p style="color:#ff8888;text-align:center;">Erro ao carregar conte\u00FAdos.</p>';
        return;
      }

      if (!data || data.length === 0) {
        container.innerHTML = '<p style="color:#777;text-align:center;margin-top:30px;">Nenhuma foto ou v\u00EDdeo neste menu ainda. Escolha o menu ao lado e envie suas fotos!</p>';
        return;
      }

      container.innerHTML = '';
      data.forEach(item => {
        const card = document.createElement('div');
        card.style.cssText = 'background:#1c1c1c;border:1px solid #2e2e2e;padding:10px;border-radius:8px;margin-bottom:8px;display:flex;gap:10px;align-items:center;';

        let preview = '';
        if (item.url && item.url.match(/\.(mp4|mov|webm|ogg)$/i)) {
          preview = `<video src="${item.url}" style="width:55px;height:55px;object-fit:cover;border-radius:6px;background:#000;"></video>`;
        } else if (item.url) {
          preview = `<img src="${item.url}" style="width:55px;height:55px;object-fit:cover;border-radius:6px;background:#000;">`;
        }

        const nomeCat = item.categorias ? item.categorias.nome : 'Menu Geral';

        card.innerHTML = `
          ${preview}
          <div style="flex-grow:1;overflow:hidden;">
            <h4 style="margin:0 0 2px 0;color:#ffd700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.titulo || 'Sem T\u00EDtulo'}</h4>
            <span style="background:#2a2a2a;color:#ffd700;font-size:10px;padding:2px 6px;border-radius:3px;">${nomeCat}</span>
            <p style="margin:2px 0 0 0;color:#999;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.descricao || ''}</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <button class="btn-editar-item" style="background:#f0ad4e;color:#000;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:bold;">Editar</button>
            <button class="btn-apagar-item" style="background:#d9534f;color:#fff;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:bold;">Excluir</button>
          </div>
        `;

        card.querySelector('.btn-editar-item').onclick = () => {
          document.getElementById('admin-edit-id').value = item.id;
          document.getElementById('admin-titulo').value = item.titulo || '';
          document.getElementById('admin-categoria-select').value = item.categoria_id || '';
          document.getElementById('admin-descricao').value = item.descricao || '';
          document.getElementById('admin-arquivo').required = false;
          document.getElementById('titulo-form-admin').innerText = 'Editando: ' + item.titulo;
          document.getElementById('btn-enviar-midia').innerText = 'Salvar Altera\u00E7\u00F5es';
          document.getElementById('btn-cancelar-edicao').style.display = 'inline-block';
        };

        card.querySelector('.btn-apagar-item').onclick = async () => {
          if (confirm('Deseja realmente excluir "' + item.titulo + '"?')) {
            const { error } = await window.supabaseClient.from('conteudos').delete().eq('id', item.id);
            if (error) alert('Erro ao excluir: ' + error.message);
            else {
              await carregarConteudosAdmin();
              await atualizarGaleriaNoSite();
            }
          }
        };

        container.appendChild(card);
      });
    } catch (err) {
      console.error(err);
    }
  }

  function iniciarSistema() {
    garantirBotaoFlutuante();
    vincularBotoesTopoSite();
    setTimeout(vincularBotoesTopoSite, 1500);

    carregarSDK(async () => {
      const { data: { session } } = await window.supabaseClient.auth.getSession();
      if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        isAdminLogado = true;
        garantirBotaoFlutuante();
        await renderizarPainelAdmin(session.user.email);
      } else {
        await atualizarGaleriaNoSite();
      }

      window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          isAdminLogado = true;
          garantirBotaoFlutuante();
          await renderizarPainelAdmin(session.user.email);
        }
      });
    });

    document.addEventListener('click', (e) => {
      const el = e.target.closest('button, a, [role="button"]');
      if (!el) return;
      if (el.closest('#ultra-admin-dashboard') || el.closest('#chacara-albuns-dinamico')) return;
      if (el.id === 'btn-flutuante-admin-master') return;

      const txt = (el.innerText || el.textContent || '').trim().toLowerCase();
      const onclickAttr = (el.getAttribute('onclick') || '').toLowerCase();
      if (txt.includes('login') || txt.includes('google') || txt.includes('admin') || onclickAttr.includes('login') || onclickAttr.includes('google')) {
        e.preventDefault();
        e.stopPropagation();
        acionarAcessoAdmin();
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSistema);
  } else {
    iniciarSistema();
  }
})();