'use client';
import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer_top_box">
                <div className="footer_back_imgbox">
                    <img src="/assets/images/home/footer-background.webp" alt="Footer background image" className="img-fluid" loading='lazy' />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-10">
                            <div className="footer_top_mainbox">
                                <div className="footer_top_first_box">
                                    <div className="footer_icon_box">
                                        <img src="/assets/images/home/footer-logo.webp" alt="Logo" className="img-fluid" />
                                    </div>
                                    <div className="footer_icon_content">
                                        <p className="m-0">Because Growing Old Should Feel Like Coming Home</p>
                                    </div>
                                </div>
                                <div className="footer_top_second_box">
                                    <h6 className="footer_heading">Quick links</h6>
                                    <div className="footer_quick_links">
                                        <ul>
                                            <li><a href="">About</a></li>
                                            <li><a href="">Services</a></li>
                                            <li><a href="">Contact</a></li>
                                            <li><a href="">Blog</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="footer_top_third_box">
                                    <h6 className="footer_heading">Social Media</h6>
                                    <div className="footer_social_links">
                                        <ul>
                                            <li>
                                                <a href="" target='_blank'>
                                                    <svg width="54" height="54" x="0" y="0" viewBox="0 0 1227 1227"><g><path d="M613.5 0C274.685 0 0 274.685 0 613.5S274.685 1227 613.5 1227 1227 952.315 1227 613.5 952.315 0 613.5 0z" fill="#028298" opacity="1" data-original="#000000"></path><path fill="#ffffff" d="m680.617 557.98 262.632-305.288h-62.235L652.97 517.77 470.833 252.692H260.759l275.427 400.844-275.427 320.142h62.239l240.82-279.931 192.35 279.931h210.074L680.601 557.98zM345.423 299.545h95.595l440.024 629.411h-95.595z" opacity="1" data-original="#ffffff"></path></g></svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" target='_blank'>
                                                    <svg width="54" height="54" x="0" y="0" viewBox="0 0 512 512">
                                                        <circle r="256" cx="256" cy="256" fill="#ffffff" transform="matrix(0.8,0,0,0.8,51.19999999999999,51.19999999999999)"></circle><g transform="matrix(0.9999999999999996,0,0,0.9999999999999996,1.1368683772161603e-13,1.1368683772161603e-13)"><path d="M256 0C114.637 0 0 114.637 0 256s114.637 256 256 256 256-114.637 256-256S397.363 0 256 0zm-74.39 387h-62.348V199.426h62.347zm-31.173-213.188h-.406c-20.922 0-34.453-14.402-34.453-32.402 0-18.406 13.945-32.41 35.274-32.41 21.328 0 34.453 14.004 34.859 32.41 0 18-13.531 32.403-35.274 32.403zM406.423 387h-62.34V286.652c0-25.218-9.027-42.418-31.586-42.418-17.223 0-27.48 11.602-31.988 22.801-1.649 4.008-2.051 9.61-2.051 15.215V387h-62.344s.817-169.977 0-187.574h62.344v26.558c8.285-12.78 23.11-30.96 56.188-30.96 41.02 0 71.777 26.808 71.777 84.421zm0 0" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" target='_blank'>
                                                    <svg width="54" height="54" x="0" y="0" viewBox="0 0 512 512"><circle r="256" cx="256" cy="256" fill="#ffffff" transform="matrix(0.8,0,0,0.8,51.19999999999999,51.19999999999999)"></circle><g transform="matrix(1.0000000000000004,0,0,1.0000000000000004,-1.1368683772161603e-13,-1.1368683772161603e-13)"><circle cx="256" cy="256" r="52.5" fill="#028298" opacity="1" data-original="#000000"></circle><path d="M256 6C117.929 6 6 117.929 6 256s111.929 250 250 250 250-111.929 250-250S394.071 6 256 6zm154.458 313.54c-1.2 23.768-7.879 47.206-25.2 64.343-17.489 17.3-41.038 23.746-65.035 24.934H191.778c-24-1.188-47.546-7.63-65.035-24.934-17.322-17.137-24-40.575-25.2-64.343V192.46c1.2-23.768 7.879-47.206 25.2-64.344 17.489-17.3 41.038-23.746 65.035-24.933h128.444c24 1.187 47.546 7.63 65.035 24.933 17.322 17.138 24 40.576 25.2 64.344z" fill="#028298" opacity="1" data-original="#000000"></path><path d="M318.6 132.138c-31.286-.858-93.906-.858-125.192 0-16.281.447-34.738 4.5-46.338 16.89-12.054 12.879-16.609 28.439-17.071 45.846-.812 30.552 0 122.252 0 122.252.529 17.405 5.017 32.967 17.071 45.846 11.6 12.394 30.057 16.443 46.338 16.89 31.286.858 93.906.858 125.192 0 16.281-.447 34.738-4.5 46.338-16.89 12.054-12.879 16.609-28.439 17.071-45.846V194.874c-.462-17.407-5.017-32.967-17.071-45.846-11.604-12.394-30.061-16.443-46.338-16.89zM256 337.375A81.375 81.375 0 1 1 337.375 256 81.375 81.375 0 0 1 256 337.375zm81.721-145.953A16.275 16.275 0 1 1 354 175.147a16.275 16.275 0 0 1-16.279 16.275z" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" target='_blank'>
                                                    <svg width="54" height="54" x="0" y="0" viewBox="0 0 49.652 49.652"><circle r="24.826" cx="24.826" cy="24.826" fill="#ffffff" transform="matrix(0.8,0,0,0.8,4.965199661254882,4.965199661254882)"></circle><g transform="matrix(1,0,0,1,3.552713678800501e-15,3.552713678800501e-15)"><path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom_box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer_copywrite_box">
                                <div className="footer_bottom_leftbox">
                                    <strong>&copy; 2025 Yashwanti Ek Gharkul</strong>. All Rights Reserved.
                                </div>
                                <div className="footer_bottom_rightbox">
                                    Crafted By
                                    <a href="https://www.evonix.co/" target='_blank'>
                                        <img src="/assets/images/home/evonix-white-logo.webp" alt="Evonix logo" className="img-fluid" loading='lazy' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
