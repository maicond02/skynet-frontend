<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3 class="footer-brand">Skynet</h3>
                    <p class="footer-description">
                        Visão computacional inteligente para segurança e monitoramento em tempo real.
                    </p>
                    <div class="social-links">
                        <a href="#" class="social-link" aria-label="LinkedIn">
                            <i class="pi pi-linkedin"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="GitHub">
                            <i class="pi pi-github"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="Twitter">
                            <i class="pi pi-twitter"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="Instagram">
                            <i class="pi pi-instagram"></i>
                        </a>
                    </div>
                </div>

                <div class="footer-section">
                    <h4 class="footer-title">Produto</h4>
                    <ul class="footer-links">
                        <li><a href="#tela-1">Visão em Tempo Real</a></li>
                        <li><a href="#tela-2">Segurança & Privacidade</a></li>
                        <li><a href="#tela-3">Casos de Uso</a></li>
                        <li><a href="#">Preços</a></li>
                        <li><a href="#">Documentação</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4 class="footer-title">Empresa</h4>
                    <ul class="footer-links">
                        <li><a href="#">Sobre Nós</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Carreiras</a></li>
                        <li><a href="#">Parceiros</a></li>
                        <li><a href="#">Contato</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4 class="footer-title">Suporte</h4>
                    <ul class="footer-links">
                        <li><a href="#">Central de Ajuda</a></li>
                        <li><a href="#">API</a></li>
                        <li><a href="#">Status</a></li>
                        <li><a href="#">Termos de Uso</a></li>
                        <li><a href="#">Política de Privacidade</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="copyright">
                    © {{ currentYear }} Skynet. Todos os direitos reservados.
                </p>
                <p class="powered-by">
                    Desenvolvido usando Vue 3 & PrimeVue
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'LayoutFooter',

    computed: {
        currentYear() {
            return new Date().getFullYear()
        }
    }
}
</script>

<style scoped>
.footer {
    background: #000;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
    padding: 3rem 0 1.5rem;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.footer-brand {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    font-size: 1.75rem;
    font-weight: 800;
    background: linear-gradient(135deg, #38bdf8, #3b82f6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 0.05em;
    margin: 0;
}

.footer-description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
}

.social-links {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.12);
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    text-decoration: none;
}

.social-link:hover {
    background: rgba(59, 130, 246, 0.24);
    color: #38bdf8;
    transform: translateY(-2px);
}

.footer-title {
    font-family: "Orbitron", "Rajdhani", system-ui, sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 0.5rem 0;
    letter-spacing: 0.03em;
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.footer-links a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    display: inline-block;
}

.footer-links a:hover {
    color: #38bdf8;
    transform: translateX(4px);
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.copyright,
.powered-by {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    margin: 0;
}

.powered-by {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.powered-by .pi-heart-fill {
    color: #ef4444;
    font-size: 0.85rem;
}

@media (max-width: 768px) {
    .footer-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }

    .footer-bottom {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }

    .footer {
        padding: 2rem 0 1rem;
    }
}

@media (max-width: 480px) {
    .footer-grid {
        grid-template-columns: 1fr;
    }

    .footer-section {
        text-align: center;
    }

    .social-links {
        justify-content: center;
    }
}
</style>
