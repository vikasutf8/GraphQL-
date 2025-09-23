# Twitter Clone

# Technologies
- Node.js
- GraphQL
- primsa ORM
- Postgres
- Supabase
- NextJs
- Tailwind CSS
- Shadcn UI
- TypeScript
- AWS


---

### GraphQL

- Describe your data
- Ask for what you need
- Get predictable responses

- Query -- Get data
- Mutation -- Create, Update, Delete
- Subscription -- Real-time updates

---

### OAuth2
- react-oauth-google
- Response after authentication /click on sign with G
```
clientId:"94720129069-......apps.googleusercontent.com"
credential: "eyJhbGciOiJSUzI1NiI..............._VOQ"
select_by: "btn_confirm"
```
- This Credential token is short live  and having all info of user == that show tested by jwt.io easy 
- IMPORTANT : we just see not update 



- Extraction | decode of AuthToken as api call    
GET : https://oauth2.googleapis.com/tokeninfo/${token}
Response.data
```
{
  iss: 'https://accounts.google.com',
  azp: '94720129069-ebgd3njqtkditbidfuhle5jbbl1kiu62.apps.googleusercontent.com',
  aud: '94720129069-ebgd3njqtkditbidfuhle5jbbl1kiu62.apps.googleusercontent.com',
  sub: '101962612943537086057',
  email: 'vikasarya1889@gmail.com',
  email_verified: 'true',
  nbf: '1758541897',
  name: 'Vikas Arya',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocKGRBcqLMxWBqj4t6utJjiuTgjjE_lUOtBpodalVQyM2IYQGw7q=s96-c',
  given_name: 'Vikas',
  family_name: 'Arya',
  iat: '1758542197',
  exp: '1758545797',
  jti: '2211e6322c1fe2d72210219a9e3f443587f8d3d1',
  alg: 'RS256',
  kid: '927b8fb67bbad77445e5fea4c71aa9846d7ddd01',
  typ: 'JWT'
}
```

- Convert AuthToken to JWT and Save in DB
- Response of JWT:
```
{
  "id": "7a7ef311-7384-4a95-9ee4-96964fd1e356",
  "email": "vikasarya1889@gmail.com",
  "iat": 1758543493,
  "exp": 1758547093
}
```

---
Codegen --

---

React Query - TanStack Query
to cache data