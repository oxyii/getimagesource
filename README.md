# When `getImageSource` is not available

1. Check if converted images is in local storge (or cache). Use it if exists
2. If not - just get it and **save** it for current and future launches

- First endpoint is a Firebase Cloud Functions https://us-central1-getimagesource.cloudfunctions.net/converter/
- Second endpoint is a Heroku app on Free account (can sleep) https://getimagesource.herokuapp.com/

You can deploy this repo onto your server with your endpoint.
Don't forget to set root url (without trailing slash) in root `index.js`:

```js
require('./functions/app')('/your/endpoint/uri').listen(process.env.PORT || 3000);
```

or leave it as is if base url will be `/`.

Now you can start to convert. For more details see endpoint main page.
