## **Get Quote Summary**

Returns json data about a quote before user is authenticated.

- **URL**

  /quotes/summary

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]`

- **Data Params**

  None

- **Authentication**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** 
    ```javascript
      {
        "id": "987zyx",
        "associatedUsers": [
          {
            "id": "yf2hw7wehu",
            "primary": true,
            "updated": 1630057276474
          },
          {
            "id": "yf2hw7kskd",
            "primary": false,
            "updated": 1630057276474
          }
        ],
        "associatedFirmId": "123abc",
        "AML": {
          "provider": "Thirdfort"
        }
      }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Quote can not be found" }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

- **Sample Call:**

  ```javascript
    fetch({
      url: "/quotes/summary?id=987zyx",
      dataType: "json",
      type : "GET",
      headers : {
        "Content-Type": "application/json"
      };
    });
  ```
