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
        console.error('Erro no login:', err.message);
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
    btn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg,#1a1a1a,#000);color:#ffd700;border:2px solid #ffd700;padding:12px 22px;border-radius:30px;z-index:999998;cursor:pointer;font-weight:bold;font-family:sans-serif;font-size:14px;box-shadow:0 4px 20px rgba(0,0,0,0.7);transition:0.3s;';
    btn.onclick = (e) => {
      e.preventDefault();
      btn.innerHTML = '⏳ Conectando ao Google...';
      entrarComGoogle();
    };
    document.body.appendChild(btn);
  }

  function renderizarPainelAdminBlindado(userEmail) {
    const btnLogin = document.getElementById('btn-flutuante-login-vip');
    if (btnLogin) btnLogin.remove();

    let painel = document.getElementById('ultra-admin-dashboard');
    if (painel) painel.remove();

    painel = document.createElement('div');
    painel.id = 'ultra-admin-dashboard';
    painel.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(8,8,8,0.98);backdrop-filter:blur(12px);z-index:999999;color:#fff;font-family:Segoe UI,Tahoma,sans-serif;display:flex;flex-direction:column;overflow-y:auto;padding:30px;box-sizing:border-box;';

    painel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #ffd700;padding-bottom:20px;margin-bottom:30px;flex-wrap:wrap;gap:15px;">
        <div>
          <h2 style="margin:0;color:#ffd700;font-size:26px;letter-spacing:1px;">CHÁCARA PROFITTER | PAINEL ADMIN ULTRA PREMIUM</h2>
          <p style="margin:5px 0 0 0;color:#aaa;font-size:13px;">Sessão Blindada Ativa | Administrador: <b style="color:#ffd700;">${userEmail}</b></p>
        </div>
        <div>
          <button id="btn-fechar-painel" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:10px 18px;border-radius:6px;cursor:pointer;margin-right:10px;font-weight:bold;">Minimizar / Ver Site</button>
          <button id="btn-sair-admin" style="background:#c9302c;color:#fff;border:none;padding:10px 18px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair da Conta</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:30px;max-width:1400px;margin:0 auto;width:100%;">
        <!-- Formulário de Upload e Edição -->
        <div style="background:#141414;padding:25px;border-radius:12px;border:1px solid #282828;box-shadow:0 10px 30px rgba(0,0,0,0.7);">
          <h3 id="titulo-form-admin" style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:10px;">Novo Upload (Foto ou Vídeo)</h3>
          <form id="form-upload-conteudo" style="display:flex;flex-direction:column;gap:15px;">
            <input type="hidden" id="admin-edit-id" value="">
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:5px;">Título do Conteúdo</label>
              <input type="text" id="admin-titulo" placeholder="Ex: Piscina Aquecida / Espaço Gourmet" required style="width:100%;padding:12px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:5px;">Categoria</label>
              <select id="admin-categoria" style="width:100%;padding:12px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;">
                <option value="fotos">Álbum de Fotos</option>
                <option value="videos">Vídeos Ultra Premium</option>
                <option value="destaques">Destaques da Chácara</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#aaa;margin-bottom:5px;">Descrição Completa</label>
              <textarea id="admin-descricao" rows="4" placeholder="Digite a descrição que vai aparecer no site..." style="width:100%;padding:12px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;resize:vertical;"></textarea>
            </div>
            <div>
              <label id="label-arquivo-admin" style="display:block;font-size:12px;color:#aaa;margin-bottom:5px;">Escolher Arquivo (Foto ou Vídeo)</label>
              <input type="file" id="admin-arquivo" accept="image/*,video/*" required style="width:100%;color:#aaa;padding:10px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;box-sizing:border-box;">
            </div>
            <div style="display:flex;gap:10px;">
              <button type="submit" id="btn-enviar-midia" style="flex:1;background:#ffd700;color:#000;border:none;padding:14px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:14px;">Publicar na Nuvem</button>
              <button type="button" id="btn-cancelar-edicao" style="display:none;background:#444;color:#fff;border:none;padding:14px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:14px;">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- Lista de Conteúdos Cadastrados -->
        <div style="background:#141414;padding:25px;border-radius:12px;border:1px solid #282828;box-shadow:0 10px 30px rgba(0,0,0,0.7);">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:10px;display:flex;justify-content:space-between;align-items:center;">
            <span>Gerenciar Conteúdos do Site</span>
            <button id="btn-atualizar-lista" style="background:#222;color:#ffd700;border:1px solid #444;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">🔄 Atualizar</button>
          </h3>
          <div id="lista-conteudos-admin" style="max-height:540px;overflow-y:auto;padding-right:5px;">
            <p style="color:#888;text-align:center;margin-top:40px;">Carregando conteúdos da nuvem...</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(painel);

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

    const btnCancelar = document.getElementById('btn-cancelar-edicao');
    btnCancelar.onclick = () => {
      document.getElementById('form-upload-conteudo').reset();
      document.getElementById('admin-edit-id').value = '';
      document.getElementById('admin-arquivo').required = true;
      document.getElementById('titulo-form-admin').innerText = 'Novo Upload (Foto ou Vídeo)';
      document.getElementById('btn-enviar-midia').innerText = 'Publicar na Nuvem';
      btnCancelar.style.display = 'none';
    };

    document.getElementById('form-upload-conteudo').onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-enviar-midia');
      const editId = document.getElementById('admin-edit-id').value;
      const titulo = document.getElementById('admin-titulo').value;
      const categoria = document.getElementById('admin-categoria').value;
      const descricao = document.getElementById('admin-descricao').value;
      const fileInput = document.getElementById('admin-arquivo');
      const file = fileInput.files[0];

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
          const updatePayload = { titulo, categoria, descricao };
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
            .insert([{ titulo, categoria, descricao, url: publicUrl }]);

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

    carregarConteudosAdmin();
  }

  async function carregarConteudosAdmin() {
    const container = document.getElementById('lista-conteudos-admin');
    if (!container) return;
    container.innerHTML = '<p style="color:#888;text-align:center;">Sincronizando...</p>';

    try {
      const { data, error } = await window.supabaseClient
        .from('conteudos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        container.innerHTML = '<div style="background:#2a1515;border:1px solid #622;padding:15px;border-radius:8px;color:#ff9999;font-size:13px;"><b>Falta criar a tabela no Supabase:</b> Vá no menu <b>SQL Editor</b> do Supabase e rode o script SQL para ativar a tabela <b>conteudos</b> e o bucket <b>chacara-media</b>.</div>';
        return;
      }

      if (!data || data.length === 0) {
        container.innerHTML = '<p style="color:#777;text-align:center;margin-top:30px;">Nenhum conteúdo cadastrado ainda. Use o formulário ao lado para enviar fotos ou vídeos!</p>';
        return;
      }

      container.innerHTML = '';
      data.forEach(item => {
        const card = document.createElement('div');
        card.style.cssText = 'background:#1c1c1c;border:1px solid #2e2e2e;padding:12px;border-radius:8px;margin-bottom:10px;display:flex;gap:12px;align-items:center;';

        let preview = '';
        if (item.url && (item.url.match(/\.(mp4|mov|webm|ogg)$/i) || item.categoria === 'videos')) {
          preview = `<video src="${item.url}" style="width:65px;height:65px;object-fit:cover;border-radius:6px;background:#000;"></video>`;
        } else if (item.url) {
          preview = `<img src="${item.url}" style="width:65px;height:65px;object-fit:cover;border-radius:6px;background:#000;">`;
        }

        card.innerHTML = `
          ${preview}
          <div style="flex-grow:1;overflow:hidden;">
            <h4 style="margin:0 0 4px 0;color:#ffd700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.titulo || 'Sem Título'}</h4>
            <span style="background:#2a2a2a;color:#ccc;font-size:10px;padding:2px 6px;border-radius:3px;text-transform:uppercase;">${item.categoria || 'geral'}</span>
            <p style="margin:4px 0 0 0;color:#999;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.descricao || ''}</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <button class="btn-editar-item" style="background:#f0ad4e;color:#000;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">Editar</button>
            <button class="btn-apagar-item" style="background:#d9534f;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">Excluir</button>
          </div>
        `;

        card.querySelector('.btn-editar-item').onclick = () => {
          document.getElementById('admin-edit-id').value = item.id;
          document.getElementById('admin-titulo').value = item.titulo || '';
          document.getElementById('admin-categoria').value = item.categoria || 'fotos';
          document.getElementById('admin-descricao').value = item.descricao || '';
          document.getElementById('admin-arquivo').required = false;
          document.getElementById('titulo-form-admin').innerText = 'Editando: ' + item.titulo;
          document.getElementById('btn-enviar-midia').innerText = 'Salvar Alterações';
          document.getElementById('btn-cancelar-edicao').style.display = 'inline-block';
        };

        card.querySelector('.btn-apagar-item').onclick = async () => {
          if (confirm('Tem certeza que deseja excluir "' + item.titulo + '"?')) {
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
        renderizarPainelAdminBlindado(session.user.email);
      }

      window.supabaseClient.auth.onAuthStateChange((event, session) => {
        if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          renderizarPainelAdminBlindado(session.user.email);
        }
      });
    });

    // Captura cliques em qualquer botão de login existente no site
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
