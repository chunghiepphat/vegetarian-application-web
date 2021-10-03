import React from "react";
import "./Footer.css";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer-column .col-1">
                <h1>Sitemap</h1>
                <Link to="/home"><FaAngleRight/>Home</Link>
                <Link to="/search"><FaAngleRight/>Search</Link>
                <Link to="/recipes"><FaAngleRight/>Recipes</Link>
                <Link to="/videos"><FaAngleRight/>Videos</Link>
                <Link to="/blogs"><FaAngleRight/>Blogs</Link>
            </div>
            <div className="footer-column .col-2">
                <h1>Tools</h1>
                <Link to="/bmi"><FaAngleRight/>BMI Calculation</Link>
                <Link to="/menu"><FaAngleRight/>Menu generation</Link>
                <Link to="/stores"><FaAngleRight/>Stores near you</Link>
            </div>
            <div className="footer-column .col-3">
                <h1>About</h1>
                <Link to="/about"><FaAngleRight/>Team</Link>
                <Link to="/contact"><FaAngleRight/>Contact</Link>
            </div>
            <div className="footer-column .col4">
                <h1>Resources</h1>
                <a href="https://spring.io/"><FaAngleRight/>Spring Boot</a>
                <a href="https://reactjs.org/"><FaAngleRight/>ReactJS</a>
                <a href="https://flutter.dev/"><FaAngleRight/>Flutter</a>
                <a href="https://www.lipsum.com/"><FaAngleRight/>Documents</a>
            </div>
            <div className="footer-row">
                <p>Created by team of 4 led by Hoàng Nhật Thuận, mentored by Mrs. HuongNTC.</p>
                <p>Website designed by Lê Nguyễn Bảo Toàn.</p>
                <p>Made with love and care for the Capstone Thesis of Fall 2021. All rights reserved.</p>
            </div>
        </footer>
    )
}
export default Footer;