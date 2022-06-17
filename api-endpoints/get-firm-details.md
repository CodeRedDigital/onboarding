## **Get Firm Details**

Returns json data about a firm after user is authenticated.

- **URL**

  /firm/details

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]`

- **Data Params**

  None

- **Authentication**

  JWT

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
      {
        "id": "123abc",
        "name": "ABC 123 Solicitors",
        "url": "https://www.abc-123-solicitors.com",
        "colours": {
          "primary": "ff0000",
          "primaryContrast": "white",
          "secondary": "00ff00",
          "secondaryContrast": "black",
          "tertiary": "0000ff",
          "tertiaryContrast": "black",
          "warning": "f03c3c",
          "warningContrast": "white",
          "success": "34c471",
          "successContrast": "white",
          "notice": "ffa500",
          "noticeContrast": "black",
          "white": "ffffff",
          "lightGrey": "eaeaea",
          "lightGreyContrast": "black",
          "grey": "c2c2c2",
          "greyContrast": "black",
          "darkGrey": "474747",
          "darkGreyContrast": "white",
          "black": "000000"
        },
        "logos": {
          "whiteSvg": "abc-123-logo-white.svg",
          "whitePng": "abc-123-logo-white.png",
          "colourSvg": "abc-123-logo-colour.svg",
          "colourPng": "abc-123-logo-colour.png"
        },
        "modalContent": {
          "tAndC": "content for modal",
          "gdpr": "content for modal",
          "thirdfort": "content for modal",
          "credas": "content for modal"
        },
        "thirdfort": {
          "tenant": {
            "name": "ABC 123 Solicitors",
            "metadata": {
              "context": {
                "tenant_id": "538804118"
              },
              "print": {
                "tenant": "Pali Ltd (Partner)",
                "user": "Pali Ltd Bot"
              },
              "created_at": "2021-09-14T14:35:19.768Z",
              "created_by": "530804290"
            },
            "id": "558533677"
          }
        },
        "solicitors": [
          {
            "id": "123abc-00001",
            "firstName": "Henry",
            "surname": "Lawman",
            "email": "henry@abc-123-solicitors.com",
            "tel": "07899654321",
            "thirdfort": {
              "stubUser": {
                "email": "henry@abc-123-solicitors.com",
                "metadata": {
                  "created_by": "530804290",
                  "created_at": "2021-09-14T14:35:20.435Z"
                },
                "name": "Henry Lawman",
                "roles": [
                  "app:web",
                  "transactions:user"
                ],
                "teams": [],
                "tenant_id": "558533677",
                "type": "stub",
                "id": "558533679"
              }
            }
          },
          {
            "id": "123abc-00002",
            "firstName": "Simon",
            "surname": "Pieman",
            "email": "simon@abc-123-solicitors.com",
            "tel": "07899654456",
            "thirdfort": {
              "stubUser": {
                "name": "Simon Pieman",
                "metadata": {
                  "context": {
                    "tenant_id": "558533677"
                  },
                  "print": {
                    "tenant": "ABC 123 Solicitors",
                    "user": "Pali Ltd Bot"
                  },
                  "created_at": "2021-09-16T10:27:41.198Z",
                  "created_by": "530804290"
                },
                "id": "562565247"
              }
            }
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
      url: "/firm/details?id=abc123",
      dataType: "json",
      type : "GET",
      headers : {
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json"
      };
    });
  ```
