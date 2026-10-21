# DOCUMENTO MESTRE DE HANDOFF & ARQUITETURA — CHÁCARA PROFITTER
**Versão:** 4.0 Ultra Premium | **Data do Backup:** 21/10/2026 19:10:30
**Engenharia Operacional:** Sidney Jeronymo

---

## 1. VISÃO GERAL DO PROJETO
* **Plataforma:** Chácara Profitter — Showcase e Vitrine de Luxo para Locação de Temporada.
* **Hospedagem Front-end:** GitHub Pages (Repositório: chacaraprofitter-crypto/chacara-profitter, Branch: main).
* **Backend & Infraestrutura:** Supabase BaaS (Database Postgres, REST API, Storage, Auth OAuth Google).
* **Ambiente de Gerência:** Painel Mestre Quântico integrado (Admin: sidneyjer68@gmail.com).

---

## 2. CONTRATOS E INTEGRAÇÕES
* **Supabase Project URL:** \https://coeqgbxxxwvlprdwrkqp.supabase.co\
* **Supabase Anon/Publishable Key:** \sb_publishable_Csi4t6CSdeg8Ymems-udEg_FML2YHCm\
* **Bucket de Mídias:** \chacara-media\ (Storage público).
* **Autenticação:** Google OAuth via Supabase Auth com retorno para a URL da vitrine.

### Esquema de Tabelas:
1. **\categorias\**:
   * \id\ (uuid / int): Chave primária.
   * \
ome\ (text): Rótulo do menu com ícone emoji (ex: \🍽️ COZINHA AMERICANA\).
   * \pai_id\ (uuid / int, nullable): Referência para submenus (hierarquia de pastas).
2. **\conteudos\**:
   * \id\ (uuid / int): Chave primária.
   * \	itulo\ (text): Título do ambiente.
   * \descricao\ (text): Descrição com especificações de alto padrão.
   * \url\ (text): Link público da mídia no bucket \chacara-media\.
   * \categoria_id\ (uuid / int): Chave estrangeira ligada à tabela \categorias\.

---

## 3. ARQUITETURA DO FRONT-END & CMS DINÂMICO
* **\index.html\**: Estrutura base da vitrine, seções institucionais e ponto de montagem (\#galeria-premium\).
* **\login.js\**: Motor universal quântico:
  * **Barra de Navegação em Tempo Real:** Consulta a tabela \categorias\ e desenha dinamicamente os botões da vitrine.
  * **Renderizador de Álbuns:** Ao clicar em qualquer menu, busca as mídias no Supabase e exibe os cartões com moldura dourada e descrição.
  * **Modal Lightbox Cinema:** Visualização ampliada em alta resolução com backdrop escuro e blur.
  * **Central de Gestão por Ambiente (Admin):**
    * Renomear e alterar ícones em tempo real.
    * Gerenciar submenus e níveis hierárquicos.
    * Envio em lote com upload direto no ambiente selecionado.
    * Exclusão e gestão individual de mídias.

---

## 4. PROCEDIMENTO DE RESTAURAÇÃO DE DESASTRES (ROLLBACK)
Para restaurar a base de dados a partir deste backup:
1. Os dados brutos das tabelas estão salvos em:
   * \ackups/backup_20261021_190958/categorias.json\
   * \ackups/backup_20261021_190958/conteudos.json\ 2. Em caso de perda de arquivos locais, o arquivo \ackups/backup_completo_20261021_190958.zip\ contém a versão íntegra de \index.html\ e \login.js\.

---
*Documento gerado automaticamente pelo Sistema Operacional de Engenharia Estratégica Modo Quântico V4.*