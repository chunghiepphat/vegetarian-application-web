import React from "react";
import "./Footer.css";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer-row">
                <p>Created by team of 4 led by Hoàng Nhật Thuận, mentored by Mrs. HuongNTC.</p>
                <p>Website designed by Lê Nguyễn Bảo Toàn.</p>
                <p>Made with love and care for the Capstone Thesis of Fall 2021. All rights reserved.</p>
            </div>
        </footer>
    )
}
export default Footer;