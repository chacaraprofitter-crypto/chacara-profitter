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

  async function sincronizarMenusOriginais() {
    if (!window.supabaseClient) return;
    const { data: existentes } = await window.supabaseClient.from('categorias').select('*');
    if (!existentes || existentes.length === 0) {
      const payload = MENUS_ORIGINAIS_SITE.map(nome => ({ nome: nome, pai_id: null }));
      await window.supabaseClient.from('categorias').insert(payload);
    }
  }

  async function renderizarPainelAdmin(userEmail) {
    await sincronizarMenusOriginais();

    let painel = document.getElementById('ultra-admin-dashboard');
    if (painel) painel.remove();

    painel = document.createElement('div');
    painel.id = 'ultra-admin-dashboard';
    painel.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0d0d0d;z-index:999999;color:#fff;font-family:Segoe UI,Tahoma,sans-serif;display:flex;flex-direction:column;overflow-y:auto;padding:20px;box-sizing:border-box;';

    painel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #ffd700;padding-bottom:12px;margin-bottom:15px;flex-wrap:wrap;gap:15px;flex-shrink:0;">
        <div>
          <h2 style="margin:0;color:#ffd700;font-size:22px;letter-spacing:1px;">CHÁCARA PROFITTER | PAINEL MESTRE QUÂNTICO</h2>
          <p style="margin:4px 0 0 0;color:#aaa;font-size:12px;">Gestão de Menus e Mídias | Admin: <b style="color:#ffd700;">${userEmail}</b></p>
        </div>
        <div>
          <button id="btn-fechar-painel" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:8px 16px;border-radius:6px;cursor:pointer;margin-right:10px;font-weight:bold;">Minimizar / Ver Site</button>
          <button id="btn-sair-admin" style="background:#c9302c;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair</button>
        </div>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:15px;flex-wrap:wrap;flex-shrink:0;">
        <button id="tab-btn-conteudos" style="background:#ffd700;color:#000;border:none;padding:9px 18px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">📸 Inserir / Excluir Fotos e Vídeos</button>
        <button id="tab-btn-categorias" style="background:#222;color:#ccc;border:1px solid #444;padding:9px 18px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">📂 Gerenciar Menus e Submenus</button>
      </div>

      <!-- ABA 1: CONTEÚDOS -->
      <div id="tab-conteudos" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;max-width:1350px;margin:0 auto;width:100%;flex-grow:1;padding-bottom:20px;">
        <div style="background:#141414;padding:18px;border-radius:12px;border:1px solid #282828;height:fit-content;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:8px;font-size:15px;">Inserir Fotos ou Vídeos nos Menus</h3>
          <form id="form-upload-conteudo" style="display:flex;flex-direction:column;gap:10px;">
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">1. Escolha o Menu ou Submenu *</label>
              <select id="admin-categoria-select" required style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #ffd700;color:#fff;border-radius:6px;box-sizing:border-box;font-size:13px;">
                <option value="">A carregar menus...</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">2. Selecionar Ficheiros (Pode escolher vários) *</label>
              <input type="file" id="admin-arquivo" accept="image/*,video/*" multiple required style="width:100%;color:#fff;padding:8px;background:#1e1e1e;border:1px solid #444;border-radius:6px;box-sizing:border-box;cursor:pointer;font-size:12px;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:3px;">Título (Opcional)</label>
              <input type="text" id="admin-titulo" placeholder="Ex: Vista da Piscina" style="width:100%;padding:9px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;font-size:13px;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:3px;">Descrição (Opcional)</label>
              <textarea id="admin-descricao" rows="2" placeholder="Detalhes..." style="width:100%;padding:9px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;resize:vertical;font-size:13px;"></textarea>
            </div>
            <button type="submit" id="btn-enviar-midia" style="background:#ffd700;color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px;">🚀 Publicar no Menu Selecionado</button>
          </form>
        </div>

        <div style="background:#141414;padding:18px;border-radius:12px;border:1px solid #282828;display:flex;flex-direction:column;max-height:500px;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:8px;font-size:15px;flex-shrink:0;">Gerenciar Fotos Publicadas</h3>
          <div id="lista-conteudos-admin" style="overflow-y:auto;flex-grow:1;padding-right:4px;">
            <p style="color:#888;text-align:center;margin-top:30px;">A carregar...</p>
          </div>
        </div>
      </div>

      <!-- ABA 2: CATEGORIAS -->
      <div id="tab-categorias" style="display:none;max-width:1000px;margin:0 auto;width:100%;background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
        <h3 style="color:#ffd700;margin-top:0;">Gerenciar Menus do Site e Submenus</h3>
        <form id="form-criar-categoria" style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;align-items:flex-end;background:#1a1a1a;padding:14px;border-radius:8px;">
          <div style="flex:1;min-width:220px;">
            <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">Nome do Novo Menu ou Submenu</label>
            <input type="text" id="cat-nome" placeholder="Ex: Quadra de Ténis" required style="width:100%;padding:9px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;font-size:13px;">
          </div>
          <div style="width:260px;">
            <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">Pertence a (Opcional p/ Submenu)</label>
            <select id="cat-pai" style="width:100%;padding:9px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;font-size:13px;">
              <option value="">Menu Principal</option>
            </select>
          </div>
          <button type="submit" style="background:#ffd700;color:#000;border:none;padding:9px 20px;border-radius:6px;font-weight:bold;cursor:pointer;height:38px;font-size:13px;">+ Criar Menu</button>
        </form>
        <div id="lista-categorias-admin" style="max-height:380px;overflow-y:auto;">
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
    };

    document.getElementById('btn-sair-admin').onclick = async () => {
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
      card.style.cssText = 'background:#1c1c1c;border:1px solid #333;padding:10px 12px;border-radius:8px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;';
      card.innerHTML = `
        <b style="color:#ffd700;font-size:14px;">${p.nome}</b>
        <div style="display:flex;gap:6px;">
          <button class="btn-del-cat" data-id="${p.id}" style="background:#d9534f;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">Excluir</button>
        </div>
      `;
      card.querySelector('.btn-del-cat').onclick = async () => {
        if (confirm('Deseja excluir este menu?')) {
          await window.supabaseClient.from('categorias').delete().eq('id', p.id);
          carregarCategoriasAdmin();
          carregarSelectCategorias();
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
      container.innerHTML = '<p style="color:#888;text-align:center;margin-top:20px;">Nenhuma foto cadastrada ainda.</p>';
      return;
    }

    container.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.style.cssText = 'background:#1c1c1c;border:1px solid #2e2e2e;padding:8px;border-radius:8px;margin-bottom:6px;display:flex;gap:10px;align-items:center;';
      card.innerHTML = `
        <img src="${item.url}" style="width:45px;height:45px;object-fit:cover;border-radius:6px;background:#000;">
        <div style="flex-grow:1;overflow:hidden;">
          <h4 style="margin:0 0 2px 0;color:#ffd700;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.titulo || 'Foto'}</h4>
          <span style="background:#2a2a2a;color:#ffd700;font-size:10px;padding:2px 5px;border-radius:3px;">${item.categorias ? item.categorias.nome : 'Geral'}</span>
        </div>
        <button class="btn-apagar-item" style="background:#d9534f;color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:bold;">Excluir</button>
      `;
      card.querySelector('.btn-apagar-item').onclick = async () => {
        if (confirm('Excluir foto?')) {
          await window.supabaseClient.from('conteudos').delete().eq('id', item.id);
          carregarConteudosAdmin();
        }
      };
      container.appendChild(card);
    });
  }

  carregarSDK(async () => {
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      renderizarPainelAdmin(session.user.email);
    }
  });

})();