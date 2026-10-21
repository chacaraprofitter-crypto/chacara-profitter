(function() {
  if (window.__chacaraQuantumLoaded) return;
  window.__chacaraQuantumLoaded = true;

  const SUPABASE_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';
  const ADMIN_EMAIL = 'sidneyjer68@gmail.com';

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

  const GALERIA_ICONES = [
    '🛋️', '🛏️', '🍽️', '🏊', '🌳', '🥩', '🍷', '☕', '🚿', '🎉',
    '🎬', '🎾', '⚽', '🚗', '🌿', '☀️', '🌙', '🔥', '⭐', '🛎️'
  ];

  async function sincronizarMenus(client) {
    const { data: existentes } = await client.from('categorias').select('*');
    if (!existentes || existentes.length === 0) {
      const payload = MENUS_ORIGINAIS_SITE.map(nome => ({ nome: nome, pai_id: null }));
      await client.from('categorias').insert(payload);
    }
  }

  async function injetarPainelCompleto(client, email) {
    let p = document.getElementById('quantum-admin-root');
    if (p) p.remove();

    await sincronizarMenus(client);

    p = document.createElement('div');
    p.id = 'quantum-admin-root';
    p.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#080808;z-index:99999999;color:#fff;font-family:Segoe UI,Tahoma,sans-serif;padding:25px;box-sizing:border-box;display:flex;flex-direction:column;overflow-y:auto;';
    
    p.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #ffd700;padding-bottom:12px;margin-bottom:20px;flex-wrap:wrap;gap:15px;flex-shrink:0;">
        <div>
          <h2 style="margin:0;color:#ffd700;font-size:22px;letter-spacing:1px;">⚡ PAINEL MESTRE QUÂNTICO | COM ÍCONES</h2>
          <p style="margin:4px 0 0 0;color:#aaa;font-size:12px;">Admin Autenticado: <b style="color:#ffd700;">${email}</b></p>
        </div>
        <div>
          <button id="q-fechar" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:8px 16px;border-radius:6px;cursor:pointer;margin-right:10px;font-weight:bold;">Minimizar</button>
          <button id="q-sair" style="background:#d9534f;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair</button>
        </div>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;flex-shrink:0;">
        <button id="tab-conteudos-btn" style="background:#222;color:#ccc;border:1px solid #444;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">📸 Inserir / Excluir Fotos e Vídeos</button>
        <button id="tab-categorias-btn" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">📂 Gerenciar Menus e Submenus</button>
      </div>

      <!-- ABA 1 -->
      <div id="secao-conteudos" style="display:none;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;max-width:1350px;margin:0 auto;width:100%;flex-grow:1;">
        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;height:fit-content;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:8px;font-size:15px;">Enviar Ficheiros em Lote</h3>
          <form id="form-up" style="display:flex;flex-direction:column;gap:12px;">
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">1. Escolha o Menu ou Submenu *</label>
              <select id="sel-cat" required style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #ffd700;color:#fff;border-radius:6px;font-size:13px;">
                <option value="">A carregar menus...</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">2. Selecionar Fotos ou Vídeos *</label>
              <input type="file" id="inp-files" accept="image/*,video/*" multiple required style="width:100%;color:#fff;padding:8px;background:#1e1e1e;border:1px solid #444;border-radius:6px;cursor:pointer;font-size:12px;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Título Opcional</label>
              <input type="text" id="inp-titulo" placeholder="Ex: Vista da Piscina" style="width:100%;padding:9px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;font-size:13px;">
            </div>
            <button type="submit" id="btn-pub" style="background:#ffd700;color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px;">🚀 Publicar no Menu Selecionado</button>
          </form>
        </div>

        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;display:flex;flex-direction:column;max-height:500px;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:8px;font-size:15px;flex-shrink:0;">Mídias Cadastradas</h3>
          <div id="lista-midias" style="overflow-y:auto;flex-grow:1;padding-right:4px;">
            <p style="color:#888;text-align:center;margin-top:30px;">A carregar...</p>
          </div>
        </div>
      </div>

      <!-- ABA 2 -->
      <div id="secao-categorias" style="display:block;max-width:1000px;margin:0 auto;width:100%;background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
        <h3 style="color:#ffd700;margin-top:0;">Gerenciar Menus e Submenus com Ícones</h3>
        <form id="form-cat" style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px;background:#1a1a1a;padding:16px;border-radius:8px;">
          <div>
            <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">Selecione um Ícone da Galeria (Opcional):</label>
            <div id="galeria-icones-container" style="display:flex;flex-wrap:wrap;gap:8px;background:#111;padding:10px;border-radius:6px;border:1px solid #333;"></div>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;">
            <div style="flex:1;min-width:220px;">
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">Nome do Novo Menu ou Submenu</label>
              <input type="text" id="new-cat-name" placeholder="Ex: SALA DE ESTAR" required style="width:100%;padding:9px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;font-size:13px;">
            </div>
            <div style="width:260px;">
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">Pertence a (Submenu)</label>
              <select id="new-cat-parent" style="width:100%;padding:9px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;font-size:13px;">
                <option value="">Menu Principal</option>
              </select>
            </div>
            <button type="submit" style="background:#ffd700;color:#000;border:none;padding:9px 20px;border-radius:6px;font-weight:bold;cursor:pointer;height:38px;font-size:13px;">+ Criar Menu com Ícone</button>
          </div>
        </form>
        <div id="lista-cats" style="max-height:380px;overflow-y:auto;">
          <p style="color:#888;text-align:center;">A carregar menus...</p>
        </div>
      </div>
    `;

    document.body.appendChild(p);

    const iconeContainer = document.getElementById('galeria-icones-container');
    const inputNomeMenu = document.getElementById('new-cat-name');

    GALERIA_ICONES.forEach(emoji => {
      const btnEmoji = document.createElement('button');
      btnEmoji.type = 'button';
      btnEmoji.innerText = emoji;
      btnEmoji.style.cssText = 'background:#222;border:1px solid #444;font-size:20px;padding:8px 12px;border-radius:6px;cursor:pointer;transition:0.2s;';
      btnEmoji.onclick = () => {
        iconeContainer.querySelectorAll('button').forEach(b => b.style.border = '1px solid #444');
        btnEmoji.style.border = '2px solid #ffd700';
        const textoAtual = inputNomeMenu.value.replace(/^[^\w\s]+\s*/, '');
        inputNomeMenu.value = emoji + ' ' + textoAtual.trim();
      };
      iconeContainer.appendChild(btnEmoji);
    });

    document.getElementById('tab-conteudos-btn').onclick = () => {
      document.getElementById('secao-conteudos').style.display = 'grid';
      document.getElementById('secao-categorias').style.display = 'none';
      document.getElementById('tab-conteudos-btn').style.background = '#ffd700';
      document.getElementById('tab-conteudos-btn').style.color = '#000';
      document.getElementById('tab-categorias-btn').style.background = '#222';
      document.getElementById('tab-categorias-btn').style.color = '#ccc';
    };

    document.getElementById('tab-categorias-btn').onclick = () => {
      document.getElementById('secao-conteudos').style.display = 'none';
      document.getElementById('secao-categorias').style.display = 'block';
      document.getElementById('tab-categorias-btn').style.background = '#ffd700';
      document.getElementById('tab-categorias-btn').style.color = '#000';
      document.getElementById('tab-conteudos-btn').style.background = '#222';
      document.getElementById('tab-conteudos-btn').style.color = '#ccc';
      carregarListaCategorias();
    };

    document.getElementById('q-fechar').onclick = () => { p.remove(); };
    document.getElementById('q-sair').onclick = async () => {
      await client.auth.signOut();
      window.location.href = window.location.pathname;
    };

    async function atualizarSelects() {
      const { data: cats } = await client.from('categorias').select('*').order('created_at', { ascending: true });
      if (!cats) return;
      const selCat = document.getElementById('sel-cat');
      const selPai = document.getElementById('new-cat-parent');
      selCat.innerHTML = '<option value="">-- Escolha o Menu --</option>';
      selPai.innerHTML = '<option value="">Menu Principal</option>';

      cats.filter(c => !c.pai_id).forEach(parent => {
        selCat.innerHTML += `<option value="${parent.id}" style="font-weight:bold;color:#ffd700;">${parent.nome}</option>`;
        selPai.innerHTML += `<option value="${parent.id}">Dentro de: ${parent.nome}</option>`;
        cats.filter(s => s.pai_id === parent.id).forEach(sub => {
          selCat.innerHTML += `<option value="${sub.id}">&nbsp;&nbsp;&nbsp;&nbsp;\u21B3 ${sub.nome}</option>`;
        });
      });
    }

    async function carregarListaMidias() {
      const cont = document.getElementById('lista-midias');
      const { data } = await client.from('conteudos').select('*, categorias(nome)').order('created_at', { ascending: false });
      if (!data || data.length === 0) {
        cont.innerHTML = '<p style="color:#888;text-align:center;margin-top:20px;">Nenhuma foto cadastrada ainda.</p>';
        return;
      }
      cont.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement('div');
        div.style.cssText = 'background:#1c1c1c;border:1px solid #2e2e2e;padding:8px;border-radius:8px;margin-bottom:6px;display:flex;gap:10px;align-items:center;';
        div.innerHTML = `
          <img src="${item.url}" style="width:45px;height:45px;object-fit:cover;border-radius:6px;background:#000;">
          <div style="flex-grow:1;overflow:hidden;">
            <h4 style="margin:0 0 2px 0;color:#ffd700;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.titulo || 'Foto'}</h4>
            <span style="background:#2a2a2a;color:#ffd700;font-size:10px;padding:2px 5px;border-radius:3px;">${item.categorias ? item.categorias.nome : 'Geral'}</span>
          </div>
          <button class="del-m" data-id="${item.id}" style="background:#d9534f;color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:bold;">Excluir</button>
        `;
        div.querySelector('.del-m').onclick = async () => {
          if (confirm('Deseja excluir esta foto?')) {
            await client.from('conteudos').delete().eq('id', item.id);
            carregarListaMidias();
          }
        };
        cont.appendChild(div);
      });
    }

    async function carregarListaCategorias() {
      const cont = document.getElementById('lista-cats');
      const { data: cats } = await client.from('categorias').select('*').order('created_at', { ascending: true });
      if (!cats) return;
      cont.innerHTML = '';
      cats.filter(c => !c.pai_id).forEach(p => {
        const div = document.createElement('div');
        div.style.cssText = 'background:#1c1c1c;border:1px solid #333;padding:10px 12px;border-radius:8px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;';
        div.innerHTML = `
          <b style="color:#ffd700;font-size:14px;">${p.nome}</b>
          <button class="del-c" data-id="${p.id}" style="background:#d9534f;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">Excluir</button>
        `;
        div.querySelector('.del-c').onclick = async () => {
          if (confirm('Excluir este menu?')) {
            await client.from('categorias').delete().eq('id', p.id);
            carregarListaCategorias();
            atualizarSelects();
          }
        };
        cont.appendChild(div);
      });
    }

    document.getElementById('form-cat').onsubmit = async (e) => {
      e.preventDefault();
      const nome = document.getElementById('new-cat-name').value.trim();
      const pai_id = document.getElementById('new-cat-parent').value || null;
      if (!nome) return;
      const { error } = await client.from('categorias').insert([{ nome, pai_id }]);
      if (error) alert('Erro: ' + error.message);
      else {
        document.getElementById('new-cat-name').value = '';
        iconeContainer.querySelectorAll('button').forEach(b => b.style.border = '1px solid #444');
        await carregarListaCategorias();
        await atualizarSelects();
      }
    };

    document.getElementById('form-up').onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-pub');
      const tituloInput = document.getElementById('inp-titulo').value.trim();
      const categoria_id = document.getElementById('sel-cat').value;
      const files = document.getElementById('inp-files').files;

      if (!categoria_id) return alert('Selecione um menu!');
      btn.disabled = true;

      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          btn.innerText = `A enviar ${i + 1} de${files.length}...`;
          const fileName = Date.now() + '_' + i + '_' + file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const { error: upErr } = await client.storage.from('chacara-media').upload(fileName, file);
          if (upErr) throw new Error(upErr.message);

          const url = client.storage.from('chacara-media').getPublicUrl(fileName).data.publicUrl;
          const titulo = tituloInput ? (files.length > 1 ? `${tituloInput} (${i + 1})` : tituloInput) além 'Foto da Chácara';

          await client.from('conteudos').insert([{ titulo, categoria_id, url, categoria: 'geral' }]);
        }
        alert('Upload concluído com sucesso!');
        document.getElementById('inp-files').value = '';
        document.getElementById('inp-titulo').value = '';
        carregarListaMidias();
      } catch (err) {
        alert('Erro: ' + err.message);
      } finally {
        btn.innerText = '🚀 Publicar no Menu Selecionado';
        btn.disabled = false;
      }
    };

    await atualizarSelects();
    await carregarListaMidias();
  }

  function criarBotaoLogin() {
    let b = document.getElementById('quantum-btn-trigger');
    if (!b) {
      b = document.createElement('button');
      b.id = 'quantum-btn-trigger';
      b.innerHTML = '⚡ ABRIR PAINEL QUÂNTICO';
      b.style.cssText = 'position:fixed;bottom:25px;right:25px;background:#ffd700;color:#000;border:3px solid #000;padding:16px 28px;border-radius:35px;z-index:999999999;cursor:pointer;font-weight:bold;font-size:16px;box-shadow:0 8px 30px rgba(0,0,0,0.9);';
      b.onclick = (e) => {
        e.preventDefault();
        const urlOAuth = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin + window.location.pathname)}`;
        window.location.href = urlOAuth;
      };
      document.body.appendChild(b);
    }
  }

  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  s.onload = async () => {
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabaseClient = client;
    
    criarBotaoLogin();

    const { data: { session } } = await client.auth.getSession();
    if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      injetarPainelCompleto(client, session.user.email);
    }
  };
  document.head.appendChild(s);

})();