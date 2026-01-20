Auth service for Achato

Use .env.local, copied from .env with your own parameters

By Fabien ARTHUR and Thibaut FIGUEIRA



Routes : 
/api/secure/login : login un utilisateur
/api/secure/register : register un nouvel utilisateur
/api/secure/verify : verify le token d'un utilisateur

/api/user : créer un utilisateur ou getAll utilisateurs
/api/user/:id : get, update (put) ou delete (delete) un utilisateur