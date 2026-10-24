// --- MOTOR QUÂNTICO DE LIMPEZA E ESTABILIZAÇÃO VISUAL ---
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // 1. Filtragem rigorosa de vídeos repetidos
        const videosProcessados = new Set();
        document.querySelectorAll('video, iframe').forEach(media => {
            let src = media.src || media.querySelector('source')?.src;
            if (src && src.length > 5) {
                if (videosProcessados.has(src)) {
                    // Se o vídeo já existe, remove o cartão inteiro duplicado para limpar a vitrine
                    let container = media.closest('.card') || media.closest('.video-container') || media.closest('div[class*="col-"]');
                    if (container) container.style.display = 'none';
                    else media.style.display = 'none';
                } else {
                    videosProcessados.add(src);
                }
            }
        });

        // 2. Limpeza estética de títulos repetitivos no HTML
        document.querySelectorAll('h1, h2, h3, span, .badge').forEach(el => {
            if(el.textContent && el.textContent.includes('COZINHA AMERICANA')) {
                el.innerHTML = el.innerHTML.replace(/(COZINHA\s*AMERICANA\s*)+/gi, 'COZINHA AMERICANA ');
            }
        });
    }, 1500); // Aguarda o Supabase carregar antes de limpar
});