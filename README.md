
INITIAL STEPS
-------------
1.install all packages by - npm install
2.install nodemon by - npm i nodemon (if it is not auto installed by npm i )
3.make a .env file in root of the project ,which must be a copy of .env.example file & give all required variables value
4.If using Mongodb & rabitMq localy then run Mongodb & rabitMq by terminal
5.Import POST APIs by postman link

STEP TO TEST  newsletter API with RabbitMQ integration without using PM2
-------------------------------------------------------------------------
1.open 2 terminal at same time 
2.in terminal 1 run - npm start
3.in terminal 2 run - npm run rabbitMq
4.Hit localhost:5000/api/sendNewsLetter API end point on POSTMAN with the csv file with proper email,content & name of the newsletter
5.Api will give immediate response & rabbitMq will send the email 
6.Terminal 1 is for main API & Terminal 2 is for RabbitMQ email job

STEP TO TEST  addUser API 
-------------------------
1.Open a terminal & run - npm start
2.Hit localhost:5000/api/addUser API end point on POSTMAN with required data

STEP TO TEST sendNewsLetter API
-------------------------------
1.Open postman & hit localhost:5000/api/sendNewsLetter
2.Upload NewsLetterData.csv file in postman body->form-data part
3.Csv file is in email attachment

STEPS FOR RabbitMQ
-------------------
1.install rabbitMq in local windows system
2.Open rabbitMQ terminal & run - rabbitmq-plugins enable rabbitmq_management

STEPS FOR PM2
----------------
1.npm install -g pm2
2.pm2 start ecosystem.config.js

POSTMAN LINK
------------
POSTMANLINK - https://www.getpostman.com/collections/a05ed9d8168c9e71be82
