import Link from "next/link";
const Navbar = () => {

  return (
    <nav>
      <h2>Welcome To Our Page</h2>
      <Link href="/Home">Home</Link>
      <Link href="/Tickets">Tickets</Link>
    </nav>
  );
};

export default Navbar;
