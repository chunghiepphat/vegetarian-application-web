import React, {useState} from "react";
import "./Header.css";
import Brand from "./Brand";
import SearchForm from "./SearchForm";
import Nav from "./Nav";
import Link from "./Link";
import Modal from "./Modal";


function Header() {
    const [show, setShow] = useState(false);
    return (
        <header class="site-header">
            <div>
                <Brand/>
                <Nav>
                    <Link url="/#">Home</Link>
                    <Link url="/#">About us</Link>
                </Nav>
            </div>
            <SearchForm placeholder="What would you have for dinner?"/>
            <Nav>
                <Link url="/#" click={() => setShow(true)}>Sign in</Link>
            </Nav>
            <Modal close={() => setShow(false)} show={show}/>
        </header>
    );
}

export default Header;