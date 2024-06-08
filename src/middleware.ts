import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { origin } = req.nextUrl;

  // session情報がない場合は/helloへリダイレクト
  if (!req.auth) {
    const newUrl = new URL("/hello", origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  // _next/static等はキャッシュが格納されているのでmiddlewareを適用しない
  matcher: ["/((?!api/auth|hello|_next/static|static|favicon.ico).*)"],
};
