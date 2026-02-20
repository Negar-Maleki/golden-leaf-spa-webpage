import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo-dark.png";

function Logo() {
  return (
    <Link href="/">
      <Image
        src={logo}
        width="60"
        height="60"
        quality={50}
        alt="The Golden Leaf Spa logo"
      />
      {/* <Image
        src="/logo-dark.png"
        width="60"
        height="60"
        alt="The Golden Leaf Spa logo"
      /> */}
    </Link>
  );
}

export default Logo;
