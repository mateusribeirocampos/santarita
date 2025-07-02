# Bash Commands macOS

## Gerenciamento de Portas e Processos

### Verificar qual processo está usando uma porta

```bash
lsof -i :PORTA
# Exemplo para porta 3000
lsof -i :3000
```

### Verificar processos escutando em todas as portas TCP

```bash
sudo lsof -nP -iTCP -sTCP:LISTEN
```

### Verificar conexões e portas abertas

```bash
netstat -an | grep PORTA
# Exemplo para porta 3000
netstat -an | grep 3000
```

### Verificar portas em modo LISTEN

```bash
netstat -tuln | grep PORTA
```

### Matar processo por PID

```bash
kill PID
# Forçar encerramento
kill -9 PID
```

## Dicas para Node.js/Desenvolvimento

### Erro de porta em uso (EADDRINUSE)

Se receber o erro:

```bash
Error: listen EADDRINUSE: address already in use :::PORTA
```

1. Descubra o processo:

   ```bash
   lsof -i :PORTA
   ```

2. Mate o processo:

```bash
   kill PID
  ```

3.Rode novamente seu servidor.

## Outras Dicas

### Verificar processos do Node.js

```bash
ps aux | grep node
```

### Verificar se o Vite/React está rodando

- Acesse: [http://localhost:3000]
- Veja o terminal do Vite para mensagens como:

  ```bash
  Local: http://localhost:3000/
  ```

---

> **Vault:** bash-command-macos
> Comandos úteis para desenvolvimento web no macOS
