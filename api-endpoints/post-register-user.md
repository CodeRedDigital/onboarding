## **Post User Registration**

This is sent to set a users password with they have not previously registered. This will return a **JWT** that user will then use to prove who they are.

- **URL**

  /pali/api/auth/register

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Data Params**

  None

- **Data Params**

  API Key

- **JSON Web Token**

  - **header:** `{"alg": "HS256","typ": "JWT"}` <br />
  - **payload:** `{"user": "userId", "quote": "quoteId", "firm": "firmId", "solicitor": "solicitorId", "exp": "token expiry time", "iat": "now,"}` <br />
  - **signature:** `Secret JWT Key` 

- **Example JWT**
  - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY3N5YmZ5dXdiODciLCJxdW90ZSI6Ijk4N3p5eCIsImZpcm0iOiJhYmMxMjMiLCJzb2xpY2l0b3IiOiJhYmMxMjMtMDAxIiwiZXhwIjozODcyNzkyODc4NzMyLCJpYXQiOjM4NzI3OTAyODY3MzJ9.44JhpQZOgV5Kr2pXnZhQWCeWVx4yl3IdsFpCJ98GcFA`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
      {
        "jwt": jwt,
      }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User can not be found" }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

- **Sample Call:**

  ```javascript
    fetch({
      url: "/api/register",
      dataType: "json",
      type : "POST",
      headers : {
        'apikey': SECRET_API_KEY,
        "Content-Type": "application/json"
      },
      body : {
        id: "yf2hw7kskd",
        email: "joanneblogs@example.com",
        password: "string containing users password they set"
      };
    });
  ```
