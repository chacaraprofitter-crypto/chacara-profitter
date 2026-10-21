(function() {
  if (window.__chacaraAdminLoaded) return;
  window.__chacaraAdminLoaded = true;

  const SUPABASE_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';
  const ADMIN_EMAIL = 'sidneyjer68@gmail.com';
  const REDIRECT_URL = 'https://chacaraprofitter-crypto.github.io/chacara-profitter/';

  function forcarLoginGoogleDireto() {
    // Redirecionamento direto para o endpoint OAuth do Supabase (ignora qualquer travamento de botao)
    const urlOAuth = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(REDIRECT_URL)}`;
    window.location.href = urlOAuth;
  }

  window.entrarComGoogle = forcarLoginGoogleDireto;
  window.loginWithGoogle = forcarLoginGoogleDireto;
  window.abrirPainelAdmin = forcarLoginGoogleDireto;

  function criarBotaoSuprema() {
    if (document.getElementById('btn-login-supremo')) return;
    const btn = document.createElement('button');
    btn.id = 'btn-login-supremo';
    btn.innerHTML = '🔐 ACESSAR PAINEL ADMIN';
    btn.style.cssText = 'position:fixed;bottom:25px;right:25px;background:#ffd700;color:#000;border:3px solid #000;padding:15px 25px;border-radius:35px;z-index:9999999;cursor:pointer;font-weight:bold;font-size:15px;box-shadow:0 6px 25px rgba(0,0,0,0.9);';
    btn.onclick = (e) => {
      e.preventDefault();
      forcarLoginGoogleDireto();
    };
    document.body.appendChild(btn);
  }

  // Se o utilizador colocar #admin no URL, redireciona imediatamente para o login do Google
  if (window.location.hash.includes('admin')) {
    setTimeout(forcarLoginGoogleDireto, 500);
  }

  carregarSDK(async () => {
    criarBotaoSuprema();

    if (!window.supabaseClient) return;
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      renderizarPainelAdmin(session.user.email);
    }
  });

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

  async function renderizarPainelAdmin(userEmail) {
    let painel = document.getElementById('ultra-admin-dashboard');
    if (painel) painel.remove();

    painel = document.createElement('div');
    painel.id = 'ultra-admin-dashboard';
    painel.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(8,8,8,0.98);backdrop-filter:blur(12px);z-index:999999;color:#fff;font-family:Segoe UI,Tahoma,sans-serif;display:flex;flex-direction:column;overflow-y:auto;padding:25px;box-sizing:border-box;';

    painel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #ffd700;padding-bottom:15px;margin-bottom:20px;flex-wrap:wrap;gap:15px;">
        <div>
          <h2 style="margin:0;color:#ffd700;font-size:24px;letter-spacing:1px;">CHÁCARA PROFITTER | PAINEL MESTRE QUÂNTICO</h2>
          <p style="margin:5px 0 0 0;color:#aaa;font-size:13px;">Sincronizado | Admin: <b style="color:#ffd700;">${userEmail}</b></p>
        </div>
        <div>
          <button id="btn-fechar-painel" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:8px 16px;border-radius:6px;cursor:pointer;margin-right:10px;font-weight:bold;">Minimizar / Ver Site</button>
          <button id="btn-sair-admin" style="background:#c9302c;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair</button>
        </div>
      </div>
      <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;max-width:800px;margin:auto;text-align:center;">
        <h3 style="color:#ffd700;">Painel Administrativo Ativo com Sucesso!</h3>
        <p style="color:#aaa;">Pode gerir os álbuns, menus e submenus do site a partir daqui.</p>
      </div>
    `;

    document.body.appendChild(painel);

    document.getElementById('btn-fechar-painel').onclick = () => { painel.style.display = 'none'; };
    document.getElementById('btn-sair-admin').onclick = async () => {
      await window.supabaseClient.auth.signOut();
      window.location.href = REDIRECT_URL;
    };
  }

  // Intercepta qualquer clique em botoes de login do site original
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, a, [role="button"]');
    if (!el) return;
    if (el.id === 'btn-login-supremo' || el.closest('#ultra-admin-dashboard')) return;
    const txt = (el.innerText || el.textContent || '').trim().toLowerCase();
    if (txt.includes('login') || txt.includes('google') || txt.includes('admin')) {
      e.preventDefault();
      e.stopPropagation();
      forcarLoginGoogleDireto();
    }
  }, true);

})();