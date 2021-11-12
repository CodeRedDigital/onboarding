## **Get User Details**

Returns json data about a user after user is authenticated.

- **URL**

  /users/details

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
        "telephone": "+447777123456",
        "dialCode": "+44",
        "telNoDialCode": "7777123456",
        "contact": {
          "primary": false,
          "email": false,
          "tel": true
        },
        "validated": true,
        "token": true,
        "agreed": {
          "gdpr": false,
          "tAndC": false,
          "all": false
        },
        "addresses": [
          {
            "type": "Primary",
            "firstLine": "123, Acacia Avenue",
            "secondLine": "",
            "townCity": "A Town",
            "county": "Lincolnshire",
            "postCode": "SE12 1AA"
          },
          {
            "type": "Work",
            "firstLine": "123, Acacia Avenue",
            "secondLine": "",
            "townCity": "A Town",
            "county": "Lincolnshire",
            "postCode": "SE12 1AA"
          }
        ]
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
      url: "/users/details?id=yf2hw7kskd",
      dataType: "json",
      type : "GET",
      headers : {
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json"
      };
    });
  ```
