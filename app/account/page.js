import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "user account",
};
export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  return <h1>Welcome {session.user.name}</h1>;
}
