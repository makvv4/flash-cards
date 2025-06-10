# ---------- 1-й этап: build ----------
FROM node:lts-alpine AS builder
WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- 2-й этап: runtime ----------
FROM nginx:alpine
# Переопределяем стандартный конфиг, чтобы Spa-роуты работали
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Забираем статические файлы из первого слоя
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
