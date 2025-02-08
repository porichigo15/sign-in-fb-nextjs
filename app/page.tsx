"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "<APP_ID>",
        xfbml: true,
        version: "v22.0",
      });
    };
  }, []);

  const handleSignIn = () => {
    FB.login((response) => {
      if (response.status === "connected") {
        console.log("User is logged in:", response);
        setAccessToken(response.authResponse.accessToken);
      } else {
        console.log("User failed to log in:", response);
      }
    });
  }

  const handleSignOut = () => {
    FB.logout(((response) => {
      console.log(response);
      setAccessToken(undefined);
    }));
  }

  return (
    <div className="p-4">
      <Script src="https://connect.facebook.net/en_US/sdk.js"/>
      <div className="flex gap-2 mb-6">
        <button onClick={handleSignIn} className="bg-blue-500 p-4 rounded-lg">
          Sign in with Facebook
        </button>
        <button onClick={handleSignOut} className="border-blue-500 border text-blue-500 p-4 rounded-lg">
          Sign out
        </button>
      </div>

      <div>
        <p>AccessToken: {accessToken}</p>
      </div>
    </div>
  );
}
