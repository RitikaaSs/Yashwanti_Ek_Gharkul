"use client";
import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import InnerBanner from "../../components/InnerBanner";

const AboutUs = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="my_about_us_page">
            <Header />
            <main className="about_us_main">
                <InnerBanner
                    inner_banner_heading="About Us"
                    inner_banner_image="/assets/images/about/about-us-banner.webp"
                    inner_banner_alt="About Us Banner"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "About Us", active: true },
                    ]}
                />
        
                {/* About section start */}
                <section className="inner_about_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="inner_about_mainbox">
                                    <div className="inner_about_leftbox">
                                        <h2 className="sub_heading">About Us</h2>
                                        <div className="inner_about_para">
                                            {/* Always visible content */}
                                            <p>
                                                Samipya Foundation is committed to creating meaningful change across different social causes, with a special focus on elder care. We work hand in hand with organizations that support vulnerable seniors, providing financial aid and other forms of help to bring them comfort, dignity, and companionship.
                                            </p>
                                            <p>
                                                Staying true to this mission, we started Yashwanti Ek Gharkul — the cornerstone initiative of Samipya Welfare Foundation. It’s a heartfelt effort to give seniors not just a roof over their heads, but a warm, caring, and fulfilling place they can truly call home.
                                            </p>
                                            <p>
                                                This project did not begin with big plans or big words. It began quietly… with a feeling in the heart. A simple wish to give back to our society, to honor those who came before us, and to care for them with love.
                                            </p>

                                            {/* Hidden section */}
                                            <div className={`extra_content ${isExpanded ? "expanded" : ""}`}>
                                                <p>
                                                    This wish grew slowly, nourished by the memories of our elders, their voices, their blessings and the values they gifted us. In a small village called Pat in Kudal, Sindhudurg, this feeling found its home. Brick by brick, blessing by blessing, a promise began to turn to reality.
                                                </p>
                                                <p>
                                                    When it came to giving this dream a name, we didn’t really search in books or faraway places. We found it in our hearts, our Aaji’s name. With love and pride, we named it Yashwanti Ek Gharkul. Because Yashwanti is not just a name. It is love and gratitude.
                                                </p>
                                                <p>
                                                    And so, Yashwanti Ek Gharkul is more than a home. It is a family. A place where elders live with dignity, joy, and belonging. A home that carries forward the blessings of the past and offers hope for the present and future.
                                                </p>
                                            </div>
                                            <button
                                                className="readmore_btn"
                                                onClick={toggleReadMore}
                                            >
                                                {isExpanded ? (
                                                    <>Read <span>Less</span></>
                                                ) : (
                                                    <>Read <span>More</span></>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="inner_about_rightbox">
                                        <div className="inner_about_background_box">
                                            <img src="/assets/images/about/about-us-yellow-pattern.webp" alt="Pattern image" className="img-fluid" />
                                        </div>
                                        <div className="inner_about_right_img_box">
                                            <img src="/assets/images/about/about-us-name-plate.webp" alt="Gate image" className="img-fluid" />
                                        </div>
                                        <div className="inner_about_slogan_box">
                                            A Project by <br /><span>Samipya Welfare Foundation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* About section ends */}
                {/* Vision section start */}
                <section className="vision_section">
                    <div className="vision_mainbox">
                        <div className="vision_img_box">
                            <img src="/assets/images/about/vision-image.webp" alt="Vision image" className="img-fluid" loading="lazy" />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5 col-md-4"></div>
                                <div className="col-lg-7 col-md-8">
                                    <div className="vision_content_box">
                                        <h2 className="sub_heading">Our Vision</h2>
                                        <p className="m-0">To build a compassionate Gharkul where every elder lives with dignity, joy, and belonging — a home where ageing is embraced with love, respect, and togetherness.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Vision section ends  */}
                {/* Mission section start  */}
                <section className="mission_section">
                    <div className="mission_mainbox">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mission_content_box">
                                        <h2 className="sub_heading">Our Mission</h2>
                                        <div className="my_custom_listing">
                                            <ul>
                                                <li>To provide a safe and caring haven for the elderly.</li>
                                                <li>To nurture dignity, joy, and togetherness in ageing.</li>
                                                <li>To keep families connected, near or far.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mission_img_box">
                            <img src="/assets/images/about/mission-image.webp" alt="Mission image" className="img-fluid" loading="lazy" />
                        </div>
                    </div>
                </section>
                {/* Mission section ends   */}
                {/* Outcomes section start   */}
                <section className="outcomes_section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="outcpmes_contentbox">
                                    <h2 className="sub_heading">Our Strategic Outcomes</h2>
                                    <p className="text-center">Every effort at Yashwanti Ek Gharkul is guided by one purpose — to make life meaningful and comfortable for our elders:</p>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="outcomes_listing_mainbox">
                                    <div className="outcomes_listing_box">
                                        <div className="outcomes_listing_icon">
                                            <img src="/assets/images/about/outcomes-icon-1.webp" alt="Dignified and Joyful Ageing icon" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="outcomes_listing_content">
                                            <div className="outcomes_listing_heading">Dignified and Joyful Ageing</div>
                                            <p className="m-0">A home where elders are valued, respected, and celebrated — where ageing is embraced with grace, dignity, and joy.</p>
                                        </div>
                                    </div>
                                    <div className="outcomes_listing_box">
                                        <div className="outcomes_listing_icon">
                                            <img src="/assets/images/about/outcomes-icon-2.webp" alt="Holistic Well-being icon" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="outcomes_listing_content">
                                            <div className="outcomes_listing_heading">Holistic Well-being</div>
                                            <p className="m-0">Nutritious meals, emotional support, and community bonding come together to nurture complete well-being — body, mind, and heart.</p>
                                        </div>
                                    </div>
                                    <div className="outcomes_listing_box">
                                        <div className="outcomes_listing_icon">
                                            <img src="/assets/images/about/outcomes-icon-3.webp" alt="Safety, Comfort, and Belonging icon" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="outcomes_listing_content">
                                            <div className="outcomes_listing_heading">Safety, Comfort, and Belonging</div>
                                            <p className="m-0">With round-the-clock security, green spaces, and a warm family-like atmosphere, our elders experience peace, comfort, and a deep sense of belonging.</p>
                                        </div>
                                    </div>
                                    <div className="outcomes_listing_box">
                                        <div className="outcomes_listing_icon">
                                            <img src="/assets/images/about/outcomes-icon-4.webp" alt="Lasting Family Connections icon" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="outcomes_listing_content">
                                            <div className="outcomes_listing_heading">Lasting Family Connections</div>
                                            <p className="m-0">Through digital platforms and open engagement, we bring families closer — bridging distances, sharing moments, and keeping bonds alive.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Outcomes section ends    */}
                {/* About registration section start */}
                <section className="about_registration_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="about_registration_mainbox">
                                    <div className="about_registration_leftbox">
                                        <div className="about_registration_heading">Yashwanti Ek Gharkul Registration No.: ________</div>
                                        <div className="my_custom_listing">
                                            <ul>
                                                <li>Registered for undertaking CSR activities (Registration No.: ________)</li>
                                                <li>As a not-for-profit, we stand firmly on the values of accountability, transparency, and ervice.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="about_registration_rightbox">
                                        Welcome to Yashwanti Ek Gharkul, where every elder finds their corner of love, respect, and togetherness.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* About registration section ends  */}
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
