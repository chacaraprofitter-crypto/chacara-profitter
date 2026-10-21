// ==========================================
// MODO SEGURO & BLINDADO: SUPABASE CLOUD
// ==========================================
if (typeof window.supabaseClient === 'undefined') {
  const SUPABASE_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

async function entrarComGoogle() {
  try {
    const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://chacaraprofitter-crypto.github.io/chacara-profitter/'
      }
    });
    if (error) throw error;
  } catch (err) {
    console.error('[Modo Blindado] Erro crítico no login:', err.message);
    alert('Erro ao autenticar com Google: ' + err.message);
  }
}

async function renderizarPainelAdminBlindado(userEmail) {
  let painel = document.getElementById('ultra-admin-dashboard');
  if (painel) painel.remove();

  painel = document.createElement('div');
  painel.id = 'ultra-admin-dashboard';
  painel.style.cssText = 
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(8, 8, 8, 0.98); backdrop-filter: blur(12px);
    z-index: 999999; color: #fff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex; flex-direction: column; overflow-y: auto; padding: 30px; box-sizing: border-box;
  ;

  painel.innerHTML = 
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #ffd700; padding-bottom: 20px; margin-bottom: 30px;">
      <div>
        <h2 style="margin: 0; color: #ffd700; font-size: 26px; letter-spacing: 1px;">CHÁCARA PROFITTER | MESTRE QUÂNTICO ADMIN</h2>
        <p style="margin: 5px 0 0 0; color: #888; font-size: 13px;">Sessão Segura Ativa | Admin: <b style="color: #ffd700;">\</b></p>
      </div>
      <div>
        <button id="btn-fechar-painel" style="background: transparent; color: #ccc; border: 1px solid #444; padding: 10px 18px; border-radius: 6px; cursor: pointer; margin-right: 12px; font-weight: bold;">Minimizar Painel</button>
        <button id="btn-sair-admin" style="background: #a94442; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: bold;">Encerrar Sessão</button>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 30px; max-width: 1400px; margin: 0 auto; width: 100%;">
      <!-- Painel de Upload Seguro -->
      <div style="background: #141414; padding: 25px; border-radius: 12px; border: 1px solid #282828; box-shadow: 0 10px 30px rgba(0,0,0,0.7);">
        <h3 style="color: #ffd700; margin-top: 0; border-bottom: 1px solid #222; padding-bottom: 10px;">Novo Upload Seguro</h3>
        <form id="form-upload-conteudo" style="display: flex; flex-direction: column; gap: 15px;">
          <div>
            <label style="display: block; font-size: 12px; color: #aaa; margin-bottom: 5px;">Título da Mídia / Imóvel</label>
            <input type="text" id="admin-titulo" placeholder="Ex: Master Suite / Piscina Externa" required style="width: 100%; padding: 12px; background: #1e1e1e; border: 1px solid #333; color: #fff; border-radius: 6px; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; font-size: 12px; color: #aaa; margin-bottom: 5px;">Categoria</label>
            <select id="admin-categoria" style="width: 100%; padding: 12px; background: #1e1e1e; border: 1px solid #333; color: #fff; border-radius: 6px; box-sizing: border-box;">
              <option value="fotos">Álbuns de Fotos</option>
              <option value="videos">Vídeos Ultra Premium</option>
              <option value="destaques">Destaques da Chácara</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 12px; color: #aaa; margin-bottom: 5px;">Descrição Detalhada</label>
            <textarea id="admin-descricao" rows="4" placeholder="Detalhes técnicos e diferenciais..." style="width: 100%; padding: 12px; background: #1e1e1e; border: 1px solid #333; color: #fff; border-radius: 6px; box-sizing: border-box; resize: vertical;"></textarea>
          </div>
          <div>
            <label style="display: block; font-size: 12px; color: #aaa; margin-bottom: 5px;">Arquivo (Imagem ou Vídeo)</label>
            <input type="file" id="admin-arquivo" accept="image/*,video/*" required style="width: 100%; color: #aaa; padding: 10px; background: #1e1e1e; border: 1px solid #333; border-radius: 6px; box-sizing: border-box;">
          </div>
          <button type="submit" id="btn-enviar-midia" style="background: #ffd700; color: #000; border: none; padding: 14px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 14px; transition: 0.2s;">Enviar para Nuvem (Seguro)</button>
        </form>
      </div>

      <!-- Gestor de Conteúdos -->
      <div style="background: #141414; padding: 25px; border-radius: 12px; border: 1px solid #282828; box-shadow: 0 10px 30px rgba(0,0,0,0.7);">
        <h3 style="color: #ffd700; margin-top: 0; border-bottom: 1px solid #222; padding-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
          <span>Conteúdos em Produção</span>
          <button id="btn-atualizar-lista" style="background: #222; color: #ccc; border: 1px solid #444; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">Atualizar</button>
        </h3>
        <div id="lista-conteudos-admin" style="max-height: 540px; overflow-y: auto; padding-right: 5px;">
          <p style="color: #666; text-align: center; margin-top: 40px;">Sincronizando com Supabase Storage e DB...</p>
        </div>
      </div>
    </div>
  ;

  document.body.appendChild(painel);

  document.getElementById('btn-fechar-painel').addEventListener('click', () => {
    painel.style.display = 'none';
    let flotBtn = document.getElementById('btn-reabrir-admin');
    if (!flotBtn) {
      flotBtn = document.createElement('button');
      flotBtn.id = 'btn-reabrir-admin';
      flotBtn.innerText = '⚙️ Painel Mestre Admin';
      flotBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#ffd700;color:#000;border:none;padding:12px 20px;border-radius:30px;z-index:999998;cursor:pointer;font-weight:bold;box-shadow:0 4px 20px rgba(0,0,0,0.5);';
      flotBtn.onclick = () => { painel.style.display = 'flex'; };
      document.body.appendChild(flotBtn);
    }
  });

  document.getElementById('btn-sair-admin').addEventListener('click', async () => {
    await window.supabaseClient.auth.signOut();
    location.reload();
  });

  document.getElementById('btn-atualizar-lista').addEventListener('click', carregarConteudosAdmin);

  document.getElementById('form-upload-conteudo').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-enviar-midia');
    const titulo = document.getElementById('admin-titulo').value;
    const categoria = document.getElementById('admin-categoria').value;
    const descricao = document.getElementById('admin-descricao').value;
    const fileInput = document.getElementById('admin-arquivo');
    const file = fileInput.files[0];

    if (!file) return alert('Selecione um arquivo válido!');

    btn.innerText = 'Transmitindo para a nuvem...';
    btn.disabled = true;

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const fileName = Date.now() + '_' + sanitizedName;
      
      const { error: uploadError } = await window.supabaseClient.storage
        .from('chacara-media')
        .upload(fileName, file);

      if (uploadError) throw new Error('Storage Error: ' + uploadError.message);

      const { data: { publicUrl } } = window.supabaseClient.storage
        .from('chacara-media')
        .getPublicUrl(fileName);

      const { error: dbError } = await window.supabaseClient
        .from('conteudos')
        .insert([{ titulo, categoria, descricao, url: publicUrl }]);

      if (dbError) throw new Error('Database Error: ' + dbError.message);

      alert('Conteúdo publicado com sucesso na nuvem!');
      document.getElementById('form-upload-conteudo').reset();
      carregarConteudosAdmin();
    } catch (err) {
      console.error(err);
      alert('Falha na operação blindada: ' + err.message);
    } finally {
      btn.innerText = 'Enviar para Nuvem (Seguro)';
      btn.disabled = false;
    }
  });

  carregarConteudosAdmin();
}

async function carregarConteudosAdmin() {
  const container = document.getElementById('lista-conteudos-admin');
  if (!container) return;

  container.innerHTML = '<p style="color: #666; text-align: center;">Carregando registos...</p>';

  try {
    const { data, error } = await window.supabaseClient
      .from('conteudos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      container.innerHTML = '<div style="background: #2a1a1a; border: 1px solid #522; padding: 15px; border-radius: 6px; color: #ff8888; font-size: 13px;"><b>Atenção:</b> A tabela <b>conteudos</b> não foi localizada no Supabase. Crie a tabela no painel do Supabase com as colunas: id, titulo, categoria, descricao, url, created_at.</div>';
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = '<p style="color: #666; text-align: center;">Nenhum conteúdo cadastrado na nuvem.</p>';
      return;
    }

    container.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.style.cssText = 'background: #1a1a1a; border: 1px solid #2c2c2c; padding: 12px; border-radius: 8px; margin-bottom: 10px; display: flex; gap: 12px; align-items: center;';
      
      let preview = '';
      if (item.url && (item.url.includes('.mp4') || item.url.includes('video'))) {
        preview = '<video src="' + item.url + '" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;"></video>';
      } else if (item.url) {
        preview = '<img src="' + item.url + '" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">';
      } else {
        preview = '<div style="width: 60px; height: 60px; background: #222; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #777;">Mídia</div>';
      }

      card.innerHTML = 
        \
        <div style="flex-grow: 1; overflow: hidden;">
          <h4 style="margin: 0 0 4px 0; color: #ffd700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\</h4>
          <span style="background: #222; color: #aaa; font-size: 10px; padding: 2px 6px; border-radius: 3px; text-transform: uppercase;">\</span>
          <p style="margin: 4px 0 0 0; color: #888; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\</p>
        </div>
        <button class="btn-apagar-item" data-id="\" style="background: #a94442; color: #fff; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">Excluir</button>
      ;

      container.appendChild(card);
    });

    document.querySelectorAll('.btn-apagar-item').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm('Deseja realmente excluir permanentemente este conteúdo da nuvem?')) {
          const { error } = await window.supabaseClient.from('conteudos').delete().eq('id', id);
          if (error) {
            alert('Erro ao excluir: ' + error.message);
          } else {
            alert('Conteúdo removido com sucesso!');
            carregarConteudosAdmin();
          }
        }
      });
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = '<p style="color: #ff8888; text-align: center;">Erro ao carregar registos da base de dados.</p>';
  }
}

async function verificarAdmin() {
  const { data: { session } } = await window.supabaseClient.auth.getSession();
  if (session && session.user) {
    const emailUser = session.user.email;
    const adminEmail = 'sidneyjer68@gmail.com';
    
    if (emailUser === adminEmail) {
      console.log('[Modo Blindado] Administrador autenticado com sucesso:', emailUser);
      renderizarPainelAdminBlindado(emailUser);
    } else {
      console.warn('[Modo Blindado] Acesso negado para o e-mail:', emailUser);
    }
  }
}

async function loginWithGoogle() {
  return await entrarComGoogle();
}
window.loginWithGoogle = loginWithGoogle;
window.entrarComGoogle = entrarComGoogle;

window.addEventListener('DOMContentLoaded', () => {
  verificarAdmin();
  document.querySelectorAll('button, a').forEach(el => {
    const txt = el.innerText.toLowerCase();
    if (txt.includes('google') || txt.includes('entrar') || txt.includes('login') || txt.includes('acessar')) {
      el.addEventListener('click', (e) => {
        if (!window.location.href.includes('localhost')) {
          e.preventDefault();
          entrarComGoogle();
        }
      });
    }
  });
});
