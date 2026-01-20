Auth service for Achato

Use .env.local, copied from .env with your own parameters

By Fabien ARTHUR and Thibaut FIGUEIRA



Routes : 
/api/secure/login : login un utilisateur
POST
```
{
    "User_Email":"fabien.test@email.com",
    "User_Password":"azerty"
}
```

/api/secure/register : register un nouvel utilisateur
POST
```
{
    "User_FirstName":"Fabien",
    "User_LastName":"test",
    "User_Phone":"0120202051",
    "User_Role": "user",
    "User_Email":"fabien.test@email.com",
    "User_Password":"azerty"
}
```

/api/secure/verify : verify le token d'un utilisateur
POST
```

```

/api/user : créer un utilisateur ou getAll utilisateurs
/api/user/:id : get, update (put) ou delete (delete) un utilisateur