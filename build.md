# 개발환경구축

## MacOS

### Homebrew 설치

% /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

### Node 설치

% brew install node

% npm -v
7.6.0

% node -v
v15.11.0

# 빌드환경구축

## 프로젝트 생성

% npm init

## 플러그인 저장

### 웹 서버

% npm install express --save

### 웹소켓

% npm install express-ws --save

### ORM

% npm install sequelize --save

### 데이터베이스

% npm install sqlite --save

### AES암호화/복호화

% npm install crypto-js --save

### logging rsyslog

% npm install winston-rsyslog --save
