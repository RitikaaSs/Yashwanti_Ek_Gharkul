import React from 'react'

const Header = () => {
    return (
        <section className="header_main_section">
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header_mainbox">
                                <div className="header_logobox">
                                    {/* <img src="/assets/images/home/logo.webp" alt="Logo" className="img-fluid" /> */}
                                </div>
                                <div className="header_menu_box">
                                    <nav>
                                        <ul>
                                            <li><a href="">About</a></li>
                                            <li><a href="">Care</a></li>
                                            <li><a href="">Facilities</a></li>
                                            <li><a href="">Services</a></li>
                                            <li><a href="">Approach</a></li>
                                            <li><a href="">Why Choose Us</a></li>
                                            <li><a href="">Stories</a></li>
                                            <li><a href="">Contacts</a></li>
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