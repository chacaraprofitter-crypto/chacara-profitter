(function() {
  if (window.__chacaraQuantumLoaded) return;
  window.__chacaraQuantumLoaded = true;

  const SB_URL = 'https://coeqgbxxxwvlprdwrkqp.supabase.co';
  const SB_KEY = 'sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm';
  const ADMIN_EMAIL = 'sidneyjer68@gmail.com';

  const GALERIA_ICONES = ['🛋️', '📺', '🛏️', '🍽️', '🏊', '🌳', '🥩', '🍷', '☕', '🚿', '🎉', '🎬', '🎾', '⚽', '🚗', '🌿', '☀️', '🌙', '🔥', '⭐', '🛎️'];

  // Injeção de Estilos Ultra Premium
  const estilo = document.createElement('style');
  estilo.innerHTML = `
    .card-midia-quantum {
      background: #0d0d0d;
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85);
      transition: all 0.35s ease;
      display: flex;
      flex-direction: column;
    }
    .card-midia-quantum:hover {
      border-color: #ffd700;
      transform: translateY(-4px);
      box-shadow: 0 14px 40px rgba(255, 215, 0, 0.22);
    }
    .img-box-quantum {
      position: relative;
      width: 100%;
      aspect-ratio: 16/10;
      overflow: hidden;
      background: #000;
      cursor: pointer;
    }
    .img-box-quantum img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .card-midia-quantum:hover .img-box-quantum img {
      transform: scale(1.05);
    }
    .badge-cat-quantum {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.85);
      color: #ffd700;
      border: 1px solid rgba(212, 175, 55, 0.6);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      text-transform: uppercase;
    }
    .info-box-quantum {
      padding: 16px;
      background: linear-gradient(180deg, #161616 0%, #0a0a0a 100%);
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      flex-grow: 1;
    }
    .titulo-foto-quantum {
      margin: 0 0 8px 0;
      color: #ffd700;
      font-size: 15px;
      font-weight: 700;
    }
    .desc-foto-quantum {
      margin: 0;
      color: #f1f5f9;
      font-size: 13px;
      line-height: 1.5;
      background: rgba(212, 175, 55, 0.05);
      padding: 10px 12px;
      border-radius: 6px;
      border-left: 3px solid #ffd700;
    }
  `;
  document.head.appendChild(estilo);

  // Modal Cinema Lightbox
  window.abrirModalCinema = function(url, titulo, desc, cat) {
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
            <h3 style="margin:0;color:#ffd700;font-size:18px;">✦ ${titulo}</h3>
            <span style="background:#222;color:#ffd700;border:1px solid rgba(212,175,55,0.4);font-size:11px;padding:3px 10px;border-radius:15px;font-weight:bold;">${cat}</span>
          </div>
          <p style="margin:0;color:#f1f5f9;font-size:14px;line-height:1.6;border-left:3px solid #ffd700;padding-left:12px;">${desc}</p>
        </div>
      </div>
    `;
    m.onclick = (e) => { if (e.target.id === 'modal-cinema-quantum' || e.target.id === 'fechar-cinema') m.remove(); };
    document.body.appendChild(m);
  };

  // Carregar Menus e Fotos na Vitrine do Site
  async function carregarVitrineDinamica(client) {
    try {
      const { data: categorias } = await client.from('categorias').select('*').order('created_at', { ascending: true });
      const { data: conteudos } = await client.from('conteudos').select('*, categorias(*)').order('created_at', { ascending: false });

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
            b.style.borderColor = '#ffd700';
          } else {
            b.style.background = '#141414';
            b.style.color = '#ffd700';
            b.style.borderColor = 'rgba(212,175,55,0.4)';
          }
        });

        const termo = catNome.replace(/^[^\w\s\u00C0-\u017F]+\s*/, '').toLowerCase();
        const fotos = (conteudos || []).filter(m => {
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
          const tit = (f.titulo || catNome).replace(/"/g, '&quot;');
          const desc = (f.descricao || 'Ambiente exclusivo Chácara Profitter.').replace(/"/g, '&quot;');
          cardsHtml += `
            <div class="card-midia-quantum">
              <div class="img-box-quantum" onclick="window.abrirModalCinema('${f.url}', '${tit}', '${desc}', '${catNome}')">
                <img src="${f.url}" alt="${tit}" loading="lazy">
                <span class="badge-cat-quantum">${catNome}</span>
              </div>
              <div class="info-box-quantum">
                <h4 class="titulo-foto-quantum">✦ ${tit}</h4>
                <p class="desc-foto-quantum">${desc}</p>
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
      console.warn('Erro ao sincronizar vitrine:', e);
    }
  }

  // Painel Administrativo de Gestão Total
  async function injetarPainelCompleto(client, email) {
    let p = document.getElementById('quantum-admin-root');
    if (p) { p.style.display = 'flex'; return; }

    p = document.createElement('div');
    p.id = 'quantum-admin-root';
    p.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#080808;z-index:999999999;color:#fff;font-family:system-ui,sans-serif;padding:25px;box-sizing:border-box;display:flex;flex-direction:column;overflow-y:auto;';

    p.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #ffd700;padding-bottom:12px;margin-bottom:20px;flex-wrap:wrap;gap:15px;flex-shrink:0;">
        <div>
          <h2 style="margin:0;color:#ffd700;font-size:22px;letter-spacing:1px;">⚡ PAINEL MESTRE QUÂNTICO | GESTÃO TOTAL</h2>
          <p style="margin:4px 0 0 0;color:#aaa;font-size:12px;">Admin Autenticado: <b style="color:#ffd700;">${email}</b></p>
        </div>
        <div>
          <button id="q-fechar" style="background:#222;color:#ffd700;border:1px solid #ffd700;padding:8px 16px;border-radius:6px;cursor:pointer;margin-right:10px;font-weight:bold;">Minimizar</button>
          <button id="q-sair" style="background:#c9302c;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;">Sair</button>
        </div>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;flex-shrink:0;">
        <button id="tab-conteudos-btn" style="background:#ffd700;color:#000;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">📸 Inserir / Excluir Fotos e Vídeos</button>
        <button id="tab-categorias-btn" style="background:#222;color:#ccc;border:1px solid #444;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;">📂 Gerenciar Menus e Submenus</button>
      </div>

      <!-- ABA 1: FOTOS -->
      <div id="secao-conteudos" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;max-width:1350px;margin:0 auto;width:100%;flex-grow:1;">
        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;height:fit-content;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:8px;font-size:15px;">Enviar Ficheiros em Lote</h3>
          <form id="form-up" style="display:flex;flex-direction:column;gap:12px;">
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">1. Escolha o Menu *</label>
              <select id="sel-cat" required style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #ffd700;color:#fff;border-radius:6px;font-size:13px;">
                <option value="">A carregar menus...</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">2. Selecionar Fotos ou Vídeos *</label>
              <input type="file" id="inp-files" accept="image/*,video/*" multiple required style="width:100%;color:#fff;padding:8px;background:#1e1e1e;border:1px solid #444;border-radius:6px;cursor:pointer;font-size:12px;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">3. Título do Ambiente</label>
              <input type="text" id="inp-titulo" placeholder="Ex: Cozinha Americana Completa" style="width:100%;padding:9px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;font-size:13px;">
            </div>
            <div>
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">4. Descrição Ultra Premium</label>
              <textarea id="inp-desc" rows="3" placeholder="Ex: ampla cozinha americana com ilha..." style="width:100%;padding:9px;background:#1e1e1e;border:1px solid #333;color:#fff;border-radius:6px;font-size:13px;"></textarea>
            </div>
            <button type="submit" id="btn-pub" style="background:#ffd700;color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px;">🚀 Publicar no Menu</button>
          </form>
        </div>

        <div style="background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;display:flex;flex-direction:column;max-height:560px;">
          <h3 style="color:#ffd700;margin-top:0;border-bottom:1px solid #222;padding-bottom:8px;font-size:15px;flex-shrink:0;">Mídias Cadastradas</h3>
          <div id="lista-midias" style="overflow-y:auto;flex-grow:1;padding-right:4px;">
            <p style="color:#888;text-align:center;margin-top:30px;">A carregar...</p>
          </div>
        </div>
      </div>

      <!-- ABA 2: MENUS -->
      <div id="secao-categorias" style="display:none;max-width:1000px;margin:0 auto;width:100%;background:#141414;padding:20px;border-radius:12px;border:1px solid #282828;">
        <h3 style="color:#ffd700;margin-top:0;">Gerenciar Menus da Vitrine com Ícones</h3>
        <form id="form-cat" style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px;background:#1a1a1a;padding:16px;border-radius:8px;">
          <div>
            <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:4px;font-weight:bold;">Selecione um Ícone da Galeria:</label>
            <div id="galeria-icones-container" style="display:flex;flex-wrap:wrap;gap:8px;background:#111;padding:10px;border-radius:6px;border:1px solid #333;"></div>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;">
            <div style="flex:1;min-width:220px;">
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">Nome do Menu</label>
              <input type="text" id="new-cat-name" placeholder="Ex: 🍽️ COZINHA AMERICANA" required style="width:100%;padding:9px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;font-size:13px;">
            </div>
            <div style="width:260px;">
              <label style="display:block;font-size:12px;color:#ffd700;margin-bottom:3px;font-weight:bold;">Pertence a (Submenu)</label>
              <select id="new-cat-parent" style="width:100%;padding:9px;background:#111;border:1px solid #444;color:#fff;border-radius:6px;font-size:13px;">
                <option value="">Menu Principal</option>
              </select>
            </div>
            <button type="submit" style="background:#ffd700;color:#000;border:none;padding:9px 20px;border-radius:6px;font-weight:bold;cursor:pointer;height:38px;font-size:13px;">+ Criar Menu na Vitrine</button>
          </div>
        </form>
        <div id="lista-cats" style="max-height:420px;overflow-y:auto;">
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
      btnEmoji.style.cssText = 'background:#222;border:1px solid #444;font-size:22px;padding:8px 12px;border-radius:6px;cursor:pointer;';
      btnEmoji.onclick = () => {
        iconeContainer.querySelectorAll('button').forEach(b => b.style.border = '1px solid #444');
        btnEmoji.style.border = '2px solid #ffd700';
        const textoAtual = inputNomeMenu.value.replace(/^[^\w\s\u00C0-\u017F]+\s*/, '');
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

    document.getElementById('q-fechar').onclick = () => { p.style.display = 'none'; carregarVitrineDinamica(client); };
    document.getElementById('q-sair').onclick = async () => { await client.auth.signOut(); window.location.href = window.location.pathname; };

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
      let { data: cats } = await client.from('categorias').select('*');
      if (!cats || cats.length === 0) { cont.innerHTML = '<p style="color:#888;text-align:center;">Nenhum menu cadastrado.</p>'; return; }
      cont.innerHTML = '';
      cats.filter(c => !c.pai_id).forEach(pItem => {
        const submenus = cats.filter(s => s.pai_id === pItem.id);
        let subHtml = '';
        submenus.forEach(sub => {
          subHtml += `
            <div style="background:#141414;border:1px solid #2a2a2a;padding:8px 10px;border-radius:6px;margin-top:6px;display:flex;justify-content:space-between;align-items:center;margin-left:20px;">
              <span style="color:#ccc;font-size:13px;">↳ ${sub.nome}</span>
              <button class="del-c" data-id="${sub.id}" style="background:#d9534f;color:#fff;border:none;padding:3px 8px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:bold;">Excluir</button>
            </div>
          `;
        });
        const div = document.createElement('div');
        div.style.cssText = 'background:#1c1c1c;border:1px solid #333;padding:10px 12px;border-radius:8px;margin-bottom:8px;';
        div.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <b style="color:#ffd700;font-size:14px;">${pItem.nome}</b>
            <button class="del-c" data-id="${pItem.id}" style="background:#d9534f;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;">Excluir</button>
          </div>
          ${subHtml}
        `;
        cont.appendChild(div);
      });
      cont.querySelectorAll('.del-c').forEach(btn => {
        btn.onclick = async () => {
          if (confirm('Deseja excluir este menu?')) {
            await client.from('categorias').delete().eq('id', btn.dataset.id);
            await carregarListaCategorias();
            await atualizarSelects();
            carregarVitrineDinamica(client);
          }
        };
      });
    }

    async function carregarListaMidias() {
      const cont = document.getElementById('lista-midias');
      if (!cont) return;
      const { data } = await client.from('conteudos').select('*, categorias(nome)').order('created_at', { ascending: false });
      if (!data || data.length === 0) { cont.innerHTML = '<p style="color:#888;text-align:center;margin-top:20px;">Nenhuma foto cadastrada.</p>'; return; }
      cont.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement('div');
        div.style.cssText = 'background:#1a1a1a;border:1px solid #333;padding:12px;border-radius:8px;margin-bottom:10px;display:flex;gap:12px;align-items:flex-start;';
        div.innerHTML = `
          <img src="${item.url}" style="width:70px;height:70px;object-fit:cover;border-radius:6px;background:#000;border:1px solid rgba(212,175,55,0.4);flex-shrink:0;">
          <div style="flex-grow:1;overflow:hidden;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
              <h4 style="margin:0;color:#ffd700;font-size:14px;">${item.titulo || 'Foto'}</h4>
              <span style="background:#262626;color:#ffd700;font-size:10px;padding:2px 6px;border-radius:4px;border:1px solid rgba(212,175,55,0.3);">${item.categorias ? item.categorias.nome : 'Vitrine'}</span>
            </div>
            <p style="margin:0;color:#e2e8f0;font-size:12px;line-height:1.4;background:#111;padding:6px 8px;border-radius:4px;border-left:2px solid #ffd700;">${item.descricao || 'Sem descrição.'}</p>
          </div>
          <button class="del-m" data-id="${item.id}" style="background:#d9534f;color:#fff;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;margin-left:6px;flex-shrink:0;">Excluir</button>
        `;
        div.querySelector('.del-m').onclick = async () => {
          if (confirm('Deseja excluir esta foto?')) {
            await client.from('conteudos').delete().eq('id', item.id);
            await carregarListaMidias();
            carregarVitrineDinamica(client);
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
        carregarVitrineDinamica(client);
      }
    };

    document.getElementById('form-up').onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-pub');
      const tit = document.getElementById('inp-titulo').value.trim();
      const desc = document.getElementById('inp-desc').value.trim();
      const catId = document.getElementById('sel-cat').value;
      const files = document.getElementById('inp-files').files;
      if (!catId) return alert('Selecione um menu!');
      btn.disabled = true;
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          btn.innerText = `A enviar ${i + 1} de ${files.length}...`;
          const fName = Date.now() + '_' + i + '_' + file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const { error: upErr } = await client.storage.from('chacara-media').upload(fName, file);
          if (upErr) throw upErr;
          const url = client.storage.from('chacara-media').getPublicUrl(fName).data.publicUrl;
          await client.from('conteudos').insert([{
            titulo: tit ? (files.length > 1 ? `${tit} (${i + 1})` : tit) : 'Ambiente Chácara Profitter',
            descricao: desc,
            categoria_id: catId,
            url: url,
            categoria: 'geral'
          }]);
        }
        alert('Upload concluído com sucesso!');
        document.getElementById('inp-files').value = '';
        document.getElementById('inp-titulo').value = '';
        document.getElementById('inp-desc').value = '';
        await carregarListaMidias();
        carregarVitrineDinamica(client);
      } catch (err) {
        alert('Erro ao enviar: ' + err.message);
      } finally {
        btn.innerText = '🚀 Publicar no Menu';
        btn.disabled = false;
      }
    };

    await atualizarSelects();
    await carregarListaCategorias();
    await carregarListaMidias();
  }

  // Botão Flutuante de Acesso
  function criarBotaoLogin(client) {
    let b = document.getElementById('quantum-btn-trigger');
    if (!b) {
      b = document.createElement('button');
      b.id = 'quantum-btn-trigger';
      b.innerHTML = '⚡ ABRIR PAINEL QUÂNTICO';
      b.style.cssText = 'position:fixed;bottom:25px;right:25px;background:#ffd700;color:#000;border:3px solid #000;padding:16px 28px;border-radius:35px;z-index:999999999;cursor:pointer;font-weight:bold;font-size:16px;box-shadow:0 8px 30px rgba(0,0,0,0.9);';
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

  // Inicialização do Supabase SDK
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  s.onload = async () => {
    const client = window.supabase.createClient(SB_URL, SB_KEY);
    window.supabaseClient = client;

    criarBotaoLogin(client);
    carregarVitrineDinamica(client);

    const { data: { session } } = await client.auth.getSession();
    if (session && session.user && session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      injetarPainelCompleto(client, session.user.email);
    }
  };
  document.head.appendChild(s);

})();