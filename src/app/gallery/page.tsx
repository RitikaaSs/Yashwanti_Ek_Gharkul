"use client";

import React from 'react'
import Header from "../../components/header";
import Footer from "../../components/footer";
import InnerBanner from "../../components/InnerBanner";
import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const Gallery = () => {
    useEffect(() => {
        Fancybox.bind("[data-fancybox='gallery']", {});

        return () => {
            Fancybox.destroy();
        };
    }, []);

    const images = [
        "/assets/images/gallery/gallery-1.webp",
        "/assets/images/gallery/gallery-2.webp",
        "/assets/images/gallery/gallery-3.webp",
        "/assets/images/gallery/gallery-4.webp",
        "/assets/images/gallery/gallery-1.webp",
        "/assets/images/gallery/gallery-2.webp",
        "/assets/images/gallery/gallery-3.webp",
        "/assets/images/gallery/gallery-4.webp",
        "/assets/images/gallery/gallery-1.webp",
        "/assets/images/gallery/gallery-2.webp",
        "/assets/images/gallery/gallery-3.webp",
        "/assets/images/gallery/gallery-4.webp",
        "/assets/images/gallery/gallery-1.webp",
        "/assets/images/gallery/gallery-2.webp",
        "/assets/images/gallery/gallery-3.webp",
        "/assets/images/gallery/gallery-4.webp",
        "/assets/images/gallery/gallery-1.webp",
        "/assets/images/gallery/gallery-2.webp",
    ];
    return (
        <div className="gallery_page">
            <Header />

            <main className="gallery_main">
                <InnerBanner
                    inner_banner_heading="Gallery"
                    inner_banner_image="/assets/images/gallery/gallery-banner-image.webp"
                    inner_banner_alt="Application form banner"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Gallery", active: true },
                    ]}
                />

                {/* Gallery section start */}
                <section className="gallery_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="gallery_mainbox">
                                    {images.map((src, index) => (
                                        <div className="gallery_listing"  key={index}>
                                            <a
                                               
                                                data-fancybox="gallery"
                                                href={src}                // full image
                                            >
                                                <img
                                                    src={src}               // thumbnail
                                                    className="rounded"
                                                    alt={`Gallery image ${index + 1}`}
                                                />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Gallery section ends  */}
            </main>

            <Footer />
        </div>
    )
}

export default Gallery