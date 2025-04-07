import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Use `jose` instead of `jsonwebtoken`

const secretKey = new TextEncoder().encode("f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6");

export async function middleware(req) {
//   console.log("Middleware executed for:", req.nextUrl.pathname);

  const token = req.cookies.get("token")?.value;
//   console.log("Token from cookies:", token);

  if (!token) {
    console.log("No token found. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    // console.log("Decoded JWT:", payload);
    return NextResponse.next(); // Proceed if the token is valid
  } catch (error) {
    // console.log("JWT Verification Failed:", error.message);
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect if invalid
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protect these routes
};
