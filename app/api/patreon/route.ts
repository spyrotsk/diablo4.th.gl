import { NextRequest, NextResponse } from "next/server";

const PATREON_TIER_ID = 9268700;

type PatreonToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: "Bearer";
};

function postToken(code: string, redirectURI: string) {
  return fetch("https://www.patreon.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      redirect_uri: redirectURI,
    }),
  });
}

function postRefreshToken(refreshToken: string) {
  return fetch("https://www.patreon.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  });
}

function getCurrentUser(token: PatreonToken) {
  return fetch("https://www.patreon.com/api/oauth2/api/current_user", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
}

function isSupporter(result: any) {
  return !result.data.relationships.pledges.data.some(
    (pledge: any) => pledge.type === "pledge" && pledge.id === PATREON_TIER_ID
  );
}
function toCookieString(token: PatreonToken) {
  return `patreon_token=${JSON.stringify(
    token
  )}; path=/; HttpOnly; SameSite=Strict;`;
}

function toCookieStringEmpty() {
  return `patreon_token=; Max-Age=0; path=/; HttpOnly; SameSite=Strict;`;
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  if (!requestBody.code || !requestBody.redirectURI) {
    return NextResponse.json({ error: "No code provided " }, { status: 400 });
  }
  const tokenResponse = await postToken(
    requestBody.code,
    requestBody.redirectURI
  );
  const tokenResult = await tokenResponse.json();
  if (!tokenResponse.ok) {
    return NextResponse.json(tokenResult, { status: tokenResponse.status });
  }
  const token = tokenResult as PatreonToken;
  const currentUserResponse = await getCurrentUser(token);
  const currentUserResult = await currentUserResponse.json();
  console.log({ currentUserResult });
  if (!currentUserResponse.ok) {
    return NextResponse.json(currentUserResult, {
      status: currentUserResponse.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Set-Cookie": toCookieStringEmpty(),
      },
    });
  }

  if (!isSupporter(currentUserResult)) {
    return NextResponse.json(
      { error: "User is not a patron" },
      {
        status: 403,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": toCookieStringEmpty(),
        },
      }
    );
  }

  return NextResponse.json(
    { success: true },
    {
      status: currentUserResponse.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Set-Cookie": toCookieString(token),
      },
    }
  );
}

export async function GET(request: NextRequest) {
  const patreonToken = request.cookies.get("patreon_token");
  if (!patreonToken) {
    return NextResponse.json(
      { error: "Token expired" },
      {
        status: 498,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": toCookieStringEmpty(),
        },
      }
    );
  }
  try {
    const oldToken = JSON.parse(patreonToken.value) as PatreonToken;
    const refreshTokenResponse = await postRefreshToken(oldToken.refresh_token);

    const refreshTokenResult = await refreshTokenResponse.json();
    if (!refreshTokenResponse.ok) {
      return NextResponse.json(refreshTokenResult, {
        status: refreshTokenResponse.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": toCookieStringEmpty(),
        },
      });
    }
    const token = refreshTokenResult as PatreonToken;

    const currentUserResponse = await getCurrentUser(token);
    const currentUserResult = await currentUserResponse.json();
    if (!currentUserResponse.ok) {
      return NextResponse.json(currentUserResult, {
        status: currentUserResponse.status,
      });
    }

    if (!isSupporter(currentUserResult)) {
      return NextResponse.json(
        { error: "User is not a patron" },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Set-Cookie": toCookieStringEmpty(),
          },
        }
      );
    }

    return NextResponse.json(
      { success: true },
      {
        status: currentUserResponse.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": toCookieString(token),
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Token invalid" },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": toCookieStringEmpty(),
        },
      }
    );
  }
}
