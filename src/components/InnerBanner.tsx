
import React from "react";

type Breadcrumb = {
    label: string;
    href?: string;
    active?: boolean;
};

interface InnerBannerProps {
    inner_banner_heading: string;
    inner_banner_image: string;
    inner_banner_alt: string;
    breadcrumbs?: Breadcrumb[];
}

const InnerBanner: React.FC<InnerBannerProps> = ({ inner_banner_heading, inner_banner_image, inner_banner_alt, breadcrumbs = [] }) => {
    return (
        <section className="inner_banner_section">
            <div className="inner_banner_mainbox">
                <div className="inner_banner_imgbox">
                    <img src={inner_banner_image} alt={inner_banner_alt} className="img-fluid" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner_banner_contentbox">
                                <h1 className="heading">{inner_banner_heading}</h1>
                                <div className="banner_breadcrumb_box">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            {breadcrumbs.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className={`breadcrumb-item ${item.active ? "active" : ""}`}
                                                    aria-current={item.active ? "page" : undefined}
                                                >
                                                    {item.active ? (
                                                        item.label
                                                    ) : (
                                                        <a href={item.href}>{item.label}</a>
                                                    )}
                                                </li>
                                            ))}
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inner_banner_corner_img_one">
                    <img src="/assets/images/home/banner-shape-01.webp" alt="Corner image" className="img-fluid" />
                </div>
                <div className="inner_banner_corner_img_two">
                    <img src="/assets/images/home/banner-shape-02.webp" alt="Corner image" className="img-fluid" />
                </div>
            </div>
        </section>
    );
};

export default InnerBanner;
