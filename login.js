(function() {
  if (window.__chacaraQuantumLoaded) return;
  window.__chacaraQuantumLoaded = true;

  const SB_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SB_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';

  // 1. Atualizar textos estáticos que possam existir na página
  function sincronizarTitulos() {
    document.querySelectorAll('button, a, span, h2, h3, h4').forEach(el => {
      if (el.children.length === 0) {
        const t = el.innerText.trim();
        if (t.includes('COZINHA & BAR') || t === 'COZINHA' || t === '☕ COZINHA') {
          el.innerText = '🍽️ COZINHA AMERICANA';
        }
      }
    });
  }
  setInterval(sincronizarTitulos, 1000);

  // 2. Procurar categorias e fotos adicionadas na plataforma
  async function carregarAlbunsReais() {
    try {
      const resCat = await fetch(`${SB_URL}/rest/v1/categorias?select=*&order=created_at.asc`, {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
      });
      const categorias = await resCat.json();

      const resMidia = await fetch(`${SB_URL}/rest/v1/conteudos?select=*,categorias(*)&order=created_at.desc`, {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
      });
      const midias = await resMidia.json();

      if (!categorias || categorias.length === 0) return;

      let vitrine = document.getElementById('vitrine-dinamica-quantum');
      if (!vitrine) {
        vitrine = document.createElement('section');
        vitrine.id = 'vitrine-dinamica-quantum';
        vitrine.style.cssText = 'max-width:1300px;margin:40px auto 60px auto;padding:0 20px;font-family:system-ui,sans-serif;';
        const alvo = document.querySelector('section#albuns, #galeria, #album-cozinha, main') || document.body;
        alvo.parentNode.insertBefore(vitrine, alvo);
      }

      vitrine.innerHTML = `
        <div style="text-align:center;margin-bottom:28px;">
          <span style="color:#ffd700;letter-spacing:3px;font-size:12px;font-weight:bold;text-transform:uppercase;">✦ ÁLBUNS EXCLUSIVOS ✦</span>
          <h2 style="color:#ffffff;font-size:30px;margin:6px 0 0 0;letter-spacing:1px;font-family:serif;">GALERIA DA CHÁCARA PROFITTER</h2>
        </div>
        <div id="abas-categorias-quantum" style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:30px;"></div>
        <div id="grade-fotos-quantum" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:24px;"></div>
      `;

      const abasBox = document.getElementById('abas-categorias-quantum');
      const gradeBox = document.getElementById('grade-fotos-quantum');
      const principais = categorias.filter(c => !c.pai_id);

      function exibirAba(catId, catNome) {
        abasBox.querySelectorAll('button').forEach(b => {
          if (b.dataset.id === String(catId)) {
            b.style.background = '#ffd700';
            b.style.color = '#000';
          } else {
            b.style.background = '#141414';
            b.style.color = '#ffd700';
          }
        });

        const termo = catNome.replace(/^[^\w\s\u00C0-\u017F]+\s*/, '').toLowerCase();
        const fotos = (midias || []).filter(m => {
          if (m.categoria_id && String(m.categoria_id) === String(catId)) return true;
          if (m.categorias && String(m.categorias.id) === String(catId)) return true;
          if (m.categoria && m.categoria.toLowerCase().includes(termo)) return true;
          if (m.titulo && m.titulo.toLowerCase().includes(termo)) return true;
          return false;
        });

        if (fotos.length === 0) {
          gradeBox.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;background:#111;border:1px dashed rgba(212,175,55,0.3);border-radius:12px;color:#ffd700;font-size:14px;">Nenhuma foto encontrada em <b>${catNome}</b>.</div>`;
          return;
        }

        let cardsHtml = '';
        fotos.forEach(f => {
          const tit = f.titulo || catNome;
          const desc = f.descricao || 'Ambiente exclusivo Chácara Profitter.';
          cardsHtml += `
            <div style="background:#0d0d0d;border:1px solid rgba(212,175,55,0.35);border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.85);display:flex;flex-direction:column;">
              <div style="position:relative;width:100%;aspect-ratio:16/10;overflow:hidden;background:#000;">
                <img src="${f.url}" alt="${tit}" style="width:100%;height:100%;object-fit:cover;">
                <span style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.85);color:#ffd700;border:1px solid rgba(212,175,55,0.6);font-size:11px;font-weight:bold;padding:4px 10px;border-radius:20px;">${catNome}</span>
              </div>
              <div style="padding:16px;background:linear-gradient(180deg,#161616 0%,#0a0a0a 100%);border-top:1px solid rgba(212,175,55,0.2);flex-grow:1;">
                <h4 style="margin:0 0 8px 0;color:#ffd700;font-size:15px;font-weight:bold;">✦ ${tit}</h4>
                <p style="margin:0;color:#f1f5f9;font-size:13px;line-height:1.5;background:rgba(212,175,55,0.06);padding:10px 12px;border-radius:6px;border-left:3px solid #ffd700;">${desc}</p>
              </div>
            </div>
          `;
        });
        gradeBox.innerHTML = cardsHtml;
      }

      principais.forEach(cat => {
        const btn = document.createElement('button');
        btn.dataset.id = cat.id;
        btn.innerText = cat.nome;
        btn.style.cssText = 'background:#141414;color:#ffd700;border:1px solid rgba(212,175,55,0.4);padding:9px 20px;border-radius:25px;font-size:13px;font-weight:bold;cursor:pointer;transition:0.3s;';
        btn.onclick = () => exibirAba(cat.id, cat.nome);
        abasBox.appendChild(btn);
      });

      const catPadrao = principais.find(c => c.nome.toUpperCase().includes('COZINHA')) || principais[0];
      if (catPadrao) exibirAba(catPadrao.id, catPadrao.nome);

    } catch (e) {
      console.warn('Erro ao carregar dados:', e);
    }
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
        window.location.href = `${SB_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin + window.location.pathname)}`;
      };
      document.body.appendChild(b);
    }
  }

  criarBotaoLogin();
  carregarAlbunsReais();
})();