import Navigation from "./Navigation";
import Logo from "./Logo";

function Header() {
  return (
    <header className="border-b border-primary-700 px-8 py-5 z-20 ">
      <div className="flex justify-between items-center max-w-[90rem] mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
