## **Update User Details**

POSTs the user details to update the user in DB.

- **URL**

  /users/update

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
        "message": "User was updated correctly"
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
      url: "/users/update?id=yf2hw7kskd",
      dataType: "json",
      type : "POST",
      headers : {
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json"
      },
      body : {
        "id":"yf2hw7kskd",
        "title":"Mrs",
        "firstName":"Joanne",
        "surname":"Blogs",
        "email":"joanneblogs@example.com",
        "telephone":"+447754981992",
        "dialCode":"+44",
        "telNoDialCode":"7754981992",
        "contact":{
          "primary":false,
          "email":false,
          "tel":true
        },
        "validated":true,
        "token":true,
        "agreed":{
          "gdpr":false,
          "tAndC":false,
          "all":false
        },
        "addresses":[
          {
            "type":"Primary",
            "firstLine":"123, Acacia Avenue",
            "secondLine":"",
            "townCity":"A Town",
            "county":"Lincolnshire",
            "postCode":"SE12 1AA"
          },
          {
            "type":"Work",
            "firstLine":"123, Acacia Avenue",
            "secondLine":"",
            "townCity":"A Town",
            "county":"Lincolnshire",
            "postCode":"SE12 1AA"
          }
        ],
        "AML":{
          "thirdfort":{
            "type":"v2",
            "status":"open",
            "name":"Purchase of 456 London Road",
            "ref":"987zyx",
            "request":{
              "actor":{
                "name":"Joanne Blogs",
                "phone":"+447754981992"
              },
              "tasks":[
                {"type":"documents:poa"},
                {"opts":{"nfc":"preferred"},
                "type":"report:identity"},
                {"type":"report:footprint"},
                {"type":"report:peps"}
              ]
            },
            "metadata":{
              "context":{"tenant_id":"558533677"},
              "print":{
                "tenant":"ABC 123 Solicitors",
                "user":"Henry Lawman"
              },
              "created_at":"2021-11-12T11:49:03.066Z",
              "created_by":"558533679",
              "notify":{
                "type":"email",
                "data":{
                  "recipients":[
                    {
                      "email":"henry@abc-123-solicitors.com",
                      "name":"Henry Lawman"
                    }
                  ],
                  "params":{
                    "actor_name":"Joanne Blogs",
                    "transaction_name":"Purchase of 456 London Road"
                  }
                }
              },
              "ce":{"uri":"/v1/checks/638520380"}
            },
            "id":"628510554",
            "reports":[]
          },
          "CREDAS":{
            "webJourneyUrl":null,
            "id":"2018cd03-1b52-4f70-ac58-80f94d5aa771",
            "regCode":"XNZ74GJ8",
            "paliQuoteId":"987xyz"
          }
        }
      }
    );
  ```
