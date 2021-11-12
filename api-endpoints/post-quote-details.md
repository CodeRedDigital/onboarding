## **Update Quote Details**

POSTs the quote details to update the quote in DB.

- **URL**

  /quotes/update

- **Method:**

  `POST`

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
        "message": "Quote was updated correctly"
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
      url: "/quotes/update?id=yf2hw7kskd",
      dataType: "json",
      type : "POST",
      headers : {
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json"
      },
      body : {
        "id": "987zyx",
        "associatedUsers": [
          {
            "id": "yf2hw7wehu",
            "primary": true,
            "updated": 1630057276474,
            "AML":{
              "id": "628510556"
            }
          },
          {
            "id": "yf2hw7kskd",
            "primary": false,
            "updated": 1630057276474,
            "AML":{
              "id": "628510554"
            }
          }
        ],
        "associatedFirmId": "123abc",
        "associatedSolicitorId": "123abc-00001",
        "AML": {
          "provider": "Thirdfort"
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
    );
  ```
