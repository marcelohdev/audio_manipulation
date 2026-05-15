# 🎵 Audio Manipulation

Uma aplicação Next.js moderna e completa para manipulação de áudio com controles profissionais e interface intuitiva.

## ✨ Funcionalidades Completas

### Controles de Reprodução
- ▶️ **Play/Pause** - Controle de reprodução com sincronização automática
- ⏪ **Pular Áudios** - Botões próximo/anterior para navegar na playlist
- ⏳ **Pular Tempo** - Avançar/retroceder 10 segundos com um clique

### Controles de Áudio
- 🔊 **Controle de Volume** - Ajuste o volume de 0-100%
- ⏱️ **Manipulação de Tempo (Tempo)** - Velocidade de 0.5x a 2x (mais lento a mais rápido)
- 📊 **Barra de Progresso** - Navegue pelo áudio e controle a posição
- ⏲️ **Exibição de Tempo** - Visualize tempo atual e duração total

### Interface Visual
- 🎨 **Design Moderno** - Interface responsiva com gradientes e animações
- 🎵 **Indicador de Reprodução** - Animação de pulsação no cover durante a reprodução
- 🟢 **Destaque de Faixa** - A música tocando é destacada em verde na playlist
- 📋 **Playlist Interativa** - Múltiplas músicas com seleção por clique
- 🎯 **Feedback Visual** - Status claro (Reproduzindo/Pausado)

## 🚀 Começando

### Pré-requisitos
- Node.js 18+ instalado
- npm instalado

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver a aplicação.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx       # Layout global
│   ├── page.tsx         # Página inicial
│   └── globals.css      # Estilos globais
├── components/
│   └── AudioPlayer.tsx  # Componente do reprodutor de áudio
public/
└── [adicionar áudios aqui]
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 16** - Framework React moderno com Turbopack
- **React 19** - Biblioteca UI com hooks
- **TypeScript** - Tipagem estática completa
- **Tailwind CSS 4** - Estilização utilitária
- **Lucide React** - Ícones SVG de qualidade
- **React Hooks** - Gerenciamento de estado (useState, useRef, useEffect)

## 📝 Como Usar

### Reprodução
1. Clique no botão **Play** (círculo verde) para iniciar
2. Clique em **Pause** para pausar
3. Clique nos botões de **seta** para próximo/anterior áudio

### Navegação de Tempo
- Clique na **barra de progresso** para ir para um tempo específico
- Use os botões **⚡** para avançar/retroceder 10 segundos

### Controles de Áudio
- Ajuste o **volume** com o slider na parte inferior
- Mude a **velocidade** (tempo) com o dropdown de tempo

### Playlist
- Selecione qualquer música na playlist clicando nela
- A música selecionada fica destacada em verde

## 🎨 Customização

### Adicionar suas próprias músicas

Edite `src/components/AudioPlayer.tsx` e modifique o array `TRACKS`:

```tsx
const TRACKS: Track[] = [
  {
    id: 1,
    name: 'Sua Música',
    url: 'https://seu-url-de-audio.mp3',
    icon: '🎵'  // Emoji do seu gosto
  },
  // Adicione mais faixas aqui
];
```

### Personalizar Cores

As cores principais estão em `AudioPlayer.tsx`. Procure por:
- `from-green-400 to-green-600` - Cores do cover
- `bg-green-500` - Cor do botão play
- `accent-green-500` - Cor dos sliders

### Temas

Customize o esquema de cores:
```tsx
// Cover parado: from-gray-700 to-gray-800
// Cover tocando: from-green-400 to-green-600 (com pulsação)
// Botão: bg-green-500 hover:bg-green-400
```

## ⚠️ Observações Importantes

### Hospedagem de Áudio

Algumas hospedagens podem não funcionar devido a CORS (Cross-Origin Resource Sharing):

- ✅ **Recomendado**: Coloque arquivos MP3 na pasta `public/`
- ✅ **Funciona bem**: 
  - Internet Archive (archive.org)
  - Cloudinary
  - Bunny CDN
- ❌ **Pode não funcionar**: URLs com restrições de CORS

**Exemplo com arquivo local:**
```tsx
// Coloque seu-audio.mp3 em public/
<audio ref={audioRef} src="/seu-audio.mp3" />
```

### Autoplay

Navegadores modernos podem bloquear autoplay. Para contornar:
- O usuário deve interagir com a página primeiro
- Use `muted` se quiser autoplay com som desativado

## 📦 Build para Produção

```bash
npm run build
npm run start
```

A build otimizada estará pronta em `.next/`

## 🧪 Testando Funcionalidades

1. **Volume** - Mova o slider e ouça a mudança
2. **Tempo** - Selecione velocidades diferentes
3. **Pular** - Use os botões para navegar
4. **Playlist** - Clique em diferentes músicas
5. **Status** - Observe a animação quando reproduzindo

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Áudio não carrega | Verifique CORS da URL ou coloque em `public/` |
| Build falha | `rm -rf .next && npm run build` |
| Dependências com erro | `npm install` ou `npm ci` |
| Áudio não para de tocar | Limpe cache: `rm -rf .next` |

## 📄 Licença

Projeto livre para uso pessoal e educacional.
