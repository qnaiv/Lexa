import { Avatar, Dropdown, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export default function NavBar() {
    return (
        <Navbar fluid rounded>
            <NavbarBrand as={Link} href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">lexicollect</span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink as={Link} href="/">検索</NavbarLink>
                <NavbarLink as={Link} href="/collection">コレクション</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    )
}