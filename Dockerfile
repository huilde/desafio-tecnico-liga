# 1. Imagem base com Node.js
FROM node:20-alpine AS build

# 2. Definir diretório de trabalho
WORKDIR /app

# 3. Copiar package.json e package-lock.json / yarn.lock
COPY package*.json ./

# 4. Instalar dependências
RUN npm install
# ou para yarn
# RUN yarn install

# 5. Copiar o restante do projeto
COPY . .

# 6. Build do Vite
RUN npm run build
# ou yarn build

# 7. Servir usando uma imagem Nginx
FROM nginx:alpine

# Copiar os arquivos buildados para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor porta 80
EXPOSE 80

# Rodar o Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
