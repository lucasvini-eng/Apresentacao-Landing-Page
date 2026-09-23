# 👓 Ótica Limeira - Website Oficial

Website moderno, responsivo e elegante desenvolvido com **HTML5 semântico**, **Tailwind CSS (via CDN)** e **JavaScript Vanilla**.

---

## 🎨 Identidade Visual & Cores (Extraídas da Logo)

As cores foram mapeadas diretamente da logo da Ótica Limeira e configuradas no bloco `<script>` do `tailwind.config` no arquivo `index.html`:

| Variável | Código HEX | Elemento de Origem | Uso no Site |
| :--- | :--- | :--- | :--- |
| `primary` | `#DC2626` | Ponto focal da esfera 3D da logo | Botões de destaque, ícones ativos, títulos |
| `primary-light` | `#EF4444` | Brilho superior da esfera | Hovers, gradientes suaves |
| `primary-dark` | `#991B1B` | Sombra da esfera 3D | Sombras, gradientes profundos |
| `secondary` | `#18181B` | Fundo preto do emblema da logo | Navbar, rodapé, contrastes elegantes |
| `accent` | `#E11D48` | Vermelho rubi complementar | Badges de produtos, tags promocionais |
| `dark` | `#0F172A` | Azul ardósia profundo | Textos de alto contraste e seções escuras |
| `light` | `#F8FAFC` | Fundo arejado e limpo | Fundo das seções e cards |

---

## 📁 Estrutura de Pastas e Arquivos

```text
Apresentação-LojaOtica/
├── index.html                  # Página principal com todas as seções e configuração Tailwind
├── assets/
│   ├── css/
│   │   └── styles.css          # Estilos complementares (glassmorphism, animações, pulse, scrollbar)
│   ├── js/
│   │   └── script.js           # Lógica em Vanilla JS (menu mobile, filtros, sticky navbar, WhatsApp)
│   └── img/
│       └── logo.svg            # Vetor SVG fiel ao logotipo da Ótica Limeira
└── README.md                   # Instruções de uso e personalização
```

---

## 🚀 Como Executar o Projeto

1. Basta dar um duplo clique no arquivo `index.html` ou abri-lo em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).
2. Não requer instalação de Node.js nem build: o Tailwind CSS roda diretamente via CDN.

---

## ⚙️ Personalizações Rápidas

### 1. Inserir sua Imagem de Logo Oficial (PNG ou JPG)
No arquivo `index.html`, procure pelo trecho `<header id="main-navbar">` e substitua:
```html
<img src="assets/img/logo.svg" alt="Ótica Limeira" class="...">
```
Por:
```html
<img src="assets/img/sua-logo.png" alt="Ótica Limeira" class="...">
```

### 2. Configurar o Número do WhatsApp
No arquivo `assets/js/script.js`, altere a constante na linha 7:
```javascript
const WHATSAPP_NUMBER = "5519999999999"; // Digite: 55 + DDD + Número
```
No arquivo `index.html`, substitua os links `https://wa.me/5519999999999` pelo seu número oficial.

### 3. Ajustar o Mapa da Loja Física
Na seção `#contato` do `index.html`, insira o iframe do Google Maps gerado para o endereço exato da sua loja.

---

## ✨ Recursos e Interatividades Incluídas

- **Navbar Sticky com Glassmorphism**: Fundo translúcido com desfoque e sombra adaptativa ao rolar a página.
- **Menu Mobile Hambúrguer**: Totalmente interativo com travamento de tela e fechamento automático ao navegar.
- **Scroll Spy**: O menu destaca automaticamente a seção ativa durante a rolagem.
- **Vitrine com Filtro por Abas**: Alternância instantânea entre *Todos*, *Grau*, *Sol*, *Lentes de Contato* e *Infantil*.
- **Consulta de Produtos no WhatsApp**: Botão em cada card que envia o nome do modelo e valor pré-formatados.
- **Upload de Receita Médica**: Drag & drop de foto ou PDF com disparo direto para o WhatsApp da ótica.
- **Modal "Enviar Receita"**: Acesso rápido pelo botão de destaque no cabeçalho.
- **Botão Flutuante do WhatsApp**: Fixo no canto inferior direito com animação de pulso contínuo e tooltip.
