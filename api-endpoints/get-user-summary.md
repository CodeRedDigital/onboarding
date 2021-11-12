## **Get User Summary**

Returns json data about a user before user is authenticated.

- **URL**

  /users/summary

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** 
    ```javascript
      {
        "id": "yf2hw7kskd",
        "title": "Mrs",
        "firstName": "Joanne",
        "surname": "Blogs",
        "email": "joanneblogs@example.com",
        "validated": true
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
      url: "/users/summary?id=yf2hw7kskd",
      dataType: "json",
      type : "GET",
      headers : {
        'apikey': SECRET_API_KEY,
        "Content-Type": "application/json"
      };
    });
  ```
