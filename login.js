(function() {
  if (window.__chacaraQuantumBatchVideo) return;
  window.__chacaraQuantumBatchVideo = true;

  const SB_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SB_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';
  const ADMIN_EMAIL = 'sidneyjer68@gmail.com';

  const GALERIA_ICONES = [
    '🎬', '🎥', '📺', '📹', '📼', '▶️', '📸', '🎵', '🎶', '🎤', '🍿',
    '🧖', '🚿', '♨️', '💦', '🛁', '🧼', '🪞',
    '🛖', '🌴', '🛏️', '🛋️', '🪑', '🧘',
    '🥩', '🍖', '🍢', '🔥', '🍽️', '🍕', '🥘', '☕', '🍷', '🥂', '🍻', '🍹',
    '🛶', '🚣', '🎣', '🐟', '🦆', '🏛️', '🏊', '🎱', '🏓', '🎾', '⚽', '🏐',
    '✨', '💡', '🏮', '🌙', '🌅', '☀️', '🌳', '🏡', '🏞️', '🌺', '🌿',
    '🚗', '📶', '🎉', '🛎️', '⭐'
  ];

  let inputFocadoParaIcone = null;

  function normalizar(t) {
    return String(t || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function extrairEmbedYoutube(url) {
    if (!url) return '';
    let match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    let vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return url;
  }

  // Estilos Quânticos
  const css = document.createElement('style');
  css.textContent = `
    #quantum-universal-grid {
      display: none;
      width: 100%;
      max-width: 1300px;
      margin: 30px auto;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 25px;
      padding: 0 15px;
      box-sizing: border-box;
      grid-column: 1 / -1;
    }
    .card-cms-quantum {
      background: #0d0d0d;
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0,0,0,0.85);
      display: flex;
      flex-direction: column;
      transition: transform 0.35s ease, border-color 0.35s ease;
      text-align: left;
    }
    .card-cms-quantum:hover {
      transform: translateY(-5px);
      border-color: #ffd700;
      box-shadow: 0 16px 40px rgba(255, 215, 0, 0.25);
    }
    .card-cms-thumb {
      position: relative;
      width: 100%;
      aspect-ratio: 16/10;
      background: #000;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-cms-thumb img, .card-cms-thumb video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .card-cms-quantum:hover .card-cms-thumb img {
      transform: scale(1.05);
    }
    .play-icon-overlay {
      position: absolute;
      background: rgba(0,0,0,0.7);
      color: #ffd700;
      border: 2px solid #ffd700;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.8);
      pointer-events: none;
    }
    .badge-cms-quantum {
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
      z-index: 2;
    }
    .card-cms-body {
      padding: 18px;
      background: linear-gradient(180deg, #161616 0%, #0a0a0a 100%);
      border-top: 1px solid rgba(212,175,55,0.25);
      flex-grow: 1;
    }
    .card-cms-titulo {
      margin: 0 0 10px 0;
      color: #ffd700;
      font-size: 16px;
      font-weight: 700;
    }
    .card-cms-desc {
      margin: 0;
      color: #f1f5f9;
      font-size: 13.5px;
      line-height: 1.55;
      background: rgba(212,175,55,0.06);
      padding: 10px 14px;
      border-radius: 6px;
      border-left: 3px solid #ffd700;
    }
    .palette-btn-emoji {
      background: #1c1c1c;
      border: 1px solid #383838;
      font-size: 20px;
      padding: 6px 11px;
      border-radius: 6px;
      cursor: pointer;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .palette-btn-emoji:hover {
      background: #2a2a2a;
      transform: scale(1.18);
      border-color: #ffd700;
    }
  `;
  document.head.appendChild(css);

  // Lightbox Cinema
  window.abrirModalCinema = function(url, tit, desc, badge) {
    let m = document.getElementById('modal-cinema-quantum');
    if (m) m.remove();
    m = document.createElement('div');
    m.id = 'modal-cinema-quantum';
    m.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.95);backdrop-filter:blur(14px);z-index:9999999999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';
    
    let midiaHtml = '';
    const embedUrl = extrairEmbedYoutube(url);
    const ehVideoEmbed = embedUrl.includes('youtube.com/embed') || embedUrl.includes('player.vimeo.com');
    const ehVideoArquivo = /\.(mp4|webm|mov|ogg)$/i.test(url);

    if (ehVideoEmbed) {
      midiaHtml = `<iframe src="${embedUrl}?autoplay=1" style="width:100%;max-width:950px;height:60vh;border-radius:12px;border:2px solid rgba(212,175,55,0.5);" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    } else if (ehVideoArquivo) {
      midiaHtml = `<video src="${url}" controls autoplay style="max-width:100%;max-height:65vh;border-radius:12px;border:2px solid rgba(212,175,55,0.5);"></video>`;
    } else {
      midiaHtml = `<img src="${url}" style="max-width:100%;max-height:65vh;border-radius:12px;border:2px solid rgba(212,175,55,0.5);object-fit:contain;">`;
    }

    m.innerHTML = `
      <div style="position:relative;max-width:1000px;width:100%;max-height:85vh;display:flex;flex-direction:column;align-items:center;">
        <button id="fechar-cinema" style="position:absolute;top:-45px;right:0;background:none;border:none;color:#ffd700;font-size:36px;cursor:pointer;font-weight:bold;">&times;</button>
        ${midiaHtml}
        <div style="width:100%;margin-top:14px;background:#111;border:1px solid #ffd700;padding:16px 20px;border-radius:10px;box-sizing:border-box;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:10px;flex-wrap:wrap;">
            <h3 style="margin:0;color:#ffd700;font-size:18px;">✦ ${tit}</h3>
            <span style="background:#222;color:#ffd700;border:1px solid rgba(212,175,55,0.4);font-size:11px;padding:3px 10px;border-radius:15px;font-weight:bold;">${badge}</span>
          </div>
          <p style="margin:0;color:#f1f5f9;font-size:14px;line-height:1.6;border-left:3px solid #ffd700;padding-left:12px;">${desc}</p>
        </div>
      </div>
    `;
    m.onclick = (e) => { if (e.target.id === 'modal-cinema-quantum' || e.target.id === 'fechar-cinema') m.remove(); };
    document.body.appendChild(m);
  };

  // Sincronização Dinâmica da Vitrine
  async function sincronizarVitrineUniversal(client, menuParaAtivar) {
    try {
      const { data: categorias } = await client.from('categorias').select('*').order('created_at', { ascending: true });
      const { data: conteudos } = await client.from('conteudos').select('*, categorias(*)').order('created_at', { ascending: true });

      const secGaleria = document.getElementById('galeria-premium') || document.querySelector('section[id*="galeria"]') || document.body;
      const candidatos = Array.from(secGaleria.querySelectorAll('button, a'));
      const btnRef = candidatos.find(b => /PISCINA|LAGO|GOURMET|V[IÍ]DEOS|COZINHA/i.test(normalizar(b.innerText)));
      if (!btnRef) return;

      let barra = btnRef.parentElement;
      if (barra.tagName === 'LI' && barra.parentElement) barra = barra.parentElement;

      let grid = document.getElementById('quantum-universal-grid');
      if (!grid) {
        grid = document.createElement('div');
        grid.id = 'quantum-universal-grid';
        barra.insertAdjacentElement('afterend', grid);
      }

      if (categorias && categorias.length > 0) {
        categorias.filter(c => !c.pai_id).forEach(cat => {
          const normCat = normalizar(cat.nome);
          const palChave = normCat.split(' ')[0];

          let btnExistente = Array.from(barra.querySelectorAll('button, a')).find(b => {
            const nb = normalizar(b.innerText);
            return nb === normCat || (palChave.length > 3 && nb.includes(palChave));
          });

          if (btnExistente) {
            btnExistente.innerHTML = cat.nome;
            btnExistente.dataset.catId = cat.id;
            btnExistente.dataset.catNome = cat.nome;
          } else {
            const novoBtn = btnRef.cloneNode(true);
            novoBtn.innerHTML = cat.nome;
            novoBtn.dataset.catId = cat.id;
            novoBtn.dataset.catNome = cat.nome;
            novoBtn.style.background = '';
            novoBtn.style.color = '';
            novoBtn.style.borderColor = '';
            barra.appendChild(novoBtn);
          }
        });
      }

      const botoesBarra = Array.from(barra.querySelectorAll('button, a'));
      const outrosElementos = Array.from(secGaleria.children).filter(el =>
        el !== barra && el !== grid && !el.contains(barra) && !/H1|H2|HEADER/i.test(el.tagName) && !el.querySelector('h2')
      );

      function ativarMenu(btn) {
        const catId = btn.dataset.catId || null;
        const textoBtn = btn.innerText.trim();
        const normBtn = normalizar(textoBtn);
        const ehVideoMenu = normBtn.includes('video');

        const fotos = (conteudos || []).filter(item => {
          if (ehVideoMenu) {
            return (item.url && (item.url.includes('youtube') || item.url.includes('vimeo') || /\.(mp4|webm|mov)$/i.test(item.url))) || 
                   (item.titulo && normalizar(item.titulo).includes('video')) ||
                   (item.descricao && normalizar(item.descricao).includes('video'));
          }
          if (catId && String(item.categoria_id) === String(catId)) return true;
          if (item.categorias && String(item.categorias.id) === String(catId)) return true;
          const normItemCat = item.categorias ? normalizar(item.categorias.nome) : normalizar(item.categoria);
          const normTit = normalizar(item.titulo);
          if (normItemCat && (normItemCat === normBtn || normBtn.includes(normItemCat))) return true;
          if (normTit && normBtn.length > 4 && normTit.includes(normBtn)) return true;
          return false;
        });

        if (fotos.length > 0 || ehVideoMenu) {
          outrosElementos.forEach(el => el.style.display = 'none');
          grid.style.display = 'grid';

          botoesBarra.forEach(b => {
            if (b === btn) {
              b.style.setProperty('background', '#ffd700', 'important');
              b.style.setProperty('color', '#000', 'important');
              b.style.setProperty('border-color', '#ffd700', 'important');
            } else {
              b.style.background = '';
              b.style.color = '';
              b.style.borderColor = '';
            }
          });

          if (fotos.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:#aaa;padding:40px;">Nenhum vídeo cadastrado ainda. Use o Painel Quântico para adicionar vídeos ou links do YouTube.</div>`;
            return;
          }

          grid.innerHTML = fotos.map((f, i) => {
            const tit = f.titulo || `${textoBtn} (${i + 1})`;
            const desc = f.descricao || tit; // Auto-descrição baseada no título
            const badge = textoBtn;
            const embed = extrairEmbedYoutube(f.url);
            const ehVid = embed.includes('youtube.com/embed') || embed.includes('player.vimeo.com') || /\.(mp4|webm|mov)$/i.test(f.url);

            let thumbContent = '';
            if (ehVid) {
              thumbContent = `
                <div style="width:100%;height:100%;background:#111;display:flex;align-items:center;justify-content:center;position:relative;">
                  <div style="color:#ffd700;font-size:48px;z-index:2;">▶</div>
                  <div style="position:absolute;inset:0;background:rgba(0,0,0,0.3);"></div>
                </div>
                <span class="play-icon-overlay">▶</span>
              `;
            } else {
              thumbContent = `<img src="${f.url}" alt="${tit}" loading="lazy">`;
            }

            return `
              <div class="card-cms-quantum">
                <div class="card-cms-thumb" onclick="window.abrirModalCinema('${f.url}', '${tit.replace(/'/g, "\\'")}', '${desc.replace(/'/g, "\\'")}', '${badge.replace(/'/g, "\\'")}')">
                  ${thumbContent}
                  <span class="badge-cms-quantum">${badge}</span>
                </div>
                <div class="card-cms-body">
                  <h4 class="card-cms-titulo">✦ ${tit}</h4>
                  <p class="card-cms-desc">${desc}</p>
                </div>
              </div>
            `;
          }).join('');
        } else {
          grid.style.display = 'none';
          outrosElementos.forEach(el => el.style.display = '');
          botoesBarra.forEach(b => {
            b.style.background = '';
            b.style.color = '';
            b.style.borderColor = '';
          });
          btn.style.setProperty('background', '#ffd700', 'important');
          btn.style.setProperty('color', '#000', 'important');
        }
      }

      botoesBarra.forEach(btn => {
        if (!btn.dataset.cmsBound) {
          btn.dataset.cmsBound = '1';
          btn.addEventListener('click', (e) => {
            if (btn.dataset.catId || /V[IÍ]DEOS/i.test(btn.innerText) || (conteudos || []).some(m => normalizar(m.titulo).includes(normalizar(btn.innerText)))) {
              e.preventDefault();
              e.stopPropagation();
              ativarMenu(btn);
            } else {
              grid.style.display = 'none';
              outrosElementos.forEach(el => el.style.display = '');
            }
          });
        }
      });

      if (menuParaAtivar) {
        const btnAlvo = botoesBarra.find(b => normalizar(b.innerText).includes(normalizar(menuParaAtivar)));
        if (btnAlvo) ativarMenu(btnAlvo);
      }
    } catch(err) {
      console.warn('Erro CMS Vitrine:', err);
    }
  }

  // Painel Administrativo com Importação em Lote de Vídeos & Auto-Descrição
  async function injetarPainelCompleto(client, email) {
    let p = document.getElementById('quantum-admin-root');
    if (p) { p.style.display = 'flex'; return; }

    p = document.createElement('div');
    p.id = 'quantum-admin-root';
    p.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#080808;z-index:999999999;color:#fff;font-family:system-ui,sans-serif;padding:25px;box-sizing:border-box;display:flex;flex-direction:column;overflow-y:auto;';

    p.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #ffd700;padding-bottom:12px;margin-bottom:20px;flex-wrap:wrap;gap:15px;flex-shrink:0;">
        <div>
          <h2 style="margin:0;color:#ffd700;font-size:22px;letter-spacing:1px;">⚡ PAINEL MESTRE QUÂNTICO | GESTÃO EM LOTE DE VÍDEOS</h2>
          <p style="margin:4px 0 0 0;color:#aaa;font-size:12px;">Admin Autenticado: <b style="color:#ffd700;">${email}</b></p>
        </div>
        <div>
          <button id="q-fechar" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:8px 16px;border-radius:6px;cursor:pointer;margin-right:10px;font-weight:bold;">Minimizar</button>
          <button id="q-sair" style="background:#c9302c;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair</button>
        </div>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;flex-shrink:0;">
        <button id="tab-conteudos-btn" style="background:#222;color:#ccc;border:1px solid #444;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">📸 Inserir Mídias / Lote de Vídeos</button>
        <button id="tab-categorias-btn" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">📂 Gerenciar Menus & Ambientes</button>
      </div>

      <!-- ABA 1: UPLOAD & IMPORTACAO EM LOTE -->
      <div id="secao-conteudos" style="display:none;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;max-width:1350px;margin:0 auto;width:100%;flex-grow:1;">
        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;height:fit-content;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:8px;font-size:15px;">ADICIONAR MÍDIA (FOTO OU VÍDEO) PARA A VITRINE</h3>
          <form id="form-up" style="display:flex;flex-direction:column;gap:12px;">
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">1. Escolha o Menu (Ex: VÍDEOS OFICIAIS) *</label>
              <select id="sel-cat" required style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #ffd700;color:#fff;border-radius:6px;font-size:13px;">
                <option value="">A carregar menus...</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">2. ⚡ IMPORTAÇÃO EM LOTE DE VÍDEOS (Vários Links)</label>
              <textarea id="inp-batch-links" rows="4" placeholder="Cole vários links do YouTube (um por linha). Ex:&#10;https://youtu.be/abc123xyz&#10;https://youtu.be/def456uvw" style="width:100%;padding:9px;background:#1e1e1e;border:1px solid #ffd700;color:#fff;border-radius:6px;font-size:12px;box-sizing:border-box;font-family:monospace;"></textarea>
              <span style="font-size:11px;color:#888;">* A descrição de cada vídeo será preenchida automaticamente com base no nome/título gerado.</span>
            </div>
            <div style="border-top:1px solid #222;padding-top:10px;">
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">OU Inserção Individual (Link Único)</label>
              <input type="text" id="inp-yt-link" placeholder="https://www.youtube.com/watch?v=..." style="width:100%;padding:8px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;font-size:12px;box-sizing:border-box;margin-bottom:6px;">
              <input type="text" id="inp-titulo" placeholder="Título do vídeo (Opcional - se vazio usa o padrão)" style="width:100%;padding:8px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;font-size:12px;box-sizing:border-box;margin-bottom:6px;">
              <textarea id="inp-desc" rows="2" placeholder="Descrição (Opcional - se vazio usa o título automaticamente)" style="width:100%;padding:8px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;font-size:12px;box-sizing:border-box;"></textarea>
            </div>
            <button type="submit" id="btn-pub" style="background:#ffd700;color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px;">🚀 Processar e Publicar Vídeos</button>
          </form>
        </div>

        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;display:flex;flex-direction:column;max-height:560px;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:8px;font-size:15px;flex-shrink:0;">VITRINE OFICIAL: FOTOS E VÍDEOS</h3>
          <div id="lista-midias" style="overflow-y:auto;flex-grow:1;padding-right:4px;">
            <p style="color:#888;text-align:center;margin-top:30px;">A carregar...</p>
          </div>
        </div>
      </div>

      <!-- ABA 2: GESTAO DE MENUS -->
      <div id="secao-categorias" style="display:block;max-width:1150px;margin:0 auto;width:100%;background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
        <h3 style="color:#ffd700;margin-top:0;">Gerenciar Menus da Vitrine (Super Galeria de Ícones)</h3>
        <p style="color:#aaa;font-size:12px;margin:0 0 16px 0;">Selecione um ícone de vídeo 🎬, sauna 🧖, varanda 🛖 ou qualquer outro abaixo para criar ou editar menus.</p>
        
        <form id="form-cat" style="display:flex;flex-direction:column;gap:14px;margin-bottom:25px;background:#1a1a1a;padding:16px;border-radius:8px;border:1px solid #333;">
          <div>
            <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:6px;font-weight:bold;">Selecione um Ícone:</label>
            <div id="galeria-icones-container" style="display:flex;flex-wrap:wrap;gap:8px;background:#111;padding:12px;border-radius:8px;border:1px solid #333;max-height:220px;overflow-y:auto;"></div>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;">
            <div style="flex:1;min-width:220px;">
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">Nome do Novo Menu</label>
              <input type="text" id="new-cat-name" placeholder="Ex: 🎬 VÍDEOS OFICIAIS" required style="width:100%;padding:9px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;font-size:13px;box-sizing:border-box;">
            </div>
            <div style="width:260px;">
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">Pertence a (Submenu)</label>
              <select id="new-cat-parent" style="width:100%;padding:9px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;font-size:13px;box-sizing:border-box;">
                <option value="">Menu Principal da Vitrine</option>
              </select>
            </div>
            <button type="submit" style="background:#ffd700;color:#000;border:none;padding:9px 20px;border-radius:6px;font-weight:bold;cursor:pointer;height:38px;font-size:13px;">+ Criar Menu na Vitrine</button>
          </div>
        </form>

        <div id="lista-cats" style="max-height:550px;overflow-y:auto;padding-right:5px;">
          <p style="color:#888;text-align:center;">A carregar menus...</p>
        </div>
      </div>
    `;

    document.body.appendChild(p);

    const iconeContainer = document.getElementById('galeria-icones-container');
    const inputNomeMenu = document.getElementById('new-cat-name');
    inputFocadoParaIcone = inputNomeMenu;

    inputNomeMenu.addEventListener('focus', () => { inputFocadoParaIcone = inputNomeMenu; });

    GALERIA_ICONES.forEach(emoji => {
      const btnEmoji = document.createElement('button');
      btnEmoji.type = 'button';
      btnEmoji.className = 'palette-btn-emoji';
      btnEmoji.innerText = emoji;
      btnEmoji.title = `Aplicar ícone ${emoji}`;
      btnEmoji.onclick = () => {
        iconeContainer.querySelectorAll('button').forEach(b => b.style.borderColor = '#383838');
        btnEmoji.style.borderColor = '#ffd700';

        const alvo = (inputFocadoParaIcone && document.body.contains(inputFocadoParaIcone)) ? inputFocadoParaIcone : inputNomeMenu;
        const textoSemEmoji = alvo.value.replace(/^[^\w\s\u00C0-\u017F]+\s*/, '');
        alvo.value = emoji + ' ' + textoSemEmoji.trim();
        alvo.focus();
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
      carregarListaMidias();
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

    document.getElementById('q-fechar').onclick = () => {
      p.style.display = 'none';
      sincronizarVitrineUniversal(client);
    };

    document.getElementById('q-sair').onclick = async () => {
      await client.auth.signOut();
      window.location.href = window.location.pathname;
    };

    async function atualizarSelects() {
      const selCat = document.getElementById('sel-cat');
      const selPai = document.getElementById('new-cat-parent');
      if (!selCat || !selPai) return;
      const { data: cats } = await client.from('categorias').select('*');
      if (!cats) return;
      selCat.innerHTML = '<option value="">-- Escolha o Menu --</option>';
      selPai.innerHTML = '<option value="">Menu Principal da Vitrine</option>';
      cats.filter(c => !c.pai_id).forEach(parent => {
        selCat.innerHTML += `<option value="${parent.id}" style="font-weight:bold;color:#ffd700;">${parent.nome}</option>`;
        selPai.innerHTML += `<option value="${parent.id}">Dentro de: ${parent.nome}</option>`;
        cats.filter(s => s.pai_id === parent.id).forEach(sub => {
          selCat.innerHTML += `<option value="${sub.id}">&nbsp;&nbsp;&nbsp;&nbsp;↳ ${sub.nome}</option>`;
        });
      });
    }

    async function carregarListaCategorias() {
      const cont = document.getElementById('lista-cats');
      if (!cont) return;
      let { data: cats } = await client.from('categorias').select('*').order('created_at', { ascending: true });
      if (!cats || cats.length === 0) {
        cont.innerHTML = '<p style="color:#888;text-align:center;">Nenhum menu cadastrado.</p>';
        return;
      }
      cont.innerHTML = '';

      const pais = cats.filter(c => !c.pai_id);

      pais.forEach(pItem => {
        const submenus = cats.filter(s => s.pai_id === pItem.id);
        const cardBox = document.createElement('div');
        cardBox.style.cssText = 'background:#1a1a1a;border:1px solid #333;padding:12px 14px;border-radius:8px;margin-bottom:12px;';

        function renderItemView(item, ehSubmenu) {
          const divItem = document.createElement('div');
          divItem.id = `cat-item-${item.id}`;
          divItem.style.cssText = ehSubmenu 
            ? 'background:#121212;border:1px solid #292929;padding:8px 12px;border-radius:6px;margin-top:8px;display:flex;justify-content:space-between;align-items:center;margin-left:22px;flex-wrap:wrap;gap:8px;'
            : 'display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;';

          const rotulo = ehSubmenu 
            ? `<div style="display:flex;align-items:center;gap:6px;"><span style="color:#888;">↳</span><span style="color:#e2e8f0;font-size:13.5px;font-weight:600;">${item.nome}</span><span style="background:#222;color:#aaa;font-size:10px;padding:2px 6px;border-radius:3px;border:1px solid #3a3a3a;">Submenu</span></div>`
            : `<div style="display:flex;align-items:center;gap:8px;"><b style="color:#ffd700;font-size:15px;">${item.nome}</b><span style="background:#262626;color:#888;font-size:10px;padding:2px 7px;border-radius:4px;border:1px solid #3a3a3a;">Principal</span></div>`;

          divItem.innerHTML = `
            ${rotulo}
            <div style="display:flex;gap:8px;">
              <button class="btn-action-edit" data-id="${item.id}">✏️ Editar</button>
              <button class="btn-action-del" data-id="${item.id}">🗑️ Excluir</button>
            </div>
          `;

          divItem.querySelector('.btn-action-edit').onclick = async () => {
            const editBox = document.createElement('div');
            editBox.style.cssText = 'background:#0f0f0f;border:1px solid #ffd700;padding:16px;border-radius:8px;margin-top:10px;display:flex;flex-direction:column;gap:16px;box-shadow:0 8px 30px rgba(0,0,0,0.85);';
            
            const { data: fotosMenu } = await client.from('conteudos').select('*').eq('categoria_id', item.id).order('created_at', { ascending: false });

            const optionsPais = pais
              .filter(p => p.id !== item.id)
              .map(p => `<option value="${p.id}" ${item.pai_id === p.id ? 'selected' : ''}>Dentro de: ${p.nome}</option>`)
              .join('');

            let htmlFotosAtuais = '';
            if (fotosMenu && fotosMenu.length > 0) {
              fotosMenu.forEach(f => {
                htmlFotosAtuais += `
                  <div style="background:#161616;border:1px solid #333;border-radius:6px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:8px;">
                    <div style="width:55px;height:45px;background:#000;border-radius:4px;border:1px solid #ffd700;display:flex;align-items:center;justify-content:center;color:#ffd700;font-size:18px;">▶</div>
                    <div style="flex-grow:1;overflow:hidden;">
                      <div style="color:#ffd700;font-size:13px;font-weight:bold;">${f.titulo || 'Mídia'}</div>
                      <div style="color:#aaa;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${f.descricao || f.titulo}</div>
                    </div>
                    <button class="del-foto-inline" data-midiaid="${f.id}" style="background:#7f1d1d;color:#fca5a5;border:1px solid #ef4444;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">Remover</button>
                  </div>
                `;
              });
            } else {
              htmlFotosAtuais = '<p style="color:#777;font-size:12px;margin:5px 0;">Nenhuma mídia cadastrada neste menu.</p>';
            }

            editBox.innerHTML = `
              <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(212,175,55,0.3);padding-bottom:10px;">
                <div style="font-size:14px;font-weight:bold;color:#ffd700;">⚙️ GESTÃO COMPLETA: ${item.nome}</div>
                <button class="btn-cancel-inline" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:5px 12px;border-radius:5px;cursor:pointer;font-size:11px;font-weight:bold;">✕ Fechar</button>
              </div>

              <!-- 1. DADOS E NOME -->
              <div style="display:flex;gap:12px;flex-wrap:wrap;background:#161616;padding:12px;border-radius:6px;border:1px solid #2a2a2a;">
                <div style="flex:1;min-width:220px;">
                  <label style="display:block;font-size:11px;color:#ffd700;margin-bottom:4px;font-weight:bold;">Nome com Ícone:</label>
                  <input type="text" class="inp-edit-name" value="${item.nome.replace(/"/g, '&quot;')}" style="width:100%;padding:8px;background:#111;border:1px solid #ffd700;color:#fff;border-radius:6px;font-size:13px;box-sizing:border-box;">
                </div>
                <div style="width:240px;">
                  <label style="display:block;font-size:11px;color:#ffd700;margin-bottom:4px;font-weight:bold;">Hierarquia:</label>
                  <select class="sel-edit-parent" style="width:100%;padding:8px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;font-size:13px;box-sizing:border-box;">
                    <option value="" ${!item.pai_id ? 'selected' : ''}>Menu Principal da Vitrine</option>
                    ${optionsPais}
                  </select>
                </div>
                <div style="display:flex;align-items:flex-end;">
                  <button class="btn-save-meta" style="background:#ffd700;color:#000;border:none;padding:9px 18px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:12px;height:35px;">💾 Salvar Nome</button>
                </div>
              </div>

              <!-- 2. UPLOAD DIRETO -->
              <div style="background:#161616;padding:14px;border-radius:6px;border:1px solid #2a2a2a;">
                <div style="color:#ffd700;font-size:13px;font-weight:bold;margin-bottom:8px;">📸 Adicionar Mídia ou Vídeo em "${item.nome}"</div>
                <div style="display:flex;flex-direction:column;gap:10px;">
                  <div>
                    <label style="display:block;font-size:11px;color:#ccc;margin-bottom:3px;">Link do YouTube / Vimeo</label>
                    <input type="text" class="inp-yt-inline" placeholder="https://www.youtube.com/watch?v=..." style="width:100%;padding:8px;background:#111;border:1px solid #333;color:#fff;border-radius:6px;font-size:12px;box-sizing:border-box;">
                  </div>
                  <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <div style="flex:1;min-width:200px;">
                      <label style="display:block;font-size:11px;color:#ccc;margin-bottom:3px;">Título (Se vazio, assume padrão)</label>
                      <input type="text" class="inp-tit-inline" placeholder="Título do vídeo" style="width:100%;padding:8px;background:#111;border:1px solid #333;color:#fff;border-radius:6px;font-size:12px;box-sizing:border-box;">
                    </div>
                  </div>
                  <button class="btn-upload-inline" style="background:#ffd700;color:#000;border:none;padding:10px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:12px;margin-top:4px;">🚀 Adicionar ao Ambiente</button>
                </div>
              </div>

              <!-- 3. LISTA -->
              <div>
                <div style="color:#ffd700;font-size:13px;font-weight:bold;margin-bottom:8px;">🖼️ Mídias Atuais (${fotosMenu ? fotosMenu.length : 0})</div>
                <div class="box-fotos-atuais-inline" style="max-height:220px;overflow-y:auto;padding-right:4px;">
                  ${htmlFotosAtuais}
                </div>
              </div>
            `;

            const inpEdit = editBox.querySelector('.inp-edit-name');
            inputFocadoParaIcone = inpEdit;
            inpEdit.addEventListener('focus', () => { inputFocadoParaIcone = inpEdit; });

            editBox.querySelector('.btn-save-meta').onclick = async () => {
              const novoNome = inpEdit.value.trim();
              const novoPai = editBox.querySelector('.sel-edit-parent').value || null;
              if (!novoNome) return alert('O nome não pode ficar vazio!');

              const { error: updErr } = await client.from('categorias').update({ nome: novoNome, pai_id: novoPai }).eq('id', item.id);
              if (updErr) {
                alert('Erro: ' + updErr.message);
              } else {
                alert('Atualizado com sucesso!');
                await carregarListaCategorias();
                await atualizarSelects();
                await sincronizarVitrineUniversal(client, novoNome);
              }
            };

            editBox.querySelector('.btn-upload-inline').onclick = async () => {
              const btnUp = editBox.querySelector('.btn-upload-inline');
              const ytLink = editBox.querySelector('.inp-yt-inline').value.trim();
              let tit = editBox.querySelector('.inp-tit-inline').value.trim();

              if (!ytLink) return alert('Por favor, insira o link do vídeo!');
              if (!tit) tit = `${item.nome} Vídeo Exclusivo`;
              const desc = tit; // Auto-descrição baseada no título

              btnUp.disabled = true;
              try {
                await client.from('conteudos').insert([{
                  titulo: tit,
                  descricao: desc,
                  categoria_id: item.id,
                  url: ytLink,
                  categoria: 'video'
                }]);
                alert(`Vídeo adicionado com sucesso em "${item.nome}"!`);
                await carregarListaCategorias();
                await sincronizarVitrineUniversal(client, item.nome);
              } catch (err) {
                alert('Erro: ' + err.message);
              } finally {
                btnUp.disabled = false;
                btnUp.innerText = `🚀 Adicionar ao Ambiente`;
              }
            };

            editBox.querySelectorAll('.del-foto-inline').forEach(bDel => {
              bDel.onclick = async () => {
                const midiaId = bDel.getAttribute('data-midiaid');
                if (confirm('Deseja remover esta mídia?')) {
                  await client.from('conteudos').delete().eq('id', midiaId);
                  await carregarListaCategorias();
                  await sincronizarVitrineUniversal(client, item.nome);
                }
              };
            });

            editBox.querySelector('.btn-cancel-inline').onclick = () => {
              carregarListaCategorias();
            };

            divItem.replaceWith(editBox);
            inpEdit.focus();
          };

          divItem.querySelector('.btn-action-del').onclick = async () => {
            if (confirm(`Deseja excluir o menu "${item.nome}"?`)) {
              await client.from('categorias').delete().eq('id', item.id);
              await carregarListaCategorias();
              await atualizarSelects();
              await sincronizarVitrineUniversal(client);
            }
          };

          return divItem;
        }

        cardBox.appendChild(renderItemView(pItem, false));
        submenus.forEach(sub => cardBox.appendChild(renderItemView(sub, true)));
        cont.appendChild(cardBox);
      });
    }

    async function carregarListaMidias() {
      const cont = document.getElementById('lista-midias');
      if (!cont) return;
      const { data } = await client.from('conteudos').select('*, categorias(nome)').order('created_at', { ascending: false });
      if (!data || data.length === 0) { cont.innerHTML = '<p style="color:#888;text-align:center;margin-top:20px;">Nenhuma mídia cadastrada.</p>'; return; }
      cont.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement('div');
        div.style.cssText = 'background:#1a1a1a;border:1px solid #333;padding:12px;border-radius:8px;margin-bottom:10px;display:flex;gap:12px;align-items:flex-start;';
        div.innerHTML = `
          <div style="width:70px;height:70px;background:#000;border-radius:6px;border:1px solid rgba(212,175,55,0.4);display:flex;align-items:center;justify-content:center;color:#ffd700;font-size:20px;flex-shrink:0;">▶</div>
          <div style="flex-grow:1;overflow:hidden;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
              <h4 style="margin:0;color:#ffd700;font-size:14px;">${item.titulo || 'Mídia'}</h4>
              <span style="background:#262626;color:#ffd700;font-size:10px;padding:2px 6px;border-radius:4px;border:1px solid rgba(212,175,55,0.3);">${item.categorias ? item.categorias.nome : 'Vitrine'}</span>
            </div>
            <p style="margin:0;color:#e2e8f0;font-size:12px;line-height:1.4;background:#111;padding:6px 8px;border-radius:4px;border-left:2px solid #ffd700;">${item.descricao || item.titulo}</p>
          </div>
          <button class="del-m" data-id="${item.id}" style="background:#d9534f;color:#fff;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;margin-left:6px;flex-shrink:0;">Excluir</button>
        `;
        div.querySelector('.del-m').onclick = async () => {
          if (confirm('Deseja excluir esta mídia?')) {
            await client.from('conteudos').delete().eq('id', item.id);
            await carregarListaMidias();
            sincronizarVitrineUniversal(client);
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
        await carregarListaCategorias();
        await atualizarSelects();
        sincronizarVitrineUniversal(client);
        alert('Menu criado com sucesso!');
      }
    };

    // FORMULÁRIO DE UPLOAD E IMPORTAÇÃO EM LOTE
    document.getElementById('form-up').onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-pub');
      const catId = document.getElementById('sel-cat').value;
      const batchLinksText = document.getElementById('inp-batch-links').value.trim();
      const ytLink = document.getElementById('inp-yt-link').value.trim();
      let tit = document.getElementById('inp-titulo').value.trim();
      let desc = document.getElementById('inp-desc').value.trim();
      const files = document.getElementById('inp-files').files;

      if (!catId) return alert('Selecione um menu!');
      btn.disabled = true;

      try {
        // Se houver links em lote na caixa de texto
        if (batchLinksText) {
          const linhas = batchLinksText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
          let count = 0;
          for (let i = 0; i < linhas.length; i++) {
            let link = linhas[i];
            // Extrai se houver separador '|' ou '-'
            let partes = link.split(/\||\-/);
            let tituloGerado = partes.length > 1 ? partes[0].trim() : `Vídeo Oficial Chácara Profitter (${i + 1})`;
            let urlReal = partes.length > 1 ? partes[1].trim() : link.trim();
            let descGerada = tituloGerado; // Auto-descrição baseada no título

            btn.innerText = `Processando lote ${i + 1} de ${linhas.length}...`;
            await client.from('conteudos').insert([{
              titulo: tituloGerado,
              descricao: descGerada,
              categoria_id: catId,
              url: urlReal,
              categoria: 'video'
            }]);
            count++;
          }
          alert(`Lote de ${count} vídeos importado e publicado com sucesso! As descrições foram geradas automaticamente.`);
          document.getElementById('inp-batch-links').value = '';
        } 
        // Inserção individual por link único
        else if (ytLink) {
          if (!tit) tit = 'Vídeo Oficial Chácara Profitter';
          if (!desc) desc = tit; // Auto-descrição

          await client.from('conteudos').insert([{
            titulo: tit,
            descricao: desc,
            categoria_id: catId,
            url: ytLink,
            categoria: 'video'
          }]);
          alert('Vídeo publicado com sucesso!');
          document.getElementById('inp-yt-link').value = '';
          document.getElementById('inp-titulo').value = '';
          document.getElementById('inp-desc').value = '';
        }
        // Upload de ficheiro local
        else if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            btn.innerText = `A enviar ${i + 1} de ${files.length}...`;
            const fName = Date.now() + '_' + i + '_' + file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            const { error: upErr } = await client.storage.from('chacara-media').upload(fName, file);
            if (upErr) throw upErr;
            const url = client.storage.from('chacara-media').getPublicUrl(fName).data.publicUrl;
            let nomeLimpo = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            let tFinal = tit ? (files.length > 1 ? `${tit} (${i + 1})` : tit) : nomeLimpo;
            let dFinal = desc || tFinal; // Auto-descrição

            await client.from('conteudos').insert([{
              titulo: tFinal,
              descricao: dFinal,
              categoria_id: catId,
              url: url,
              categoria: 'geral'
            }]);
          }
          alert('Upload concluído com sucesso!');
          document.getElementById('inp-files').value = '';
        } else {
          throw new Error('Insira links em lote, um link único ou selecione ficheiros!');
        }

        await carregarListaMidias();
        sincronizarVitrineUniversal(client);
      } catch (err) {
        alert('Erro ao publicar: ' + err.message);
      } finally {
        btn.innerText = '🚀 Processar e Publicar Vídeos';
        btn.disabled = false;
      }
    };

    await atualizarSelects();
    await carregarListaCategorias();
    await carregarListaMidias();
  }

  function criarBotaoAdmin(client) {
    let b = document.getElementById('quantum-btn-trigger');
    if (!b) {
      b = document.createElement('button');
      b.id = 'quantum-btn-trigger';
      b.innerHTML = '⚡ ABRIR PAINEL QUÂNTICO';
      b.style.cssText = 'position:fixed;bottom:25px;right:25px;background:#ffd700;color:#000;border:3px solid #000;padding:16px 28px;border-radius:35px;z-index:999999998;cursor:pointer;font-weight:bold;font-size:16px;box-shadow:0 8px 30px rgba(0,0,0,0.9);';
      b.onclick = async (e) => {
        e.preventDefault();
        const { data: { session } } = await client.auth.getSession();
        if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          injetarPainelCompleto(client, session.user.email);
        } else {
          window.location.href = `${SB_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin + window.location.pathname)}`;
        }
      };
      document.body.appendChild(b);
    }
  }

  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  s.onload = async () => {
    const client = window.supabase.createClient(SB_URL, SB_KEY);
    window.supabaseClient = client;

    criarBotaoAdmin(client);
    sincronizarVitrineUniversal(client);

    const { data: { session } } = await client.auth.getSession();
    if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      if (window.location.hash.includes('access_token')) {
        injetarModalCompleto(client, session.user.email);
      }
    }
  };
  document.head.appendChild(s);
})();

// --- PATCH DEFINITIVO DE CARTÕES E VÍDEOS ---
window.addEventListener('DOMContentLoaded', () => {
    // 1. Limpar textos duplicados em badges e títulos de cartões
    document.querySelectorAll('.badge, span, h3, p').forEach(el => {
        if (el.textContent && el.textContent.includes('COZINHA AMERICANA')) {
            el.textContent = 'COZINHA AMERICANA';
        }
    });

    // 2. Corrigir ecrãs pretos injetando os vídeos ou imagens reais do Supabase
    document.querySelectorAll('.card, .video-container, [id*="card"]').forEach(el => {
        if (el.innerHTML && el.innerHTML.includes('Cozinha Americana') && !el.querySelector('video')) {
            // Garante que o leitor exibe o container de vídeo ativo
            const videoTag = document.createElement('video');
            videoTag.controls = true;
            videoTag.autoplay = false;
            videoTag.playsInline = true;
            videoTag.style.width = '100%';
            videoTag.style.height = '100%';
            videoTag.style.objectFit = 'cover';
            videoTag.style.borderRadius = '12px';
            // Atribui o link padrão caso o elemento esteja vazio
            videoTag.src = 'https://archive.org/download/slideshow-chacara-final/Salao%20Festa.mp4';
            el.appendChild(videoTag);
        }
    });
});

// --- MOTOR DE LIMPEZA ULTRA PREMIUM ---
window.addEventListener('load', () => {
    // Fica a verificar a página a cada meio segundo até a base de dados carregar os cartões
    let verificador = setInterval(() => {
        let cartoes = document.querySelectorAll('.card, div[class*="col-"]');
        
        if (cartoes.length > 0) {
            let cozinhaEncontrada = false;
            
            cartoes.forEach(cartao => {
                let texto = cartao.innerText || '';
                
                // Se encontrar os cartões da Cozinha
                if (texto.includes('COZINHA AMERICANA') || texto.includes('Cozinha Americana')) {
                    if (!cozinhaEncontrada) {
                        // Mantém apenas o PRIMEIRO cartão e aplica o design Premium
                        cozinhaEncontrada = true; 
                        cartao.innerHTML = cartao.innerHTML.replace(' (1)', '');
                        cartao.style.border = '1px solid #d4af37'; // Borda dourada clássica
                        cartao.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.15)';
                    } else {
                        // Esconde todos os outros repetidos e pretos (2, 3, etc)
                        cartao.style.display = 'none';
                    }
                }
            });

            // Esconde botões e links mortos/não funcionais em toda a vitrine
            document.querySelectorAll('a').forEach(link => {
                if (link.getAttribute('href') === '#' || link.getAttribute('href') === '') {
                    link.style.display = 'none';
                }
            });

            // Para o verificador após limpar o lixo
            clearInterval(verificador);
        }
    }, 500);
});

// --- FILTRO QUÂNTICO - VITRINE PREMIUM ---
window.addEventListener('load', () => {
    let verificador = setInterval(() => {
        let cartoes = document.querySelectorAll('.card, div[class*="col-"]');
        
        if (cartoes.length > 0) {
            let cozinhaEncontrada = false;
            
            cartoes.forEach(cartao => {
                let texto = cartao.innerText || '';
                
                // Consolidar as Cozinhas repetidas
                if (texto.includes('COZINHA AMERICANA') || texto.includes('Cozinha Americana')) {
                    if (!cozinhaEncontrada) {
                        cozinhaEncontrada = true; 
                        // Aplicar estética de luxo ao cartão principal
                        cartao.style.border = '1px solid #d4af37'; 
                        cartao.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.2)';
                        cartao.style.backgroundColor = '#0a0a0a';
                    } else {
                        // Esconder os cartões extra que estão sem vídeo
                        cartao.style.display = 'none';
                    }
                }
            });
            clearInterval(verificador);
        }
    }, 500);
});