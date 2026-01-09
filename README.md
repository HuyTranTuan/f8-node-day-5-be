### Clone the repository

git clone https://github.com/HuyTranTuan/f8-node-day-5-be.git

### Install dependencies

npm install

3.  Environment VariablesCreate a .env file in the root directory and add your database credentials:

    DB_HOST=localhost
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=your_db_name
    PORT=3000

4.  Database SetupRun:

\_ Register: POST /api/auth/register
{
"email": "youremail@gmail.com",
"password": "yourpassword"
}

\_ Login: POST /api/auth/login
{
"email": "youremail@gmail.com",
"password": "yourpassword"
}
You will receive an accessToken, copy it and paste in to header "Authorization" with `Bearer {your_access_token}`

\_ Create conversation POST /api/conversations
{
"name" : "name of the conversation",
"participants": [list participant's id]
}

\_ Get all conversation of currentUser GET /api/conversations

\_ Add user to conversation POST /api/conversations/:id/participants - Thêm user vào conversation (chỉ group chat), nhận user_id trong body
{
"user_id" : "user id",
}

\_ Send message to conversation POST /api/conversations/:id/messages
{
"content" : "your content"
}

\_ Get all messages in conversation GET /api/conversations/:id/messages

👨‍💻 AuthorHuy Tran TuanGitHub
