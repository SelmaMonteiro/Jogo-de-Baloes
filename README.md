# Jogo de Balões

Um joguinho simples e colorido para o público infantil: estoure os balões e marque pontos. Inclui som de estouro com fallback, funcionando em PC e celular.

## Como jogar
- Clique em "Começar"...
- Toque ou clique nos balões para estourar.
- Cada estouro aumenta a pontuação.

## Sons
- O som real está em `sounds/pop.wav`.
- Se o arquivo não estiver disponível, o jogo toca um beep curto como fallback.

## Executar localmente
1. Abra o arquivo `index.html` no navegador ou use um servidor estático.
2. Em ambiente Node, você pode usar: `npx --yes serve -s . -l 8000` e acessar `http://localhost:8000`.

## Publicação (GitHub Pages)
Este repositório está pronto para GitHub Pages.

Passos:
- Em GitHub → `Settings` → `Pages`:
  - "Source": "Deploy from a branch"
  - "Branch": `main`
  - "Folder": `/ (root)`
- Salve e aguarde 1–2 minutos.

URL esperada:
- `https://selmemonteiro.github.io/Jogo-de-Baloes/`

## Estrutura
```
JogoBalões/
├─ index.html
├─ styles.css
├─ script.js
├─ .nojekyll
└─ sounds/
   └─ pop.wav
```

## Créditos
- Efeito sonoro: `mixkit-game-balloon-or-bubble-pop-3069.wav`.
