import React from 'react'
import Header from "../../components/header";
import Footer from "../../components/footer";
import InnerBanner from "../../components/InnerBanner";

const Services = () => {
    return (
        <div className="my_services_page">
            <Header />
            <main className="services_main">
                <InnerBanner
                    inner_banner_heading="Our Services"
                    inner_banner_image="/assets/images/services/our-services-banner.webp"
                    inner_banner_alt="Services Banner"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Our Services", active: true },
                    ]}
                />

                {/* Promise of care section start */}
                <section className="promise_of_care_section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="promise_of_care_mainbox">
                                    <h2 className="sub_heading">Our Promise of Care</h2>
                                    <div className="promise_of_care_firstpara">
                                        <p>Live Life with Love & Dignity</p>
                                    </div>
                                    <div className="promise_of_care_secondpara">
                                        <p>At Yashwanti Ek Gharkul, our servicesis not about providing a facility, it’s about building a loving home. Where elders can enjoy life with peace, safety and belonging.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="promise_of_care_listing_box">
                                    <div className="promise_of_care_listing">
                                        <div className="promise_of_care_listing_img">
                                            <img src="/assets/images/services/card-image-1.webp" alt="Comfortable Living Spaces" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="promise_of_care_listing_content">
                                            <h3 className="promise_of_care_card_heading">Comfortable Living Spaces</h3>
                                            <p className="m-0">
                                                Homely private and semi-private rooms amid greenery — bright, safe, and comfortable. 28 rooms across 5 lift-access floors.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="promise_of_care_listing">
                                        <div className="promise_of_care_listing_img">
                                            <img src="/assets/images/services/card-image-2.webp" alt="Wholesome Nutrition" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="promise_of_care_listing_content">
                                            <h3 className="promise_of_care_card_heading">Wholesome Nutrition</h3>
                                            <p className="m-0">
                                                Fresh, balanced meals made daily with respect for dietary needs — shared, nourishing moments planned with nutrition experts.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="promise_of_care_listing">
                                        <div className="promise_of_care_listing_img">
                                            <img src="/assets/images/services/card-image-3.webp" alt="Wellness & Recreation" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="promise_of_care_listing_content">
                                            <h3 className="promise_of_care_card_heading">Wellness & Recreation</h3>
                                            <p className="m-0">
                                                From yoga and walks to music and games — our recreation hall and green garden nurture body, mind, and heart, with space for celebration, bonding, and fitness.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="promise_of_care_listing">
                                        <div className="promise_of_care_listing_img">
                                            <img src="/assets/images/services/card-image-4.webp" alt="Library & Leisure" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="promise_of_care_listing_content">
                                            <h3 className="promise_of_care_card_heading">Library & Leisure</h3>
                                            <p className="m-0">
                                                A cozy reading corner with books, magazines and soft seating for quiet reflection or shared discussion.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="promise_of_care_listing">
                                        <div className="promise_of_care_listing_img">
                                            <img src="/assets/images/services/card-image-5.webp" alt="Safety & Security" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="promise_of_care_listing_content">
                                            <h3 className="promise_of_care_card_heading">Safety & Security</h3>
                                            <p className="m-0">
                                                24×7 staff, clean and safe spaces, and quick emergency response ensure comfort and peace of mind — all with easy access to shops, healthcare, and essentials.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="promise_of_care_listing">
                                        <div className="promise_of_care_listing_img">
                                            <img src="/assets/images/services/card-image-6.webp" alt="Family Connection – Digital Hug" className="img-fluid" loading="lazy" />
                                        </div>
                                        <div className="promise_of_care_listing_content">
                                            <h3 className="promise_of_care_card_heading">Family Connection – Digital Hug</h3>
                                            <p className="m-0">
                                                Stay connected through updates, photos, and video calls. A dedicated desk helps residents easily reach and chat with loved ones anytime.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Promise of care section ends  */}
            </main>
            <Footer />
        </div>
    )
}

export default Services