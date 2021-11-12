## **Get Quote Details**

Returns json data about a quote after user is authenticated.

- **URL**

  /quotes/details

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
        "associatedSolicitorId": "123abc-00001",
        "AML": {
          "provider": "Thirdfort",
          "thirdfort": {},
          "credas": {}
        },
        "type": "purchase",
        "associatedAddresses": [
          {
            "address1": "456 London Road",
            "address2": "",
            "town": "London",
            "county": "Greater London",
            "postCode": "E8 1AA",
            "type": "purchase"
          }
        ]
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
      url: "/quotes/details?id=abc123",
      dataType: "json",
      type : "GET",
      headers : {
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json"
      };
    });
  ```
