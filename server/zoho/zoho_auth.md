1.  creating authorization url
    ( client id, client secret, redirect url,
    response_type code, access_type offline, scopes)

    login
    send authorization request to Zoho

    access

    get callback url and grand_token

    send request to Zoho for getting auth scope
    (access_token?, refresh_token, expires_in, token_type)

    save tokens to database

2.  request to Zoho API

    get token and expires_in from database
    check validity of token and expires_in date

    send refresh_token to Zoho for getting access_token

    put access_token to headers of request

    send request to Zoho for getting data
