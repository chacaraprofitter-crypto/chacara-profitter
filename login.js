(function() {
  if (window.__chacaraCozinhaAtiva) return;
  window.__chacaraCozinhaAtiva = true;

  const SB_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SB_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';
  const TITULO_MENU = '\uD83C\uDF7D\uFE0F COZINHA AMERICANA';
  const DESC_PADRAO = 'Ampla cozinha americana com ilha, duas geladeiras, dois micro-ondas, forno e todos os utensílios que necessitar.';

  const css = document.createElement('style');
  css.textContent = `
    #quantum-cozinha-grid {
      display: none;
      width: 100%;
      max-width: 1280px;
      margin: 30px auto;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 25px;
      padding: 0 15px;
      box-sizing: border-box;
    }
    .card-luxo-cozinha {
      background: #0d0d0d;
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0,0,0,0.85);
      display: flex;
      flex-direction: column;
      transition: transform 0.35s ease, border-color 0.35s ease;
    }
    .card-luxo-cozinha:hover {
      transform: translateY(-5px);
      border-color: #ffd700;
      box-shadow: 0 16px 40px rgba(255, 215, 0, 0.25);
    }
    .card-luxo-thumb {
      position: relative;
      width: 100%;
      aspect-ratio: 16/10;
      background: #000;
      cursor: pointer;
      overflow: hidden;
    }
    .card-luxo-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .card-luxo-cozinha:hover .card-luxo-thumb img {
      transform: scale(1.05);
    }
    .badge-luxo-cozinha {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0,0,0,0.88);
      color: #ffd700;
      border: 1px solid rgba(212,175,55,0.7);
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 700;
      border-radius: 20px;
      letter-spacing: 0.5px;
    }
    .card-luxo-body {
      padding: 18px;
      background: linear-gradient(180deg, #161616 0%, #0a0a0a 100%);
      border-top: 1px solid rgba(212,175,55,0.25);
      flex-grow: 1;
    }
    .card-luxo-titulo {
      margin: 0 0 10px 0;
      color: #ffd700;
      font-size: 16px;
      font-weight: 700;
    }
    .card-luxo-desc {
      margin: 0;
      color: #f1f5f9;
      font-size: 13.5px;
      line-height: 1.55;
      background: rgba(212,175,55,0.06);
      padding: 10px 14px;
      border-radius: 6px;
      border-left: 3px solid #ffd700;
    }
  `;
  document.head.appendChild(css);

  window.abrirModalCinema = function(url, tit, desc) {
    let m = document.getElementById('modal-cinema-quantum');
    if (m) m.remove();
    m = document.createElement('div');
    m.id = 'modal-cinema-quantum';
    m.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.95);backdrop-filter:blur(14px);z-index:9999999999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';
    m.innerHTML = `
      <div style="position:relative;max-width:1000px;width:100%;max-height:85vh;display:flex;flex-direction:column;align-items:center;">
        <button id="fechar-cinema" style="position:absolute;top:-45px;right:0;background:none;border:none;color:#ffd700;font-size:36px;cursor:pointer;font-weight:bold;">&times;</button>
        <img src="${url}" style="max-width:100%;max-height:65vh;border-radius:12px;border:2px solid rgba(212,175,55,0.5);object-fit:contain;box-shadow:0 0 50px rgba(0,0,0,0.95);">
        <div style="width:100%;margin-top:14px;background:#111;border:1px solid #ffd700;padding:16px 20px;border-radius:10px;box-sizing:border-box;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:10px;flex-wrap:wrap;">
            <h3 style="margin:0;color:#ffd700;font-size:18px;">✦ ${tit}</h3>
            <span style="background:#222;color:#ffd700;border:1px solid rgba(212,175,55,0.4);font-size:11px;padding:3px 10px;border-radius:15px;font-weight:bold;">${TITULO_MENU}</span>
          </div>
          <p style="margin:0;color:#f1f5f9;font-size:14px;line-height:1.6;border-left:3px solid #ffd700;padding-left:12px;">${desc}</p>
        </div>
      </div>
    `;
    m.onclick = (e) => { if (e.target.id === 'modal-cinema-quantum' || e.target.id === 'fechar-cinema') m.remove(); };
    document.body.appendChild(m);
  };

  async function montarGaleriaCozinha() {
    const todosBotoes = Array.from(document.querySelectorAll('button, a'));
    const btnCozinha = todosBotoes.find(b => /COZINHA/i.test(b.innerText));
    if (!btnCozinha) return setTimeout(montarGaleriaCozinha, 300);

    btnCozinha.innerHTML = TITULO_MENU;

    const barra = btnCozinha.parentElement;
    const botoesMenu = Array.from(barra.querySelectorAll('button, a'));
    const secaoGaleria = document.getElementById('galeria-premium') || btnCozinha.closest('section') || document.body;

    let grid = document.getElementById('quantum-cozinha-grid');
    if (!grid) {
      grid = document.createElement('div');
      grid.id = 'quantum-cozinha-grid';
      barra.insertAdjacentElement('afterend', grid);
    }

    let fotos = [
      { url: 'fotos/cozinha/foto1.jpg', tit: 'Cozinha Americana com Ilha (1)', desc: DESC_PADRAO },
      { url: 'fotos/cozinha/foto2.jpg', tit: 'Cozinha Americana Completa (2)', desc: DESC_PADRAO },
      { url: 'fotos/cozinha/foto3.jpg', tit: 'Cozinha Americana Utensílios (3)', desc: DESC_PADRAO }
    ];

    try {
      const res = await fetch(`${SB_URL}/rest/v1/conteudos?select=*&order=created_at.asc`, {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const fotosSb = data.filter(i => /COZINHA/i.test(i.titulo || '') || /COZINHA/i.test(i.categoria || '') || /COZINHA/i.test(i.descricao || ''));
        if (fotosSb.length > 0) {
          fotos = fotosSb.map((f, i) => ({
            url: f.url,
            tit: f.titulo || `Cozinha Americana (${i + 1})`,
            desc: f.descricao || DESC_PADRAO
          }));
        }
      }
    } catch(e) {}

    grid.innerHTML = fotos.map(f => `
      <div class="card-luxo-cozinha">
        <div class="card-luxo-thumb" onclick="window.abrirModalCinema('${f.url}', '${f.tit.replace(/'/g, "\\'")}', '${f.desc.replace(/'/g, "\\'")}')">
          <img src="${f.url}" alt="${f.tit}" loading="lazy">
          <span class="badge-luxo-cozinha">${TITULO_MENU}</span>
        </div>
        <div class="card-luxo-body">
          <h4 class="card-luxo-titulo">✦ ${f.tit}</h4>
          <p class="card-luxo-desc">${f.desc}</p>
        </div>
      </div>
    `).join('');

    const outrosElementos = Array.from(secaoGaleria.children).filter(el => 
      el !== barra && el !== grid && !el.contains(barra) && !/H1|H2|HEADER/i.test(el.tagName) && !el.querySelector('h2')
    );

    function ativarCozinha() {
      outrosElementos.forEach(el => el.style.display = 'none');
      grid.style.display = 'grid';
      botoesMenu.forEach(b => {
        if (b === btnCozinha) {
          b.style.setProperty('background', '#ffd700', 'important');
          b.style.setProperty('color', '#000', 'important');
          b.style.setProperty('border-color', '#ffd700', 'important');
        } else {
          b.style.background = '';
          b.style.color = '';
          b.style.borderColor = '';
        }
      });
    }

    function desativarCozinha() {
      grid.style.display = 'none';
      outrosElementos.forEach(el => el.style.display = '');
      btnCozinha.style.background = '';
      btnCozinha.style.color = '';
      btnCozinha.style.borderColor = '';
    }

    btnCozinha.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      ativarCozinha();
    };

    botoesMenu.forEach(b => {
      if (b !== btnCozinha) {
        b.addEventListener('click', desativarCozinha);
      }
    });

    if (window.location.hash.includes('cozinha')) ativarCozinha();
  }

  function criarBotaoAdmin() {
    let b = document.getElementById('quantum-btn-trigger');
    if (!b) {
      b = document.createElement('button');
      b.id = 'quantum-btn-trigger';
      b.innerHTML = '⚡ ABRIR PAINEL QUÂNTICO';
      b.style.cssText = 'position:fixed;bottom:25px;right:25px;background:#ffd700;color:#000;border:3px solid #000;padding:16px 28px;border-radius:35px;z-index:999999998;cursor:pointer;font-weight:bold;font-size:16px;box-shadow:0 8px 30px rgba(0,0,0,0.9);';
      b.onclick = (e) => {
        e.preventDefault();
        window.location.href = `${SB_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin + window.location.pathname)}`;
      };
      document.body.appendChild(b);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { montarGaleriaCozinha(); criarBotaoAdmin(); });
  } else {
    montarGaleriaCozinha();
    criarBotaoAdmin();
  }
})();
