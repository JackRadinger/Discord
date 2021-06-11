# Flask React Project

# Disvoice
Disvoice is a direct clone of Discord.
To explore disvoice click [here](https://disvoice.herokuapp.com/).
### Splash Page
![image of splash](https://github.com/JackRadinger/Discord/blob/main/Wiki_Images/disvoice-splash-page.png)
### Login Page
![image of login](https://github.com/JackRadinger/Discord/blob/main/Wiki_Images/disvoice-login-page.jpg)
### Signup Page
![image of signup](https://github.com/JackRadinger/Discord/blob/main/Wiki_Images/disvoice-sign-up-page.jpg)
### Home Page
![image of home](https://github.com/JackRadinger/Discord/blob/main/Wiki_Images/disvoice-home-page.png)
### Direct Message Page
![image of directmessages](https://github.com/JackRadinger/Discord/blob/main/Wiki_Images/disvoice-direct-message-page.png)
### Server Page
![image of server](https://github.com/JackRadinger/Discord/blob/main/Wiki_Images/disvoice-server-page.png)

# Structure
### Back End
Disvoice was built using Flask for the server with a postgreSQL database. The back end structure utilizes RESTful convention and handles user requests through our API. disvoice is session based and uses BCrypt to safely store user passwords and verify login credentials.
### Front End
The front end was built using React and Redux to render the pages with JavaScript.

### List of Technologies
* Flask
* BCrypt
* PostgreSQL
* Heroku
* React
* Redux
* Websockets

### Core Features
* Join, Create, Edit, Delete Server
* Create, Edit, Delete Channel
* Create Direct Messages
* Live messaging

##### User Authorization
User authentication is handled in JavaScript using BCrypt to hash passwords for storage. To authenticate users, the submitted password is hashed and then compared to the hashed password stored in the database.
````
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];


router.post(
    '',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      console.log(firstName, lastName)
      const user = await User.signup({ firstName, lastName, email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
);
````
In order for the user to log in, I first check to see if the inputs are valid. Then, I find the user in the database based on their email. If I are able to find a user, then I hash their input password and compare it to the hashed password stored in the server. Finally, if the hashed input password matches the stored hashed password, the user is logged in with their session persisted and redirected to home page.
##### Session
Sessions are stored server side using SQLAlchemy. For actions that require authorization, the server verifies that a cookie with a matching user id as the user exists in the storage. Upon verification that a session does exist for that user, the user is then all allowed to perform CRUD operations. If no such session exists in the storage, then user is redirected to the login page.

````
// This route is used to login a user. The demo user is handled in the front end by assigning values associated with the demo user.

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors,
  ];

router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
);

````

#### To Do
Allow users to:
1. update profile information such as their email
2. update ratings and reviews
3. update spots
4. reply to other comments
