"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  return (
    <main className="home_main">
      {/* Banner section start */}
      <section className="home_banner_section">
        <div className="home_banner_imgbox">
          <img src="/assets/images/home/banner-image.webp" alt="Banner image" className="img-fluid" />
        </div>
        <div className="home_banner_imgbox_gredient">
          <img src="/assets/images/home/banner-gredient.webp" alt="Banner gredient image" className="img-fluid" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="home_banner_content_box">
                <h1 className="heading">Our Home of Care,<br /> <span>Dignity</span>, and <span>Togetherness</span></h1>
                <div className="banner_para_home">
                  <p>
                    A sanctuary of comfort, care, and dignity
                    Built on the values of family, community, and compassion.
                  </p>
                </div>
                <div className="home_banner_btnbox">
                  <div className="my_btn_box call_btn">
                    <a href="">
                      <div>
                        <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_646_47)">
                            <path d="M13.2533 4.4033C14.1134 4.57111 14.9039 4.99177 15.5236 5.61144C16.1432 6.2311 16.5639 7.02158 16.7317 7.8817M13.2533 0.880859C15.0403 1.07938 16.7067 1.87962 17.9788 3.1502C19.251 4.42077 20.0534 6.08615 20.2541 7.8729M19.3735 14.9002V17.542C19.3745 17.7872 19.3243 18.03 19.226 18.2547C19.1278 18.4794 18.9837 18.6811 18.803 18.8469C18.6222 19.0127 18.4089 19.139 18.1766 19.2175C17.9442 19.2961 17.6981 19.3253 17.4538 19.3032C14.744 19.0088 12.1411 18.0828 9.85414 16.5997C7.72643 15.2477 5.92251 13.4438 4.57048 11.3161C3.08223 9.01875 2.15606 6.40316 1.86701 3.6812C1.845 3.43768 1.87395 3.19225 1.95199 2.96053C2.03003 2.72881 2.15547 2.51588 2.32032 2.33529C2.48516 2.15471 2.68581 2.01043 2.90947 1.91163C3.13313 1.81284 3.37491 1.7617 3.61942 1.76147H6.26125C6.68862 1.75726 7.10293 1.9086 7.42697 2.18727C7.75101 2.46594 7.96266 2.85294 8.02247 3.27612C8.13397 4.12156 8.34077 4.95168 8.6389 5.75063C8.75738 6.06582 8.78302 6.40837 8.71278 6.73769C8.64255 7.067 8.47938 7.36929 8.24262 7.60871L7.12425 8.72709C8.37784 10.9317 10.2033 12.7571 12.4079 14.0107L13.5263 12.8924C13.7657 12.6556 14.068 12.4924 14.3973 12.4222C14.7266 12.352 15.0692 12.3776 15.3844 12.4961C16.1833 12.7942 17.0134 13.001 17.8589 13.1125C18.2866 13.1729 18.6773 13.3883 18.9566 13.7179C19.2359 14.0475 19.3842 14.4683 19.3735 14.9002Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                          <defs>
                            <clipPath id="clip0_646_47">
                              <rect width="21.1346" height="21.1346" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>

                      </div>
                      <div>Call Now</div>
                    </a>
                  </div>
                  <div className="my_btn_box whatsapp_btn">
                    <a href="https://wa.me/" target="_blank">
                      <div>
                        <svg width="25" height="25" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.69849 11.6806C2.69849 6.7199 6.71997 2.69842 11.6807 2.69842C16.6414 2.69842 20.6629 6.7199 20.6629 11.6806C20.6629 16.6414 16.6414 20.6629 11.6807 20.6629C9.91362 20.6629 8.26878 20.1537 6.88099 19.2744C6.62271 19.1108 6.30623 19.0671 6.01327 19.1545L2.97078 20.0625L4.11632 17.382C4.25172 17.0652 4.22417 16.7023 4.04249 16.4096C3.19059 15.0368 2.69849 13.4178 2.69849 11.6806ZM11.6807 0.584961C5.55273 0.584961 0.585029 5.55267 0.585029 11.6806C0.585029 13.623 1.08501 15.4514 1.96367 17.0411L0.141677 21.3043C-0.0193917 21.6812 0.0520031 22.1172 0.324862 22.4231C0.59772 22.729 1.02283 22.8494 1.41559 22.7321L6.17026 21.3133C7.7945 22.2443 9.6768 22.7763 11.6807 22.7763C17.8087 22.7763 22.7764 17.8086 22.7764 11.6806C22.7764 5.55267 17.8087 0.584961 11.6807 0.584961ZM14.1032 13.9868L12.7145 14.9651C12.0641 14.5946 11.345 14.0774 10.6236 13.3561C9.87378 12.6062 9.31785 11.8321 8.90795 11.1219L9.79051 10.3728C10.1692 10.0514 10.2729 9.50941 10.0396 9.07081L8.91505 6.95735C8.76362 6.67276 8.49058 6.47286 8.17355 6.41446C7.85651 6.35608 7.53017 6.44559 7.28729 6.65756L6.95388 6.94854C6.15211 7.6483 5.67792 8.79819 6.07093 9.9625C6.47838 11.1695 7.34791 13.0692 9.12923 14.8505C11.0457 16.767 12.9924 17.5217 14.1308 17.8149C15.0481 18.0509 15.9161 17.7344 16.5277 17.2361L17.1528 16.7267C17.4201 16.5089 17.5644 16.1743 17.5392 15.8303C17.5139 15.4864 17.3225 15.1763 17.0262 14.9997L15.2526 13.943C14.8944 13.7296 14.4442 13.7468 14.1032 13.9868Z" fill="white" />
                        </svg>
                      </div>
                      <div>WhatsApp</div>
                    </a>
                  </div>
                </div>
                <div className="my_btn_box appointment_btn">
                  <a href="">
                    <div>
                      <svg width="25" height="25" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3954 15.9608C13.6491 15.9608 13.8972 15.8855 14.1081 15.7446C14.3191 15.6036 14.4836 15.4032 14.5807 15.1688C14.6778 14.9344 14.7032 14.6764 14.6537 14.4275C14.6042 14.1787 14.482 13.9501 14.3025 13.7706C14.1231 13.5912 13.8945 13.469 13.6457 13.4195C13.3968 13.37 13.1388 13.3954 12.9044 13.4925C12.67 13.5896 12.4696 13.7541 12.3286 13.9651C12.1877 14.176 12.1124 14.4241 12.1124 14.6778C12.1124 15.0181 12.2476 15.3444 12.4882 15.585C12.7288 15.8256 13.0551 15.9608 13.3954 15.9608ZM19.8101 15.9608C20.0638 15.9608 20.3119 15.8855 20.5229 15.7446C20.7338 15.6036 20.8983 15.4032 20.9954 15.1688C21.0925 14.9344 21.1179 14.6764 21.0684 14.4275C21.0189 14.1787 20.8967 13.9501 20.7173 13.7706C20.5379 13.5912 20.3093 13.469 20.0604 13.4195C19.8115 13.37 19.5536 13.3954 19.3191 13.4925C19.0847 13.5896 18.8843 13.7541 18.7434 13.9651C18.6024 14.176 18.5271 14.4241 18.5271 14.6778C18.5271 15.0181 18.6623 15.3444 18.9029 15.585C19.1435 15.8256 19.4698 15.9608 19.8101 15.9608ZM13.3954 21.0926C13.6491 21.0926 13.8972 21.0173 14.1081 20.8763C14.3191 20.7354 14.4836 20.535 14.5807 20.3006C14.6778 20.0661 14.7032 19.8082 14.6537 19.5593C14.6042 19.3104 14.482 19.0818 14.3025 18.9024C14.1231 18.723 13.8945 18.6008 13.6457 18.5513C13.3968 18.5018 13.1388 18.5272 12.9044 18.6243C12.67 18.7214 12.4696 18.8859 12.3286 19.0968C12.1877 19.3078 12.1124 19.5559 12.1124 19.8096C12.1124 20.1499 12.2476 20.4762 12.4882 20.7168C12.7288 20.9574 13.0551 21.0926 13.3954 21.0926ZM19.8101 21.0926C20.0638 21.0926 20.3119 21.0173 20.5229 20.8763C20.7338 20.7354 20.8983 20.535 20.9954 20.3006C21.0925 20.0661 21.1179 19.8082 21.0684 19.5593C21.0189 19.3104 20.8967 19.0818 20.7173 18.9024C20.5379 18.723 20.3093 18.6008 20.0604 18.5513C19.8115 18.5018 19.5536 18.5272 19.3191 18.6243C19.0847 18.7214 18.8843 18.8859 18.7434 19.0968C18.6024 19.3078 18.5271 19.5559 18.5271 19.8096C18.5271 20.1499 18.6623 20.4762 18.9029 20.7168C19.1435 20.9574 19.4698 21.0926 19.8101 21.0926ZM6.98064 15.9608C7.23439 15.9608 7.48243 15.8855 7.69341 15.7446C7.90439 15.6036 8.06883 15.4032 8.16593 15.1688C8.26303 14.9344 8.28844 14.6764 8.23894 14.4275C8.18943 14.1787 8.06725 13.9501 7.88782 13.7706C7.7084 13.5912 7.4798 13.469 7.23093 13.4195C6.98207 13.37 6.72411 13.3954 6.48968 13.4925C6.25525 13.5896 6.05489 13.7541 5.91391 13.9651C5.77294 14.176 5.6977 14.4241 5.6977 14.6778C5.6977 15.0181 5.83287 15.3444 6.07346 15.585C6.31406 15.8256 6.64039 15.9608 6.98064 15.9608ZM22.376 3.13132H21.093V1.84837C21.093 1.50812 20.9579 1.18179 20.7173 0.941196C20.4767 0.700597 20.1504 0.56543 19.8101 0.56543C19.4698 0.56543 19.1435 0.700597 18.9029 0.941196C18.6623 1.18179 18.5271 1.50812 18.5271 1.84837V3.13132H8.26359V1.84837C8.26359 1.50812 8.12842 1.18179 7.88782 0.941196C7.64722 0.700597 7.3209 0.56543 6.98064 0.56543C6.64039 0.56543 6.31406 0.700597 6.07346 0.941196C5.83287 1.18179 5.6977 1.50812 5.6977 1.84837V3.13132H4.41475C3.39398 3.13132 2.41501 3.53682 1.69322 4.25862C0.971419 4.98041 0.565918 5.95938 0.565918 6.98015V22.3755C0.565918 23.3963 0.971419 24.3752 1.69322 25.097C2.41501 25.8188 3.39398 26.2243 4.41475 26.2243H22.376C23.3968 26.2243 24.3757 25.8188 25.0975 25.097C25.8193 24.3752 26.2248 23.3963 26.2248 22.3755V6.98015C26.2248 5.95938 25.8193 4.98041 25.0975 4.25862C24.3757 3.53682 23.3968 3.13132 22.376 3.13132ZM23.6589 22.3755C23.6589 22.7158 23.5238 23.0421 23.2832 23.2827C23.0426 23.5233 22.7162 23.6584 22.376 23.6584H4.41475C4.07449 23.6584 3.74817 23.5233 3.50757 23.2827C3.26698 23.0421 3.13181 22.7158 3.13181 22.3755V10.829H23.6589V22.3755ZM23.6589 8.2631H3.13181V6.98015C3.13181 6.6399 3.26698 6.31357 3.50757 6.07298C3.74817 5.83238 4.07449 5.69721 4.41475 5.69721H22.376C22.7162 5.69721 23.0426 5.83238 23.2832 6.07298C23.5238 6.31357 23.6589 6.6399 23.6589 6.98015V8.2631ZM6.98064 21.0926C7.23439 21.0926 7.48243 21.0173 7.69341 20.8763C7.90439 20.7354 8.06883 20.535 8.16593 20.3006C8.26303 20.0661 8.28844 19.8082 8.23894 19.5593C8.18943 19.3104 8.06725 19.0818 7.88782 18.9024C7.7084 18.723 7.4798 18.6008 7.23093 18.5513C6.98207 18.5018 6.72411 18.5272 6.48968 18.6243C6.25525 18.7214 6.05489 18.8859 5.91391 19.0968C5.77294 19.3078 5.6977 19.5559 5.6977 19.8096C5.6977 20.1499 5.83287 20.4762 6.07346 20.7168C6.31406 20.9574 6.64039 21.0926 6.98064 21.0926Z" fill="white" />
                      </svg>
                    </div>
                    <div>Schedule an Appointment</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </div>
        <div className="home_banner_corner_img_one">
          <img src="/assets/images/home/banner-shape-01.webp" alt="Corner image" className="img-fluid" />
        </div>
        <div className="home_banner_corner_img_two">
          <img src="/assets/images/home/banner-shape-02.webp" alt="Corner image" className="img-fluid" />
        </div>
      </section>
      {/* Banner section ends */}
      {/* Home About section start */}
      <div className="section_home_about_section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section_home_about_mainbox">
                <h2 className="sub_heading">Because Age Deserves Grace, <br /> Care & Companionship</h2>
                <div className="home_about_para">
                  <p>
                    At Yashwanti Ek Gharkul, we offer more than just care — we create a sanctuary of warmth, safety, and grace for our elders. Thoughtfully designed with compassion at its core, our home blends comfort, dignity, and a sense of belonging. With dedicated caregivers, medical support, enriching activities, and attentive daily assistance, every resident is nurtured, respected, and truly celebrated.
                  </p>
                </div>
                <div className="home_about_second_para">
                  <p>
                    Here, every elder finds not just care — but a place to call home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home_about_imagebox">
          <img src="/assets/images/home/home-about-image.webp" alt="Background image" className="img-fluid" />
        </div>
      </div>
      {/* Home About section ends */}
      {/* Promise section start */}
      <section className="promise_section">
        <div className="promise_left_imgbox">
          <img src="/assets/images/home/promise-image.webp" alt="Promise image" className="img-fluid" loading="lazy" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-7"></div>
            <div className="col-lg-5">
              <div className="promise_right_mainbox">
                <h2 className="sub_heading">Our Promise of Care</h2>
                <div className="promise_para_first">
                  <p>Thoughtful Services, Tailored for Graceful Living</p>
                </div>
                <div className="promise_mainbox">
                  <div className="promise_listing">
                    <div className="promise_listing_icon">
                      <img src="/assets/images/home/promise-icon-1.svg" alt="Promise icon" className="img-fluid" loading="lazy" />
                    </div>
                    <div className="promise_listing_content">Comfortable Living</div>
                  </div>
                  <div className="promise_listing">
                    <div className="promise_listing_icon">
                      <img src="/assets/images/home/promise-icon-2.svg" alt="Promise icon" className="img-fluid" loading="lazy" />
                    </div>
                    <div className="promise_listing_content">Wholesome Meals</div>
                  </div>
                  <div className="promise_listing">
                    <div className="promise_listing_icon">
                      <img src="/assets/images/home/promise-icon-3.svg" alt="Promise icon" className="img-fluid" loading="lazy" />
                    </div>
                    <div className="promise_listing_content">Lush Green Spaces</div>
                  </div>
                  <div className="promise_listing">
                    <div className="promise_listing_icon">
                      <img src="/assets/images/home/promise-icon-4.svg" alt="Promise icon" className="img-fluid" loading="lazy" />
                    </div>
                    <div className="promise_listing_content">Family Connection</div>
                  </div>
                  <div className="promise_listing">
                    <div className="promise_listing_icon">
                      <img src="/assets/images/home/promise-icon-5.svg" alt="Promise icon" className="img-fluid" loading="lazy" />
                    </div>
                    <div className="promise_listing_content">Community Bonding</div>
                  </div>
                  <div className="promise_listing">
                    <div className="promise_listing_icon">
                      <img src="/assets/images/home/promise-icon-6.svg" alt="Promise icon" className="img-fluid" loading="lazy" />
                    </div>
                    <div className="promise_listing_content">Round-the-Clock Security</div>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Promise section ends */}
      {/* Family connection section start */}
      <section className="family_connection_section">
        <div className="family_connection_rightbox">
          <img src="/assets/images/home/family-connection-image.webp" alt="Family connection image" className="img-fluid" loading="lazy" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="family_connection_mainbox">
                <div className="family_connection_leftbox">
                  <h2 className="sub_heading">Family Connection</h2>
                  <div className="family_connection_para_first">
                    <p>Digital Hug – Feel close, even from afar.</p>
                  </div>
                  <div className="family_connection_para_second">
                    <p>Even when miles separate you, our platform keeps your loved ones near:</p>
                  </div>
                  <div className="family_connection_list_mainbox">
                    <div className="family_connection_listing">
                      <div className="family_connection_icon">
                        <img src="/assets/images/home/FC-icon-1.svg" alt="Icon" className="img-fluid" />
                      </div>
                      <div className="family_connection_content">
                        <div className="family_connection_heading">Regular Updates</div>
                        <div className="family_connection_text">Track health, activities, and daily routines at a glance.</div>
                      </div>
                    </div>
                    <div className="family_connection_listing">
                      <div className="family_connection_icon">
                        <img src="/assets/images/home/FC-icon-2.svg" alt="Icon" className="img-fluid" />
                      </div>
                      <div className="family_connection_content">
                        <div className="family_connection_heading">Special Moments</div>
                        <div className="family_connection_text">View photos, festivals, and celebrations online.</div>
                      </div>
                    </div>
                    <div className="family_connection_listing">
                      <div className="family_connection_icon">
                        <img src="/assets/images/home/FC-icon-3.svg" alt="Icon" className="img-fluid" />
                      </div>
                      <div className="family_connection_content">
                        <div className="family_connection_heading">Peace of Mind</div>
                        <div className="family_connection_text">Stay connected with newsletters and stories that bring hearts together.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Family connection section ends */}
      {/* Step into gharkul section start */}
      <section className="steps_section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="headingBox text-center">
                <h2 className="sub_heading">Step Into Our Gharkul</h2>
                <div className="stps_para_first">
                  <p>A home where every heart is welcomed, every life celebrated, and every day is filled
                    with care a companionship.</p>
                </div>
                <div className="stps_para_second">
                  <p>Your journey with us begins by simply following the next few steps</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
              >
                <SwiperSlide>
                  <div className="steps_mainBox">
                    <div className="step_listing">
                      <div className="step_arrow">
                        <img src="/assets/images/home/arrow.svg" alt="arrows" className="img-fluid" />
                      </div>
                      <div className="step_contentBox">
                        <div className="step_headingBox">
                          <div className="step_number">1</div>
                          <div className="step_heading">Begin Your Journey</div>
                        </div>
                        <div className="step_textBox">
                          <div className="step_text">Fill the admission form and share your story.</div>
                          <div className="step_img">
                            <img src="/assets/images/home/step1.svg" alt="Begin Your Journey" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step_listing">
                      <div className="step_arrow">
                        <img src="/assets/images/home/arrow.svg" alt="arrows" className="img-fluid" />
                      </div>
                      <div className="step_contentBox">
                        <div className="step_headingBox">
                          <div className="step_number">2</div>
                          <div className="step_heading">Thoughtful Review</div>
                        </div>
                        <div className="step_textBox">
                          <div className="step_text">Our team listens carefully to understand your needs.</div>
                          <div className="step_img">
                            <img src="/assets/images/home/step2.svg" alt="Thoughtful Review" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step_listing">
                      <div className="step_arrow">
                        <img src="/assets/images/home/arrow.svg" alt="arrows" className="img-fluid" />
                      </div>
                      <div className="step_contentBox">
                        <div className="step_headingBox">
                          <div className="step_number">3</div>
                          <div className="step_heading">Holistic Assessment</div>
                        </div>
                        <div className="step_textBox">
                          <div className="step_text">Doctor evaluates physical, mental, and emotional well-being.
                          </div>
                          <div className="step_img">
                            <img src="/assets/images/home/step3.svg" alt="Holistic Assessment" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="steps_mainBox">
                    <div className="step_listing">
                      <div className="step_arrow">
                        <img src="/assets/images/home/arrow.svg" alt="arrows" className="img-fluid" />
                      </div>
                      <div className="step_contentBox">
                        <div className="step_headingBox">
                          <div className="step_number">1</div>
                          <div className="step_heading">Begin Your Journey</div>
                        </div>
                        <div className="step_textBox">
                          <div className="step_text">Fill the admission form and share your story.</div>
                          <div className="step_img">
                            <img src="/assets/images/home/step1.svg" alt="Begin Your Journey" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step_listing">
                      <div className="step_arrow">
                        <img src="/assets/images/home/arrow.svg" alt="arrows" className="img-fluid" />
                      </div>
                      <div className="step_contentBox">
                        <div className="step_headingBox">
                          <div className="step_number">2</div>
                          <div className="step_heading">Thoughtful Review</div>
                        </div>
                        <div className="step_textBox">
                          <div className="step_text">Our team listens carefully to understand your needs.</div>
                          <div className="step_img">
                            <img src="/assets/images/home/step2.svg" alt="Thoughtful Review" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step_listing">
                      <div className="step_arrow">
                        <img src="/assets/images/home/arrow.svg" alt="arrows" className="img-fluid" />
                      </div>
                      <div className="step_contentBox">
                        <div className="step_headingBox">
                          <div className="step_number">3</div>
                          <div className="step_heading">Holistic Assessment</div>
                        </div>
                        <div className="step_textBox">
                          <div className="step_text">Doctor evaluates physical, mental, and emotional well-being.
                          </div>
                          <div className="step_img">
                            <img src="/assets/images/home/step3.svg" alt="Holistic Assessment" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="steps_mainBox">
                    <div className="step_listing">
                      <div className="step_arrow">
                        <img src="/assets/images/home/arrow.svg" alt="arrows" className="img-fluid" />
                      </div>
                      <div className="step_contentBox">
                        <div className="step_headingBox">
                          <div className="step_number">1</div>
                          <div className="step_heading">Begin Your Journey</div>
                        </div>
                        <div className="step_textBox">
                          <div className="step_text">Fill the admission form and share your story.</div>
                          <div className="step_img">
                            <img src="/assets/images/home/step1.svg" alt="Begin Your Journey" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step_listing">
                      <div className="step_arrow">
                        <img src="/assets/images/home/arrow.svg" alt="arrows" className="img-fluid" />
                      </div>
                      <div className="step_contentBox">
                        <div className="step_headingBox">
                          <div className="step_number">2</div>
                          <div className="step_heading">Thoughtful Review</div>
                        </div>
                        <div className="step_textBox">
                          <div className="step_text">Our team listens carefully to understand your needs.</div>
                          <div className="step_img">
                            <img src="/assets/images/home/step2.svg" alt="Thoughtful Review" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step_listing">
                      <div className="step_arrow">
                        <img src="/assets/images/home/arrow.svg" alt="arrows" className="img-fluid" />
                      </div>
                      <div className="step_contentBox">
                        <div className="step_headingBox">
                          <div className="step_number">3</div>
                          <div className="step_heading">Holistic Assessment</div>
                        </div>
                        <div className="step_textBox">
                          <div className="step_text">Doctor evaluates physical, mental, and emotional well-being.
                          </div>
                          <div className="step_img">
                            <img src="/assets/images/home/step3.svg" alt="Holistic Assessment" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                {/* Custom Navigation Buttons */}
                <div className="custom_navigation_mainbox">
                  <div className="custom-prev">
                    <svg width="50" height="50" x="0" y="0" viewBox="0 0 512 512" ><circle r="256" cx="256" cy="256" fill="#33333399" transform="matrix(0.8,0,0,0.8,51.19999999999999,51.19999999999999)"></circle><g transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,512,512)"><path d="M256 0C114.837 0 0 114.837 0 256s114.837 256 256 256 256-114.837 256-256S397.163 0 256 0zm79.083 271.083L228.416 377.749A21.275 21.275 0 0 1 213.333 384a21.277 21.277 0 0 1-15.083-6.251c-8.341-8.341-8.341-21.824 0-30.165L289.835 256l-91.584-91.584c-8.341-8.341-8.341-21.824 0-30.165s21.824-8.341 30.165 0l106.667 106.667c8.341 8.341 8.341 21.823 0 30.165z" fill="#ffffff" opacity="1" data-original="#000000"></path></g></svg>
                  </div>
                  <div className="custom-next">
                    <svg width="50" height="50" x="0" y="0" viewBox="0 0 512 512" ><circle r="256" cx="256" cy="256" fill="#33333399" transform="matrix(0.8,0,0,0.8,51.19999999999999,51.19999999999999)"></circle><g transform="matrix(1,0,0,1,0,0)"><path d="M256 0C114.837 0 0 114.837 0 256s114.837 256 256 256 256-114.837 256-256S397.163 0 256 0zm79.083 271.083L228.416 377.749A21.275 21.275 0 0 1 213.333 384a21.277 21.277 0 0 1-15.083-6.251c-8.341-8.341-8.341-21.824 0-30.165L289.835 256l-91.584-91.584c-8.341-8.341-8.341-21.824 0-30.165s21.824-8.341 30.165 0l106.667 106.667c8.341 8.341 8.341 21.823 0 30.165z" fill="#ffffff" opacity="1" data-original="#000000"></path></g></svg>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="steps_below_para_mainbox">
                <p className="m-0">
                  We at Yashwanti, encourage Family Togetherness – Loved ones are urged to visit, celebrate, and stay connected through our digital platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Step into gharkul section ends */}
      {/* Stories section start */}
      <section className="stories_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="sub_heading">Stories from Yashwanti</h2>
              <div className="stories_mainbox">
                <div className="stories_firstbox">
                  <div className="stories_first_img_box">
                    <img src="/assets/images/home/stories-image-01.webp" alt="Stories image" className="img-fluid" loading="lazy" />
                  </div>
                  <div className="stories_first_gredien_box"></div>
                  <div className="stories_first_content_box">
                    <div className="stories_first_content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</div>
                    <div className="read_more_btn">
                      <a href="">
                        <div>Read More</div>
                        <div>
                          <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_646_1184)">
                              <path d="M4.93676 14.869L16.9608 7.42672L12.5731 6.39397L12.8052 5.40794L18.8762 6.83683L17.4473 12.9078L16.4612 12.6757L17.4939 8.28807L5.46989 15.7303L4.93676 14.869Z" fill="white" />
                            </g>
                            <defs>
                              <clipPath id="clip0_646_1184">
                                <rect width="16.08" height="16.08" fill="white" transform="matrix(-0.850303 0.526294 0.526294 0.850303 14.645 0)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="stories_secondbox">
                  <div className="stories_secondbox_first">
                    <h3 className="card_heading">What Dignity in Elder Care Really Means</h3>
                    <div className="read_more_btn">
                      <a href="">
                        <div>Read More</div>
                        <div>
                          <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_646_1184)">
                              <path d="M4.93676 14.869L16.9608 7.42672L12.5731 6.39397L12.8052 5.40794L18.8762 6.83683L17.4473 12.9078L16.4612 12.6757L17.4939 8.28807L5.46989 15.7303L4.93676 14.869Z" fill="white" />
                            </g>
                            <defs>
                              <clipPath id="clip0_646_1184">
                                <rect width="16.08" height="16.08" fill="white" transform="matrix(-0.850303 0.526294 0.526294 0.850303 14.645 0)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="stories_secondbox_second">
                    <h3 className="card_heading">Designing Spaces That Feel Like Home</h3>
                    <div className="read_more_btn">
                      <a href="">
                        <div>Read More</div>
                        <div>
                          <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_646_1184)">
                              <path d="M4.93676 14.869L16.9608 7.42672L12.5731 6.39397L12.8052 5.40794L18.8762 6.83683L17.4473 12.9078L16.4612 12.6757L17.4939 8.28807L5.46989 15.7303L4.93676 14.869Z" fill="white" />
                            </g>
                            <defs>
                              <clipPath id="clip0_646_1184">
                                <rect width="16.08" height="16.08" fill="white" transform="matrix(-0.850303 0.526294 0.526294 0.850303 14.645 0)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="stories_thirdbox">
                  <div className="stories_thirdbox_img">
                    <img src="/assets/images/home/stories-image-02.webp" alt="Stories image" className="img-fluid" />
                  </div>
                  <div className="stories_thirdbox_video">
                    <a href="">
                      <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="68" cy="68" r="68" fill="#028298" fill-opacity="0.5" />
                        <path d="M94.8008 62.6856C98.0595 65.4792 98.0595 70.5208 94.8008 73.3144L63.056 100.529C58.5154 104.421 51.5 101.195 51.5 95.2141L51.5 40.7858C51.5 34.8051 58.5154 31.5789 63.056 35.4714L94.8008 62.6856Z" fill="white" fill-opacity="0.9" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stories section ends  */}
      {/* Contact us section start  */}
      <section className="home_contact_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="home_contact_mainbox">
                <div className="home_contact_leftbox">
                  <h2 className="sub_heading">Contact Us</h2>
                  <p className="m-0">Every connection brings warmth and joy to our elders. Whether you have a question, wish to schedule a visit, or support our journey, we’re just a message away.</p>
                  <div className="home_contact_list_mainbox">
                    <div className="home_contact_listing">
                      <div className="home_contact_listing_icon">
                        <img src="/assets/images/home/home-location.webp" alt="Location icon" className="img-fluid" loading="lazy" />
                      </div>
                      <div className="home_contact_listing_content">
                        <p className="m-0">Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                      </div>
                    </div>
                    <div className="home_contact_listing">
                      <div className="home_contact_listing_icon">
                        <img src="/assets/images/home/home-phone.webp" alt="Phone icon" className="img-fluid" loading="lazy" />
                      </div>
                      <div className="home_contact_listing_content">
                        <p className="m-0">
                          <a href="tel:+919898989898">9898989898</a> / <a href="tel:+918989898989">8989898989</a>
                        </p>
                      </div>
                    </div>
                    <div className="home_contact_listing">
                      <div className="home_contact_listing_icon">
                        <img src="/assets/images/home/home-email.webp" alt="Email icon" className="img-fluid" loading="lazy" />
                      </div>
                      <div className="home_contact_listing_content">
                        <p className="m-0">
                          <a href="mailto:yashwantiekgharkul@gmail.com">yashwantiekgharkul@gmail.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="home_contact_rightbox">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d129736.13036395071!2d73.39286545857954!3d17.116888696845677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bea07a1fc654a51%3A0x6957d6ae614fe73e!2sDesai%20Wadi!5e0!3m2!1sen!2sin!4v1759126603134!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact us section ends  */}
    </main>
  );
}
