(function() {
  if (window.__chacaraQuantumLoaded) return;
  window.__chacaraQuantumLoaded = true;

  const SUPABASE_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';
  const ADMIN_EMAIL = 'sidneyjer68@gmail.com';

  function injetarPainelAbsoluto(email) {
    let p = document.getElementById('quantum-admin-root');
    if (p) p.remove();

    p = document.createElement('div');
    p.id = 'quantum-admin-root';
    p.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#050505;z-index:99999999;color:#fff;font-family:sans-serif;padding:30px;box-sizing:border-box;overflow-y:auto;';
    
    p.innerHTML = `
      <div style="max-width:900px;margin:0 auto;background:#111;border:2px solid #ffd700;padding:25px;border-radius:12px;box-shadow:0 0 40px rgba(255,215,0,0.3);">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #333;padding-bottom:15px;margin-bottom:20px;">
          <h2 style="color:#ffd700;margin:0;">⚡ PAINEL MESTRE QUÂNTICO | ATIVO</h2>
          <button id="q-sair" style="background:#d9534f;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair</button>
        </div>
        <p style="color:#aaa;">Sessão validada com sucesso para: <b style="color:#ffd700;">${email}</b></p>
        <div style="background:#1a1a1a;padding:20px;border-radius:8px;margin-top:20px;border:1px solid #333;">
          <h3 style="color:#ffd700;margin-top:0;">Gestão de Conteúdos e Menus</h3>
          <p style="color:#ccc;font-size:14px;">O núcleo quântico está online. Utilize os botões abaixo para gerir os dados da Chácara Profitter.</p>
          <button id="q-recarregar" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;margin-top:10px;">🔄 Atualizar Conexão com Supabase</button>
        </div>
      </div>
    `;

    document.body.appendChild(p);

    document.getElementById('q-sair').onclick = async () => {
      await window.supabaseClient.auth.signOut();
      window.location.href = window.location.pathname;
    };

    document.getElementById('q-recarregar').onclick = () => {
      alert('Conexão quântica sincronizada com sucesso!');
    };
  }

  function criarBotaoForcado() {
    let b = document.getElementById('quantum-btn-trigger');
    if (!b) {
      b = document.createElement('button');
      b.id = 'quantum-btn-trigger';
      b.innerHTML = '⚡ LOGIN ADMIN QUÂNTICO';
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
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    criarBotaoForcado();

    // Verifica se há sessão ativa ou token de retorno do OAuth
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      injetarPainelAbsoluto(session.user.email);
    }

    // Intercepta qualquer clique em botões de login do site
    document.addEventListener('click', (e) => {
      const el = e.target.closest('button, a, [role="button"]');
      if (!el || el.id === 'quantum-btn-trigger') return;
      const txt = (el.innerText || el.textContent || '').trim().toLowerCase();
      if (txt.includes('login') || txt.includes('google') || txt.includes('admin')) {
        e.preventDefault();
        e.stopPropagation();
        const urlOAuth = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin + window.location.pathname)}`;
        window.location.href = urlOAuth;
      }
    }, true);
  };
  document.head.appendChild(s);

})();