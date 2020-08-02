# STORE

## index

houses the authentication logic.

`user` stores the user with the current session.
`loggedIn` is a boolean flag indicating if there's a user with an active session.
Ideally I use [nuxt auth](https://auth.nuxtjs.org/) to achieve this functionality as it persists the state. But I think my setup will suffice for this test 😃.

## contacts

Houses the user's contact list.
This is an array with the following structure.

    ```
    [
    {
        "userId": {
        "1": [
            {
            "firstName": "hello world",
            "email": "jane@doe.com"
            },
            {
            "firstName": "hello world",
            "email": "jane@doe.com"
            }
        ]
        },
        "2": [
        {
            "fullName": "Sean Cena",
            "email": "sena@doe.com"
        }
        ]
    }
    ]
    ```

the state `userContact` filters the user's specifict contact list.
Relevant getters and Mutations ensure the appropriate data gets to the frontend.

## seats

### settings.js

This store contains the user's "room" settings. i.e number of rows and columns each user has.

    ```
    userId: {
      '1': {
        rows: 6,
        cols: 6,
      },
      '2': {
        rows: 7,
        cols: 5,
      },
      '3': {
        rows: 4,
        cols: 5,
      },
    }
    ```

### core.js

Houses the all the seats in the system as well as a state that holds currently logged in user's seat allocation.
Relevant Mutation and getter ensures the appropriate data gets to the frontend.
