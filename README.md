## A list of security issues for this demo app

* Url shorten form is not validate against spam or bot. We need to implement something like reCaptcha or a limitation per user/session. (we need more time to implement that feature)
* It is not currently validate maximum url text length to be shorten.
* It is not tested against Unicode characters in url (like thai language)
* It is not checking for existing full url in system. (eg. there might be many shorten urls for just a same full url.)
* There's might be a chance that Duplication of Shorten-Url occurs. Since shorten url length is default to just 5 charactors. We didn't provide checking for duplication yet.
* API should NOT be able to calling directly from other http. It should be able to call from Its own web application only. So, It's need to implement more on CORS or request hostname or something like Forgery Token.
* The database (MongoDb) is not implementing removing old records. So, database size may grow unlimitedly.

---

## A list of scalability issues

* Currently does not split the UI and the API separately.
* Currently not support to scale up with cloud database. This demo app is using a single mongoDb instance.
