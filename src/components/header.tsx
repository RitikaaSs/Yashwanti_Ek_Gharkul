"use client";
import React, { useState } from "react";

const Header = () => {
    // state to control menu open/close
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <section className="header_main_section">
            <header className={menuOpen ? "menu_open" : ""}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header_mainbox">
                                <div className="header_logobox">
                                    {/* <img src="/assets/images/home/logo.webp" alt="Logo" className="img-fluid" /> */}
                                </div>
                                <div
                                    className="menu-toggle"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <svg width="40" height="40" viewBox="0 0 100 100">
                                        <g>
                                            <path
                                                d="M83.333 33.333H16.667a4.167 4.167 0 0 1 0-8.333h66.667a4.166 4.166 0 1 1-.001 8.333zM87.5 50a4.166 4.166 0 0 0-4.167-4.167h-50a4.167 4.167 0 0 0 0 8.334h50A4.166 4.166 0 0 0 87.5 50zm0 20.833a4.165 4.165 0 0 0-4.167-4.167H50A4.166 4.166 0 1 0 50 75h33.333a4.165 4.165 0 0 0 4.167-4.167z"
                                                fill="#028298"
                                            />
                                        </g>
                                    </svg>
                                </div>
                                <div className="header_menu_box">
                                    <div className="close_btn"
                                        onClick={() => setMenuOpen(!menuOpen)}>
                                        <svg width="40" height="40" x="0" y="0" viewBox="0 0 64 64">
                                            <g>
                                                <path
                                                    d="M43.414 20.586a2 2 0 0 0-2.828 0L32 29.172l-8.586-8.586a2 2 0 0 0-2.828 2.828L29.172 32l-8.586 8.586a2 2 0 1 0 2.828 2.828L32 34.828l8.586 8.586a2 2 0 1 0 2.828-2.828L34.828 32l8.586-8.586a2 2 0 0 0 0-2.828z"
                                                    fill="#ffffff" opacity="1" data-original="#000000"></path>
                                                <path
                                                    d="M50 8H14a6.007 6.007 0 0 0-6 6v36a6.007 6.007 0 0 0 6 6h36a6.007 6.007 0 0 0 6-6V14a6.007 6.007 0 0 0-6-6zm2 42a2.002 2.002 0 0 1-2 2H14a2.002 2.002 0 0 1-2-2V14a2.002 2.002 0 0 1 2-2h36a2.002 2.002 0 0 1 2 2z"
                                                    fill="#ffffff" opacity="1" data-original="#000000"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <nav>
                                        <ul>
                                            <li><a href="">Home</a></li>
                                            <li><a href="">About Us</a></li>
                                            <li><a href="">Services</a></li>
                                            <li><a href="">Blog</a></li>
                                            <li><a href="">Contact Us</a></li>
                                            <li>
                                                <a href="" className="header_login_btn">
                                                    <div>
                                                        <svg width="20" height="20" x="0" y="0" viewBox="0 0 32 32">
                                                            <g transform="matrix(1.0499999999999998,0,0,1.0499999999999998,-0.800000905990597,-0.8003036022186265)">
                                                            <path d="M12.725 18.301h4.32a7.634 7.634 0 0 1 6.499 3.579.9.9 0 0 0 1.523-.959 9.396 9.396 0 0 0-5.438-4.057 8.598 8.598 0 0 0 3.855-7.165c0-4.741-3.857-8.599-8.599-8.599S6.287 4.957 6.287 9.698a8.594 8.594 0 0 0 3.857 7.167c-3.992 1.129-6.929 4.797-6.929 9.144v1.23c0 1.354.956 2.516 2.268 2.764a49.34 49.34 0 0 0 9.402.896h.45a.9.9 0 0 0 0-1.8h-.45c-3.066 0-6.113-.29-9.063-.864a1.005 1.005 0 0 1-.807-.995v-1.23c0-4.251 3.459-7.709 7.71-7.709zM8.086 9.698A6.806 6.806 0 0 1 14.884 2.9c3.749 0 6.799 3.049 6.799 6.798s-3.05 6.799-6.799 6.799a6.806 6.806 0 0 1-6.798-6.799z" fill="#ffffff" opacity="1" data-original="#000000"></path>
                                                            <path d="m28.521 27.151-2.212-2.212a.9.9 0 0 0-1.272 1.273l.675.675h-6.577a.9.9 0 0 0 0 1.8h6.577l-.675.675a.9.9 0 1 0 1.272 1.273l2.212-2.212a.898.898 0 0 0 0-1.272z" fill="#ffffff" opacity="1" data-original="#000000"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        LOGIN
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="header_absoluate_logobox">
                            <img src="/assets/images/home/logo.webp" alt="Logo" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header