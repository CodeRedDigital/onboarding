## **Get Firm Details**

Returns json data about a firm before user is authenticated.

- **URL**

  /firm/summary

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
        "id": "123abc",
        "name": "ABC 123 Solicitors",
        "url": "https://www.abc-123-solicitors.com",
        "colours": {
          "primary": "ff0000",
          "primaryOpposite": "000000",
          "secondary": "00ff00",
          "secondaryOpposite": "ffffff",
          "secondary": "0000ff",
          "secondaryOpposite": "ffffff"
        },
        "logos": {
          "whiteSvg": "abc-123-logo-white.svg",
          "whitePng": "abc-123-logo-white.png",
          "colourSvg": "abc-123-logo-colour.svg",
          "colourPng": "abc-123-logo-colour.png"
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
      url: "/firm/summary?id=abc123",
      dataType: "json",
      type : "GET",
      headers : {
        'apikey': SECRET_API_KEY,
        "Content-Type": "application/json"
      };
    });
  ```
