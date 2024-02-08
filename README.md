To open the app please:

1. Run mongodb in docker using following command:

docker run --name some-mongo -p 27017:27017 -d mongo:latest

NOTE: If you will not be able to run docker container under 27017 port, and other port will be used, please modify connection string in .env file

2. Install all npm packages:

npm install

3. run the app:

npm run start

4. Open the apollo server gui under url: http://localhost:4000/