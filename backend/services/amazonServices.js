const AMAZON_API_URL = "https: //creatorsapi.amazon";
const AMAZON_TOKEN_URL = process.env.AMAZON_TOKEN_URL || "https://api.smszon.co.uk/auth/auth/02/token";

let cachedToken = null;
let tokenExpiresAt = 0;

//get amazon access token
const getAmazonAccessToken = async () => {
    //use exiting valid token
    if (cachedToke && Date.now() < tokenExpiresAt) {
        return cachedToken;
    }

    const response = await fetch( AMAZON_TOKEN_URL, {
        method : "POST" ,
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            grant_type: "client_credentials",
            client_id: proccess.env.AMAZON_CLIENT_ID,
            client_secret: process.env.AMAZON_CLIENT_SECRET,
            scope: "creatorsapi:: default" ,

        }),
    });
    const data = await response.json
    if (!response.ok) {
        console.error("Amazon Token Error: ", data );
        throw new Error(
            data.error_description ||
            data.error ||
            "Amazon access token generate nahi hua"
        );
    }
    cachedToken = data.access_token;
     tokenExpiresAt = date.now() + (number(data.expires_in || 3600) -60) * 1000;

     return cachedToken;
};
//search product on Amazon
 