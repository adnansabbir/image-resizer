# Image Resizer
#### Node.js, Angular, S3 & SQS

## Steps to start
- Clone repo
- Intall npm packages
- Add aws credential file
- Run client
- Run server
- Run worker

### Clone repo
To clone the repo open **cmd** and type
```sh
git clone https://github.com/adnansabbir/image-resizer.git
```

### Intall npm packages
Open **cmd** and navigative to the cloned folder
> For client (Angular)
```sh
cd client/image-resizer
npm install
```
> For node.js (Server and Worker)
```sh
cd server
npm install
```

### Add aws credential file
Navigate to `C:\Users\[your-username]`
- Create a folder named `.aws`
- Inside `.aws` folder create a file named `credentials` with no extension
- Copy this to the `credentials` file with `[YOUR_ACCESS_KEY_ID]` and  `[YOUR_SECRET_ACCESS_KEY]` then save
```sh
[default]
aws_access_key_id = [YOUR_ACCESS_KEY_ID]
aws_secret_access_key = [YOUR_SECRET_ACCESS_KEY]
```

### Run client
From `image-resizer` folder
```sh
cd client/image-resizer
npm start
```

### Run server
From `image-resizer` folder
```sh
cd server
npm start
//or
npm run server
```

### Run worker
From `image-resizer` folder
```sh
cd server
npm run worker
```
Run multiple worker by passing a number argument after command. The below command will run 2 workers
```sh
cd server
npm run worker 2
```

## Resizing a file
- From browser Navigate to http://localhost:4200/
- Select files (Min 1, Max 5)
- Select a size
- Click `Request Upload Urls` button
- Copy the urls and upload files via `Postman`
- Click `Resize Files`
- On successful resize a `Download` icon will appear.


## Improvements needed

- Need to allow localhost at S3 bucket or run client locally with a custom domain and certificate
- S3 bucket names and SQS queue names needs to be moved to environment file
- Need to implement websockets to send status updates to client instead of long polling http requests
- Need to add cookie header to assign anonymous identities to browsers and track their file resize activities
- Added another SQS queue to create s3 bucket cleanup task with delay
- Add database to store file resize activities
