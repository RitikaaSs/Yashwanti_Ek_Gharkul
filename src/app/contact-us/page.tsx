import React from 'react'
import Header from "../../components/header";
import Footer from "../../components/footer";
import InnerBanner from "../../components/InnerBanner";

const ContactUs = () => {

    return (
        <div className="contact_page">
            <Header />

            <main className="contact_main">
                <InnerBanner
                    inner_banner_heading="Contact Us"
                    inner_banner_image="/assets/images/contact/contact-banner-image.webp"
                    inner_banner_alt="Contact us banner"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Contact Us", active: true },
                    ]}
                />

                {/* Contact Us - Contact info section start */}
                <section className="contact_info_section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="contact_info_mainbox">
                                    <h2 className="sub_heading text-center">Get In Touch</h2>
                                    <div className="contact_info_listing_box">
                                        <div className="contact_info_listing">
                                            <div className="contact_info_iconbox">
                                                <svg width="40" height="40" x="0" y="0" viewBox="0 0 512 512">
                                                    <g>
                                                        <path d="M467 76H45C20.137 76 0 96.262 0 121v270c0 24.885 20.285 45 45 45h422c24.655 0 45-20.03 45-45V121c0-24.694-20.057-45-45-45zm-6.302 30L287.82 277.967c-8.5 8.5-19.8 13.18-31.82 13.18s-23.32-4.681-31.848-13.208L51.302 106h409.396zM30 384.894V127.125L159.638 256.08 30 384.894zM51.321 406l129.587-128.763 22.059 21.943c14.166 14.166 33 21.967 53.033 21.967s38.867-7.801 53.005-21.939l22.087-21.971L460.679 406H51.321zM482 384.894 352.362 256.08 482 127.125v257.769z" fill="#ffffff" opacity="1" data-original="#000000"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="contact_info_content_box">
                                                <div className="contact_info_heading">Email Address</div>
                                                <div className="contact_info_content">
                                                    <div className="contact_info_anchore mb-1">
                                                        <a href="mailto:yashwantiekgharkul@gmail.com">yashwantiekgharkul@gmail.com</a>
                                                    </div>
                                                    <div className="contact_info_anchore">
                                                        <a href="mailto:">testing@gmail.com</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="contact_info_listing">
                                            <div className="contact_info_iconbox">
                                                <svg width="40" height="40" x="0" y="0" viewBox="0 0 473.806 473.806">
                                                    <g>
                                                        <path d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5-6-6.2-12.3-12.6-18.8-18.6-9.7-9.6-21.3-14.7-33.5-14.7s-24 5.1-34 14.7l-.2.2-34 34.3c-12.8 12.8-20.1 28.4-21.7 46.5-2.4 29.2 6.2 56.4 12.8 74.2 16.2 43.7 40.4 84.2 76.5 127.6 43.8 52.3 96.5 93.6 156.7 122.7 23 10.9 53.7 23.8 88 26 2.1.1 4.3.2 6.3.2 23.1 0 42.5-8.3 57.7-24.8.1-.2.3-.3.4-.5 5.2-6.3 11.2-12 17.5-18.1 4.3-4.1 8.7-8.4 13-12.9 9.9-10.3 15.1-22.3 15.1-34.6 0-12.4-5.3-24.3-15.4-34.3l-54.9-55.1zm35.8 105.3c-.1 0-.1.1 0 0-3.9 4.2-7.9 8-12.2 12.2-6.5 6.2-13.1 12.7-19.3 20-10.1 10.8-22 15.9-37.6 15.9-1.5 0-3.1 0-4.6-.1-29.7-1.9-57.3-13.5-78-23.4-56.6-27.4-106.3-66.3-147.6-115.6-34.1-41.1-56.9-79.1-72-119.9-9.3-24.9-12.7-44.3-11.2-62.6 1-11.7 5.5-21.4 13.8-29.7l34.1-34.1c4.9-4.6 10.1-7.1 15.2-7.1 6.3 0 11.4 3.8 14.6 7l.3.3c6.1 5.7 11.9 11.6 18 17.9 3.1 3.2 6.3 6.4 9.5 9.7l27.3 27.3c10.6 10.6 10.6 20.4 0 31-2.9 2.9-5.7 5.8-8.6 8.6-8.4 8.6-16.4 16.6-25.1 24.4-.2.2-.4.3-.5.5-8.6 8.6-7 17-5.2 22.7l.3.9c7.1 17.2 17.1 33.4 32.3 52.7l.1.1c27.6 34 56.7 60.5 88.8 80.8 4.1 2.6 8.3 4.7 12.3 6.7 3.6 1.8 7 3.5 9.9 5.3.4.2.8.5 1.2.7 3.4 1.7 6.6 2.5 9.9 2.5 8.3 0 13.5-5.2 15.2-6.9l34.2-34.2c3.4-3.4 8.8-7.5 15.1-7.5 6.2 0 11.3 3.9 14.4 7.3l.2.2 55.1 55.1c10.3 10.2 10.3 20.7.1 31.3zM256.056 112.706c26.2 4.4 50 16.8 69 35.8s31.3 42.8 35.8 69c1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.4-1.2 12.3-8.2 11.1-15.6-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3 3.7-15.6 11s3.5 14.4 10.9 15.6zM473.256 209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2 3.7-15.5 11-1.2 7.4 3.7 14.3 11.1 15.6 46.6 7.9 89.1 30 122.9 63.7 33.8 33.8 55.8 76.3 63.7 122.9 1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.3-1.1 12.3-8.1 11-15.4z" fill="#ffffff" opacity="1" data-original="#000000"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="contact_info_content_box">
                                                <div className="contact_info_heading">Phone Number</div>
                                                <div className="contact_info_content">
                                                    <div className="contact_info_anchore mb-1">
                                                        <a href="tel:+919898989898">9898989898</a>
                                                    </div>
                                                    <div className="contact_info_anchore">
                                                        <a href="tel:+918989898989">8989898989</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="contact_info_listing">
                                            <div className="contact_info_iconbox">
                                                <svg width="40" height="40" x="0" y="0" viewBox="0 0 24 24" fill-rule="evenodd">
                                                    <g transform="matrix(1.0899999999999992,0,0,1.0899999999999992,-1.0799999999999912,-1.0799999999999912)"><path d="M12 1.25c-3.723 0-6.75 3.054-6.75 6.821 0 1.276.562 2.859 1.38 4.438 1.801 3.477 4.801 6.979 4.801 6.979a.75.75 0 0 0 1.138 0s3-3.502 4.801-6.979c.818-1.579 1.38-3.162 1.38-4.438 0-3.767-3.027-6.821-6.75-6.821zm0 1.5c2.9 0 5.25 2.387 5.25 5.321 0 1.466-.93 3.376-2.004 5.157-1.152 1.91-2.5 3.664-3.246 4.592-.746-.928-2.094-2.682-3.246-4.592C7.68 11.447 6.75 9.537 6.75 8.071 6.75 5.137 9.1 2.75 12 2.75z" fill="#ffffff" opacity="1" data-original="#000000"></path><path d="M12 5.25a2.751 2.751 0 0 0 0 5.5 2.751 2.751 0 0 0 0-5.5zm0 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM16.784 17.377c.813.244 1.483.546 1.946.9.3.228.52.451.52.723 0 .16-.091.305-.219.45-.212.239-.527.454-.917.654-1.378.705-3.606 1.146-6.114 1.146s-4.736-.441-6.114-1.146c-.39-.2-.705-.415-.917-.654-.128-.145-.219-.29-.219-.45 0-.272.22-.495.52-.723.463-.354 1.133-.656 1.946-.9a.75.75 0 0 0-.432-1.437c-1.238.373-2.2.884-2.778 1.449-.508.495-.756 1.049-.756 1.611 0 .702.397 1.402 1.204 1.986C5.87 22.01 8.714 22.75 12 22.75s6.13-.74 7.546-1.764c.807-.584 1.204-1.284 1.204-1.986 0-.562-.248-1.116-.756-1.611-.578-.565-1.54-1.076-2.778-1.449a.75.75 0 0 0-.432 1.437z" fill="#ffffff" opacity="1" data-original="#000000"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="contact_info_content_box">
                                                <div className="contact_info_heading">Office Address</div>
                                                <div className="contact_info_content">
                                                    <div className="contact_info_anchore">
                                                        Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Contact Us - Contact info section ends  */}

                {/* Contact Us - Map section start  */}
                <section className="contact_map_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="contact_map_mainbox">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7671.694570699371!2d73.5662173157595!3d15.969349542000481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0070065711503%3A0x4b052ddee8b813c7!2sYashwanti%20Ek%20Gharkul!5e0!3m2!1sen!2sin!4v1761819592100!5m2!1sen!2sin"
                                        
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Contact Us - Map section ends  */}
            </main>

            <Footer />
        </div>
    )
}

export default ContactUs