# HANDOFF TÉCNICO - CHÁCARA PROFITTER
Data: 2026-10-21
Admin: sidneyjer68@gmail.com
Status: 100% Operacional e Blindado

## 1. Infraestrutura
- Hospedagem: GitHub Pages (https://chacaraprofitter-crypto.github.io/chacara-profitter/)
- Banco de Dados & Storage: Supabase (https://coeqgbxxxwvlprdwrkqp.supabase.co)
- Bucket de Mídias: chacara-media (público)
- Autenticação: Google OAuth validado para sidneyjer68@gmail.com

## 2. Tabelas do Supabase
- categorias: id (uuid), nome (text), pai_id (uuid, nullable), created_at
- conteudos: id (uuid), titulo (text), descricao (text), categoria_id (uuid), url (text), created_at

## 3. Painel Mestre Quântico (login.js)
- Upload em lote de fotos e vídeos vinculado aos menus
- Gerenciamento dinâmico de menus e submenus
- Seletor de ícones integrados (incluindo sala 🛋️, TV 📺, piscina 🏊, etc.)
- Ocultação automática do botão flutuante com o painel aberto
- Sincronização direta sem loop de redirecionamento

## 4. Comandos de Manutenção Git
git add .
git commit -m "manutencao"
git push -u origin main --force
