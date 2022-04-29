# Web_Crawler

API to crawl and extract product reviews from Tigerdirect.

- In case reviews are found, it returns them as an array with http status=200.
- If no reviews are found on that particualar product or the wrong page url is provided, it shows the http status=422 and appropriate message.
- If servers are down, it shows a message with Http status=500, internal server error.
- In case invalid route of api is provided, it shows the appropriate message with http status=404.

# Technical stack

- node js
- express js framework
- Puppeteer package

# Environment Variables

```bash
PORT: Port on which the server should run
```

# Instructions to test the api

- start the server using "npm run dev" command.
- use this url to extract the data from website: "http://localhost:8080/api/v1/crawl?productURL={url}"
- sample url: http://localhost:8080/api/v1/crawl?productURL=https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3
