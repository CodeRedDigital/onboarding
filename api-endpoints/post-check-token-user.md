## **Post User Login**

This is is a **POST** request to check the users token is still valid. If so the user can continue to use this token otherwise they will be asked to login again.

- **URL**

  /pali/api/auth/check-token

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Data Params**

  None

- **Data Params**

  JWT Token

- **JSON Web Token**

  None

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
        "Content-Type": "application/json"
      },
      body : {
        id: "yf2hw7kskd",
        token: "jwt token"
      };
    });
  ```
