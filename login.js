(function() {
  if (window.__chacaraAdminLoaded) return;
  window.__chacaraAdminLoaded = true;

  const SUPABASE_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';
  const ADMIN_EMAIL = 'sidneyjer68@gmail.com';
  const REDIRECT_URL = 'https://chacaraprofitter-crypto.github.io/chacara-profitter/';

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

  async function entrarComGoogle() {
    carregarSDK(async () => {
      try {
        const { error } = await window.supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: REDIRECT_URL }
        });
        if (error) throw error;
      } catch (err) {
        alert('Erro ao conectar com o Google: ' + err.message);
      }
    });
  }

  window.entrarComGoogle = entrarComGoogle;
  window.loginWithGoogle = entrarComGoogle;

  function criarBotaoFlutuanteLogin() {
    if (document.getElementById('btn-flutuante-login-vip')) return;
    const btn = document.createElement('button');
    btn.id = 'btn-flutuante-login-vip';
    btn.innerHTML = '🔐 Login Admin VIP';
    btn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg,#1a1a1a,#000);color:#ffd700;border:2px solid #ffd700;padding:12px 22px;border-radius:30px;z-index:999998;cursor:pointer;font-weight:bold;font-family:sans-serif;font-size:14px;box-shadow:0 4px 20px rgba(0,0,0,0.7);';
    btn.onclick = (e) => {
      e.preventDefault();
      btn.innerHTML = '⏳ Conectando...';
      entrarComGoogle();
    };
    document.body.appendChild(btn);
  }

  async function renderizarPainelAdmin(userEmail) {
    const btnLogin = document.getElementById('btn-flutuante-login-vip');
    if (btnLogin) btnLogin.remove();

    let painel = document.getElementById('ultra-admin-dashboard');
    if (painel) painel.remove();

    painel = document.createElement('div');
    painel.id = 'ultra-admin-dashboard';
    painel.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(8,8,8,0.98);backdrop-filter:blur(12px);z-index:999999;color:#fff;font-family:Segoe UI,Tahoma,sans-serif;display:flex;flex-direction:column;overflow-y:auto;padding:25px;box-sizing:border-box;';

    painel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #ffd700;padding-bottom:15px;margin-bottom:20px;flex-wrap:wrap;gap:15px;">
        <div>
          <h2 style="margin:0;color:#ffd700;font-size:24px;letter-spacing:1px;">CHÁCARA PROFITTER | PAINEL MESTRE QUÂNTICO</h2>
          <p style="margin:5px 0 0 0;color:#aaa;font-size:13px;">Controle Total | Admin: <b style="color:#ffd700;">${userEmail}</b></p>
        </div>
        <div>
          <button id="btn-fechar-painel" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:8px 16px;border-radius:6px;cursor:pointer;margin-right:10px;font-weight:bold;">Minimizar / Ver Site</button>
          <button id="btn-sair-admin" style="background:#c9302c;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair</button>
        </div>
      </div>

      <!-- Abas de Navegação -->
      <div style="display:flex;gap:10px;margin-bottom:20px;">
        <button id="tab-btn-conteudos" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">📸 Gestão de Fotos e Vídeos</button>
        <button id="tab-btn-categorias" style="background:#222;color:#ccc;border:1px solid #444;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">📂 Gestão de Menus e Subcategorias</button>
      </div>

      <!-- ABA 1: CONTEÚDOS -->
      <div id="tab-conteudos" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:25px;max-width:1400px;margin:0 auto;width:100%;">
        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
          <h3 id="titulo-form-admin" style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:10px;font-size:16px;">Novo Upload em Categoria/Submenu</h3>
          <form id="form-upload-conteudo" style="display:flex;flex-direction:column;gap:12px;">
            <input type="hidden" id="admin-edit-id" value="">
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Título da Mídia</label>
              <input type="text" id="admin-titulo" placeholder="Ex: Vista da Piscina" required style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Selecione a Categoria / Submenu de Destino</label>
              <select id="admin-categoria-select" required style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;">
                <option value="">Carregando categorias...</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Descrição</label>
              <textarea id="admin-descricao" rows="3" placeholder="Detalhes..." style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;resize:vertical;"></textarea>
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Arquivo (Foto ou Vídeo)</label>
              <input type="file" id="admin-arquivo" accept="image/*,video/*" required style="width:100%;color:#aaa;padding:8px;background:#1e1e1e;border:1px solid #333;border-radius:6px;box-sizing:border-box;">
            </div>
            <div style="display:flex;gap:10px;">
              <button type="submit" id="btn-enviar-midia" style="flex:1;background:#ffd700;color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;">Publicar na Nuvem</button>
              <button type="button" id="btn-cancelar-edicao" style="display:none;background:#444;color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;">Cancelar</button>
            </div>
          </form>
        </div>

        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:10px;font-size:16px;display:flex;justify-content:space-between;align-items:center;">
            <span>Conteúdos Cadastrados</span>
            <button id="btn-atualizar-lista" style="background:#222;color:#ffd700;border:1px solid #444;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:11px;">🔄 Atualizar</button>
          </h3>
          <div id="lista-conteudos-admin" style="max-height:480px;overflow-y:auto;padding-right:5px;">
            <p style="color:#888;text-align:center;margin-top:30px;">Carregando...</p>
          </div>
        </div>
      </div>

      <!-- ABA 2: GESTÃO DE CATEGORIAS E SUBCATEGORIAS -->
      <div id="tab-categorias" style="display:none;max-width:1000px;margin:0 auto;width:100%;background:#141414;padding:25px;border-radius:12px;border:1px solid #282828;">
        <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:10px;">Criar e Gerenciar Menus, Categorias e Subcategorias</h3>
        <form id="form-criar-categoria" style="display:flex;gap:15px;margin-bottom:25px;flex-wrap:wrap;align-items:flex-end;">
          <div style="flex:1;min-width:220px;">
            <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Nome da Categoria / Submenu</label>
            <input type="text" id="cat-nome" placeholder="Ex: Área de Lazer / Churrasqueira" required style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;">
          </div>
          <div style="width:220px;">
            <label style="display:block;font-size:12px;color:#aaa;margin-bottom:4px;">Pertence a (Opcional p/ Submenu)</label>
            <select id="cat-pai" style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;">
              <option value="">Nenhuma (Categoria Principal)</option>
            </select>
          </div>
          <button type="submit" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:6px;font-weight:bold;cursor:pointer;height:41px;">Adicionar ao Menu</button>
        </form>

        <h4 style="color:#ccc;border-bottom:1px solid #222;padding-bottom:8px;">Estrutura Atual de Menus e Submenus</h4>
        <div id="lista-categorias-admin" style="max-height:380px;overflow-y:auto;">
          <p style="color:#888;text-align:center;">Carregando categorias...</p>
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
      let flotBtn = document.getElementById('btn-reabrir-admin');
      if (!flotBtn) {
        flotBtn = document.createElement('button');
        flotBtn.id = 'btn-reabrir-admin';
        flotBtn.innerText = '⚙️ Abrir Painel Admin';
        flotBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#ffd700;color:#000;border:none;padding:12px 22px;border-radius:30px;z-index:999998;cursor:pointer;font-weight:bold;box-shadow:0 4px 20px rgba(0,0,0,0.7);';
        flotBtn.onclick = () => { painel.style.display = 'flex'; };
        document.body.appendChild(flotBtn);
      }
    };

    document.getElementById('btn-sair-admin').onclick = async () => {
      await window.supabaseClient.auth.signOut();
      window.location.href = REDIRECT_URL;
    };

    document.getElementById('btn-atualizar-lista').onclick = carregarConteudosAdmin;

    document.getElementById('form-criar-categoria').onsubmit = async (e) => {
      e.preventDefault();
      const nome = document.getElementById('cat-nome').value;
      const paiId = document.getElementById('cat-pai').value || null;

      const { error } = await window.supabaseClient
        .from('categorias')
        .insert([{ nome, pai_id: paiId }]);

      if (error) {
        alert('Erro ao criar categoria: ' + error.message);
      } else {
        alert('Categoria/Submenu criado com sucesso!');
        document.getElementById('cat-nome').value = '';
        carregarCategoriasAdmin();
        carregarSelectCategorias();
      }
    };

    const btnCancelar = document.getElementById('btn-cancelar-edicao');
    btnCancelar.onclick = () => {
      document.getElementById('form-upload-conteudo').reset();
      document.getElementById('admin-edit-id').value = '';
      document.getElementById('admin-arquivo').required = true;
      document.getElementById('titulo-form-admin').innerText = 'Novo Upload em Categoria/Submenu';
      document.getElementById('btn-enviar-midia').innerText = 'Publicar na Nuvem';
      btnCancelar.style.display = 'none';
    };

    document.getElementById('form-upload-conteudo').onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-enviar-midia');
      const editId = document.getElementById('admin-edit-id').value;
      const titulo = document.getElementById('admin-titulo').value;
      const categoriaId = document.getElementById('admin-categoria-select').value;
      const descricao = document.getElementById('admin-descricao').value;
      const fileInput = document.getElementById('admin-arquivo');
      const file = fileInput.files[0];

      if (!categoriaId) return alert('Selecione uma categoria ou submenu!');

      btn.innerText = 'Processando na nuvem...';
      btn.disabled = true;

      try {
        let publicUrl = null;

        if (file) {
          const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const fileName = Date.now() + '_' + sanitizedName;
          const { error: uploadError } = await window.supabaseClient.storage
            .from('chacara-media')
            .upload(fileName, file);

          if (uploadError) throw new Error('Erro no Storage: ' + uploadError.message);

          const urlData = window.supabaseClient.storage
            .from('chacara-media')
            .getPublicUrl(fileName);
          publicUrl = urlData.data.publicUrl;
        }

        if (editId) {
          const updatePayload = { titulo, categoria_id: categoriaId, descricao };
          if (publicUrl) updatePayload.url = publicUrl;

          const { error: dbError } = await window.supabaseClient
            .from('conteudos')
            .update(updatePayload)
            .eq('id', editId);

          if (dbError) throw new Error('Erro ao atualizar: ' + dbError.message);
          alert('Conteúdo atualizado com sucesso!');
        } else {
          if (!publicUrl) throw new Error('Selecione uma foto ou vídeo!');
          const { error: dbError } = await window.supabaseClient
            .from('conteudos')
            .insert([{ titulo, categoria_id: categoriaId, descricao, url: publicUrl, categoria: 'geral' }]);

          if (dbError) throw new Error('Erro no Banco de Dados: ' + dbError.message);
          alert('Conteúdo publicado com sucesso!');
        }

        btnCancelar.click();
        carregarConteudosAdmin();
      } catch (err) {
        console.error(err);
        alert('Atenção: ' + err.message);
      } finally {
        btn.innerText = editId ? 'Salvar Alterações' : 'Publicar na Nuvem';
        btn.disabled = false;
      }
    };

    carregarSelectCategorias();
    carregarConteudosAdmin();
  }

  async function carregarSelectCategorias() {
    const select = document.getElementById('admin-categoria-select');
    const selectPai = document.getElementById('cat-pai');
    if (!select) return;

    const { data: cats, error } = await window.supabaseClient
      .from('categorias')
      .select('*')
      .order('nome', { ascending: true });

    if (error || !cats) {
      select.innerHTML = '<option value="">Erro ao carregar categorias</option>';
      return;
    }

    select.innerHTML = '<option value="">Selecione a Categoria / Submenu</option>';
    if (selectPai) selectPai.innerHTML = '<option value="">Nenhuma (Categoria Principal)</option>';

    const principais = cats.filter(c => !c.pai_id);
    principais.forEach(p => {
      select.innerHTML += `<option value="${p.id}" style="font-weight:bold;color:#ffd700;">📁 ${p.nome}</option>`;
      if (selectPai) selectPai.innerHTML += `<option value="${p.id}">📁 ${p.nome}</option>`;

      const submenus = cats.filter(s => s.pai_id === p.id);
      submenus.forEach(s => {
        select.innerHTML += `<option value="${s.id}">&nbsp;&nbsp;&nbsp;&nbsp;📂 -- ${s.nome}</option>`;
      });
    });
  }

  async function carregarCategoriasAdmin() {
    const container = document.getElementById('lista-categorias-admin');
    if (!container) return;
    container.innerHTML = '<p style="color:#888;text-align:center;">Carregando...</p>';

    const { data: cats, error } = await window.supabaseClient
      .from('categorias')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !cats || cats.length === 0) {
      container.innerHTML = '<p style="color:#888;text-align:center;">Nenhuma categoria criada ainda. Crie acima!</p>';
      return;
    }

    container.innerHTML = '';
    const principais = cats.filter(c => !c.pai_id);

    principais.forEach(p => {
      const card = document.createElement('div');
      card.style.cssText = 'background:#1c1c1c;border:1px solid #333;padding:12px;border-radius:8px;margin-bottom:10px;';
      
      let html = `<div style="display:flex;justify-content:space-between;align-items:center;">
        <b style="color:#ffd700;font-size:15px;">📁 ${p.nome}</b>
        <button class="btn-del-cat" data-id="${p.id}" style="background:#a94442;color:#fff;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:11px;">Excluir Categoria</button>
      </div>`;

      const submenus = cats.filter(s => s.pai_id === p.id);
      if (submenus.length > 0) {
        html += '<div style="margin-top:8px;padding-left:20px;border-left:2px solid #444;display:flex;flex-direction:column;gap:6px;">';
        submenus.forEach(s => {
          html += `<div style="display:flex;justify-content:space-between;align-items:center;background:#151515;padding:6px 10px;border-radius:4px;">
            <span style="color:#ccc;font-size:13px;">↳ 📂 ${s.nome}</span>
            <button class="btn-del-cat" data-id="${s.id}" style="background:#a94442;color:#fff;border:none;padding:3px 8px;border-radius:4px;cursor:pointer;font-size:10px;">Excluir Submenu</button>
          </div>`;
        });
        html += '</div>';
      }

      card.innerHTML = html;
      container.appendChild(card);
    });

    document.querySelectorAll('.btn-del-cat').forEach(btn => {
      btn.onclick = async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm('Deseja excluir esta categoria/submenu?')) {
          const { error } = await window.supabaseClient.from('categorias').delete().eq('id', id);
          if (error) alert('Erro ao excluir: ' + error.message);
          else {
            carregarCategoriasAdmin();
            carregarSelectCategorias();
          }
        }
      };
    });
  }

  async function carregarConteudosAdmin() {
    const container = document.getElementById('lista-conteudos-admin');
    if (!container) return;
    container.innerHTML = '<p style="color:#888;text-align:center;">Sincronizando...</p>';

    try {
      const { data, error } = await window.supabaseClient
        .from('conteudos')
        .select('*, categorias(nome)')
        .order('created_at', { ascending: false });

      if (error) {
        container.innerHTML = '<p style="color:#ff8888;text-align:center;">Erro ao carregar conteúdos.</p>';
        return;
      }

      if (!data || data.length === 0) {
        container.innerHTML = '<p style="color:#777;text-align:center;margin-top:30px;">Nenhum conteúdo cadastrado na nuvem.</p>';
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

        const nomeCat = item.categorias ? item.categorias.nome : 'Geral';

        card.innerHTML = `
          ${preview}
          <div style="flex-grow:1;overflow:hidden;">
            <h4 style="margin:0 0 2px 0;color:#ffd700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.titulo || 'Sem Título'}</h4>
            <span style="background:#2a2a2a;color:#ffd700;font-size:10px;padding:2px 6px;border-radius:3px;">📁 ${nomeCat}</span>
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
          document.getElementById('btn-enviar-midia').innerText = 'Salvar Alterações';
          document.getElementById('btn-cancelar-edicao').style.display = 'inline-block';
        };

        card.querySelector('.btn-apagar-item').onclick = async () => {
          if (confirm('Deseja realmente excluir "' + item.titulo + '"?')) {
            const { error } = await window.supabaseClient.from('conteudos').delete().eq('id', item.id);
            if (error) alert('Erro ao excluir: ' + error.message);
            else carregarConteudosAdmin();
          }
        };

        container.appendChild(card);
      });
    } catch (err) {
      console.error(err);
    }
  }

  function iniciarSistema() {
    criarBotaoFlutuanteLogin();

    carregarSDK(async () => {
      const { data: { session } } = await window.supabaseClient.auth.getSession();
      if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        renderizarPainelAdmin(session.user.email);
      }

      window.supabaseClient.auth.onAuthStateChange((event, session) => {
        if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          renderizarPainelAdmin(session.user.email);
        }
      });
    });

    document.addEventListener('click', (e) => {
      const el = e.target.closest('button, a, [role="button"]');
      if (!el) return;
      if (el.id && el.id.includes('admin')) return;
      const txt = (el.innerText || el.textContent || '').toLowerCase();
      const onclickAttr = (el.getAttribute('onclick') || '').toLowerCase();
      if (txt.includes('google') || txt.includes('login') || txt.includes('entrar') || txt.includes('admin') || txt.includes('acessar') || onclickAttr.includes('login') || onclickAttr.includes('google')) {
        e.preventDefault();
        e.stopPropagation();
        entrarComGoogle();
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSistema);
  } else {
    iniciarSistema();
  }
})();
