# 🎵 Audio Manipulation

Uma aplicação Next.js moderna para manipulação de áudio com controles intuitivos de play/pause e volume.

## 🎯 Funcionalidades

- ▶️ **Play/Pause** - Controle de reprodução de áudio
- 🔊 **Controle de Volume** - Ajuste o volume de 0-100%
- ⏱️ **Barra de Progresso** - Visualize e controle a posição do áudio
- ⏲️ **Exibição de Tempo** - Tempo atual e duração total
- 🎨 **Interface Moderna** - Design responsivo com gradientes

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
│   ├── layout.tsx      # Layout global
│   └── page.tsx        # Página inicial
├── components/
│   └── AudioPlayer.tsx # Componente do reprodutor de áudio
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React moderno
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Lucide React** - Ícones SVG
- **React Hooks** - Gerenciamento de estado

## 📝 Como Usar

1. **Play/Pause**: Clique no botão circular no centro
2. **Navegação**: Use a barra de progresso para navegar pelo áudio
3. **Volume**: Ajuste o volume com o controle deslizante na parte inferior

## 🎨 Customização

### Adicionar seu próprio áudio

Edite `src/components/AudioPlayer.tsx` e altere a URL:

```tsx
<audio
  ref={audioRef}
  src="https://seu-url-de-audio.mp3"
/>
```

### Temas

Customize as cores no componente `AudioPlayer.tsx`:
- Gradiente: `from-blue-500 to-purple-600`
- Botão: `bg-white text-blue-600`

## ⚠️ Observações Importantes

**Hospedagem de Áudio**: Algumas hospedagens de áudio online podem não funcionar devido a problemas de CORS (Cross-Origin Resource Sharing). Para evitar problemas:

- ✅ **Recomendado**: Coloque o arquivo de áudio na pasta `public/` do projeto
- ✅ **Alternativa**: Use serviços que suportam CORS como Cloudinary, Bunny CDN ou Internet Archive
- ❌ **Pode não funcionar**: URLs de hospedagens com restrições de CORS

**Exemplo com arquivo local:**
```tsx
<audio
  ref={audioRef}
  src="/seu-audio.mp3"
/>
```

## 📦 Build para Produção

```bash
npm run build
npm run start
```

## 🐛 Troubleshooting

Se encontrar problemas:
1. Limpe o cache: `rm -rf .next`
2. Reinstale dependências: `rm -rf node_modules && npm install`
3. Verifique se a URL do áudio é válida

## 📄 Licença

Projeto livre para uso pessoal e educacional.
