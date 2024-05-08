# Facebook Clone

Đây là một dự án nhỏ được tạo ra với mục đích học tập và thực hành về lập trình web.

## Công nghệ sử dụng

- Client: ReactJS, TailwindCSS, SocketIo.client, Typescript
- Server: ExpressJS, SocketIo, Sequelize, Cloundinary, Typescript, JWT
- Database: Mysql
- Deployment: Docker, Nginx

## Tính năng

- Đăng ký, đăng nhập
- Tạo bài viết, bình luận
- Kết bạn,
- Chat với bạn bè

## Cài đặt

### Yêu cầu

- NodeJS
- Mysql

#### 1. Clone repository về máy

```bash
git clone https://github.com/Mirai3103/facebook-clone-ts.git
```

#### 2. Cài đặt các thư viện cần thiết

```bash
cd facebook-clone-ts && cd server && npm install
cd ../client && npm install
```

#### 3. Chạy server

```bash
cd server && npm un start:dev
```

#### 4. Chạy ứng dụng frontend

```bash
cd client && npm start
```

### Chạy với docker

#### 1. Clone repository về máy

```bash
git clone https://github.com/Mirai3103/facebook-clone-ts.git
```

#### 2. Run docker container

```bash
docker-compose up --build
```

## Demo

![alt text](Screenshot%202024-05-08%20234713.png)

![alt text](Screenshot%202024-05-09%20000329.png)

![alt text](Screenshot%202024-05-08%20235745.png)
![alt text](Screenshot%202024-05-08%20235816.png)
![alt text](Screenshot%202024-05-09%20000008.png)
