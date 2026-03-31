// import { NextResponse } from "next/server";

// export function middleware(request){

//   return NextResponse.redirect(new URL("/about", request.url));

// }

import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
});

export const config = {
  matcher: ["/account/:path*"],
};
