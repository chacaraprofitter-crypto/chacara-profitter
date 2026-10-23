# DOCUMENTO MESTRE DE HANDOFF & ARQUITETURA — CHÁCARA PROFITTER
**Versão:** 4.2 Ultra Premium Multimídia | **Data do Backup:** 23/10/2026 12:40:28
**Engenharia Operacional:** Sidney Jeronymo

---

## 1. VISÃO GERAL DO PROJETO
* **Plataforma:** Chácara Profitter — Showcase de Luxo, Locação e Experiências de Campo.
* **Domínio Oficial:** \www.chacaraprofitter.com.br\ (Configuração em curso no Registro.br e GitHub Pages).
* **Hospedagem Front-end:** GitHub Pages (\chacaraprofitter-crypto/chacara-profitter\, branch \main\).
* **Backend & Infraestrutura:** Supabase BaaS (Postgres, REST API, Storage \chacara-media\, Auth Google OAuth para \sidneyjer68@gmail.com\).

---

## 2. ARQUITETURA DE MULTIMÍDIA E GESTÃO (MOTOR QUÂNTICO)
* **Gestão de Imagens:** Upload em lote e gestão direta por ambiente (Varanda, Cozinha, Piscina, Lago, etc.) com moldura dourada e crachá de identificação.
* **Gestão de Vídeos & Lote:**
  * Suporte a links do YouTube e Vimeo com conversão automática para embed cinematográfico.
  * **Importador em Massa (Bulk Import):** Caixa de texto para colagem de dezenas de links em lote (um por link/linha).
  * **Auto-Descrição Inteligente:** Geração automática de descrições baseadas no título do vídeo caso o campo opcional esteja vazio.
* **Galeria de Ícones Especializados:** +50 emojis dedicados (incluindo Sauna \🧖\, Duchas \🚿\, Vídeos \🎬\, Redes \🛖\, Lago \🛶\).

---

## 3. ESQUEMA DE DADOS (SUPABASE)
1. **\categorias\**:
   * \id\ (uuid/int), \
ome\ (text com emoji), \pai_id\ (suporte a submenus).
2. **\conteudos\**:
   * \id\ (uuid/int), \	itulo\ (text), \descricao\ (text), \url\ (text - imagem, vídeo local ou link embed), \categoria_id\ (chave estrangeira), \categoria\ (text).

---

## 4. PROCEDIMENTO DE RESTAURAÇÃO DE EMERGÊNCIA
* **Base de Dados:** \ackups/backup_20261023_124013/categorias.json\ e \conteudos.json\.
* **Código Fonte:** \ackups/backup_completo_20261023_124013.zip\ ou cópias diretas em \index.html\ e \login.js\.

---
*Documento gerado automaticamente pelo Sistema Operacional de Engenharia Estratégica Modo Quântico V4.*