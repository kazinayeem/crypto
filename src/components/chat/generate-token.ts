import { AccessToken } from "livekit-server-sdk";

const apiKey = "APIUYXsmcPrUhGA";
const apiSecret = "2yFeJ3hWJikk2vfjs5eR4PPLQLpOJtRLYeeLpyL6ZkBH";

export async function generateToken() {
  const token = new AccessToken(apiKey, apiSecret, {
    identity: "user-" + Math.floor(Math.random() * 1000),
    name: "React User",
    ttl: "1h", // token expires in 1 hour
  });

  token.addGrant({
    roomJoin: true,
    room: "default-room",
  });

  const jwt = await token.toJwt(); // <- Await the async token
  console.log(jwt);
}

//
