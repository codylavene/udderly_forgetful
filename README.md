# Udderly Forgetful

## [Live Link](http://udderly-forgetful.herokuapp.com)

Team Project with [Matthew Satterwhite](https://github.com/MatthewSatt), [Steve Correa](https://github.com/scorrea310), [Cody Lavene](https://github.com/codylavene), and [Justin Chau](https://github.com/jchau-623).

Udderly Forgetful is a clone of the to-do list app [Remember the Milk](https://www.rememberthemilk.com)

# Technologies Used

![jsIcon](https://user-images.githubusercontent.com/46228676/158465578-3e4d0dc9-28cd-4ce8-8127-52ee8e330249.png)
![nodejsIcon](https://user-images.githubusercontent.com/46228676/158466030-a99e308f-03a9-436b-a8fe-04820f53ed58.png)
![postgreSQLIcon](https://user-images.githubusercontent.com/46228676/158466166-61667b21-75d1-4502-abbe-6f151cfad4b7.png)
![sequelizeIcon](https://user-images.githubusercontent.com/46228676/158466591-62fc5534-8d7c-4396-b23d-c55cb10a5650.png)
![expressjs-icon (1)](https://user-images.githubusercontent.com/46228676/158468250-400b42c6-403b-4ca0-91fc-a11cebf6ce45.png)
![CSSIcon](https://user-images.githubusercontent.com/46228676/158466762-1ec0af4e-6827-4c9c-b353-1cd8763cca6f.png)
![html5Icon](https://user-images.githubusercontent.com/46228676/158466850-3eebf081-0843-40a7-9a71-c47a681870b5.png)
![gitIcon](https://user-images.githubusercontent.com/46228676/158466914-bc00bb37-7b69-4966-8b38-f28beb8318c3.png)
![vsCodeIcon](https://user-images.githubusercontent.com/46228676/158467014-c04d33bc-a58b-4de8-95d4-a3149ccc6d0a.png)
![pugIcon](https://user-images.githubusercontent.com/46228676/158467177-71fdc51d-6431-4d8f-a305-48a0b63f6f6a.png)




# Getting Started

1. Clone this repository

`git clone git@github.com:codylavene/udderly_forgetful.git`

2. Install dependencies

`npm install`

3. Create a .env file based on the .env.example given

4. Setup your username and database based on what you setup in your .env

5. Migrate and Seed models

`npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all`

6. Start the app using:

`npm start`

You can use the Demo user or create an account

# Walkthrough

Landing Page

<img width="1426" alt="Screen Shot 2022-03-15 at 1 39 56 PM" src="https://user-images.githubusercontent.com/46228676/158468501-054a8f9a-1120-4dfe-9c6f-955bc7163bd4.png">

Users can login or sign up or use Demo User.

<img width="1423" alt="Screen Shot 2022-03-15 at 1 40 53 PM" src="https://user-images.githubusercontent.com/46228676/158468646-e265b7ea-ce8a-4958-a422-49d087ae0ba9.png">

Users Can Add a task. 

<img width="1437" alt="Screen Shot 2022-03-15 at 1 41 25 PM" src="https://user-images.githubusercontent.com/46228676/158468725-ae1cd456-3654-4a75-b9d2-c9cb3e94423d.png">

Users can add a List

<img width="1434" alt="Screen Shot 2022-03-15 at 1 42 05 PM" src="https://user-images.githubusercontent.com/46228676/158468834-e8a482de-49ee-4ab2-a9ff-4429754f50a8.png">

Users Can Edit Task Details 
<img width="1231" alt="Screen Shot 2022-03-15 at 1 42 51 PM" src="https://user-images.githubusercontent.com/46228676/158468971-42e52446-cf71-4cb2-a7cd-7bbcab22ecad.png">

