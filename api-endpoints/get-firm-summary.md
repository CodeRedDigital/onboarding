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
