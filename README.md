# 🔑 Bolt Apps - Token Finder

**Obtém seu token FiveM automaticamente. Basta abrir o app, entrar no servidor e o token aparece. Interface moderna, leve e sem dependência.**

## ✨ Características

- 🎯 **Detecção Automática**: Monitora e extrai tokens FiveM automaticamente
- 💾 **Cache Inteligente**: Salva tokens para acesso rápido
- 📋 **Copiar com 1 Clique**: Copie o token para a área de transferência instantaneamente
- 🎨 **Interface Moderna**: Design limpo e intuitivo com animações suaves
- 🪶 **Ultra Leve**: Sem dependências pesadas, funciona direto no navegador
- 📁 **Upload Manual**: Suporte para carregar arquivos de log manualmente

## 🚀 Como Usar

### Opção 1: Detecção Automática (Recomendado)
1. Abra o `index.html` no seu navegador
2. Mantenha a página aberta
3. Inicie o FiveM e conecte-se a um servidor
4. O token aparecerá automaticamente na interface
5. Clique em "Copiar Token" para copiar

### Opção 2: Upload Manual de Logs
1. Abra o `index.html` no seu navegador
2. Clique em "Carregar Arquivo de Log"
3. Navegue até a pasta de logs do FiveM:
   - **Windows**: `%LocalAppData%\FiveM\FiveM.app\logs`
   - **Linux/Mac**: `~/.local/share/CitizenFX/logs`
4. Selecione o arquivo de log mais recente
5. O token será extraído e exibido automaticamente

## 💻 Instalação

### Método 1: Uso Direto (Sem Instalação)
Simplesmente abra o arquivo `index.html` no seu navegador preferido. Não é necessário instalar nada!

### Método 2: Servidor Local
```bash
# Clone o repositório
git clone https://github.com/JoneyDev/-obterToken-boltapps.git
cd -obterToken-boltapps

# Inicie um servidor local (Python)
python -m http.server 8080
# ou
python3 -m http.server 8080

# Acesse no navegador
# http://localhost:8080
```

### Método 3: Usando npm
```bash
npm start
```

## 📂 Estrutura do Projeto

```
-obterToken-boltapps/
├── index.html           # Interface principal
├── styles.css           # Estilos modernos
├── app.js              # Lógica da aplicação
├── token-extractor.js  # Extrator de tokens
├── package.json        # Configuração do projeto
└── README.md          # Este arquivo
```

## 🔧 Funcionalidades Técnicas

### Detecção de Token
O app utiliza múltiplas estratégias para detectar tokens:
- Monitoramento automático de logs do FiveM
- Análise de padrões de tokens em arquivos
- Suporte para múltiplos formatos de log

### Segurança
- Tokens são armazenados apenas localmente (localStorage)
- Nenhum dado é enviado para servidores externos
- Cache com expiração automática (24 horas)

## 🎨 Interface

A interface foi projetada para ser:
- **Moderna**: Gradientes e animações suaves
- **Responsiva**: Funciona em desktop e mobile
- **Intuitiva**: Instruções claras e feedback visual
- **Acessível**: Alto contraste e tipografia legível

## 🛠️ Tecnologias

- HTML5
- CSS3 (Animações e Gradientes)
- JavaScript Vanilla (ES6+)
- LocalStorage API
- File System Access API

## 📝 Notas Importantes

⚠️ **Uso Legítimo**: Este app é destinado para desenvolvedores que precisam acessar seus próprios tokens FiveM para fins de desenvolvimento e teste.

⚠️ **Privacidade**: Todos os dados permanecem no seu dispositivo. Nenhuma informação é coletada ou enviada.

⚠️ **Compatibilidade**: Funciona melhor em navegadores modernos (Chrome, Firefox, Edge, Safari)

## 📄 Licença

MIT License - Veja o arquivo LICENSE para mais detalhes

## 👨‍💻 Desenvolvido por

**Bolt Apps** © 2026

---

**Interface moderna, leve e sem dependência** 🚀

