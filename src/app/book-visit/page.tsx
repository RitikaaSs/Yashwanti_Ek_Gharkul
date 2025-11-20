"use client";

import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import InnerBanner from "../../components/InnerBanner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { visitorSchema } from "@/schemas/visitorSchema";
import { z } from "zod";

// Generate TypeScript type from schema
type VisitorFormData = z.infer<typeof visitorSchema>;

const EnquiryForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<VisitorFormData>({
        resolver: zodResolver(visitorSchema),
    });

    const onSubmit = (data: VisitorFormData) => {
        console.log("Form Submitted:", data);
        alert("Form submitted successfully!");
        reset();
    };

    return (
        <div className="my_enquiry_form_page">
            <Header />

            <main className="enquiry_main">
                <InnerBanner
                    inner_banner_heading="Book a Visit"
                    inner_banner_image="/assets/images/enquiry/enquiry-form-banner.webp"
                    inner_banner_alt="Services Banner"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Visit Scheduling Form", active: true },
                    ]}
                />

                {/* Enquiry form start */}
                <section className="enquiry_form_section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="enquiry_form_mainbox">
                                    <div className="enquiry_form_leftbox">
                                        <h2 className="sub_heading">Schedule Your Visit</h2>
                                        <p>
                                            To request a date & time for visiting Yashwanti Ek Gharkul.
                                        </p>
                                        <div className="enquiry_formbox">
                                            <form onSubmit={handleSubmit(onSubmit)}>

                                                {/* Full Name */}
                                                <div className="form_group">
                                                    <input className="form-control" type="text" placeholder="Full Name" {...register("visitname")} />
                                                    {errors.visitname && (
                                                        <span className="error_msg">{errors.visitname.message}</span>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div className="form_group">
                                                    <input className="form-control" type="email" placeholder="Email Address" {...register("visitemail")} />
                                                    {errors.visitemail && (
                                                        <span className="error_msg">{errors.visitemail.message}</span>
                                                    )}
                                                </div>

                                                {/* Phone number */}
                                                <div className="form_group">
                                                    <input className="form-control" type="text" placeholder="Phone Number" {...register("visitphone")} />
                                                    {errors.visitphone && (
                                                        <span className="error_msg">{errors.visitphone.message}</span>
                                                    )}
                                                </div>

                                                {/* Date */}
                                                <div className="form_group">
                                                    <input className="form-control" type="date" placeholder="Preferred Date of Visit" {...register("visitdate")} />
                                                    {errors.visitdate && (
                                                        <span className="error_msg">{errors.visitdate.message}</span>
                                                    )}
                                                </div>

                                                {/* Time slote */}
                                                <div className="form_group">
                                                    <select className="form-select" {...register("visitslote")}>
                                                        <option value="">Preferred Time Slot</option>
                                                        <option value="10–11 AM">10–11 AM</option>
                                                        <option value="12–1 PM">12–1 PM</option>
                                                        <option value="3–4 PM">3–4 PM</option>
                                                        
                                                    </select>
                                                    {errors.visitslote && (
                                                        <span className="error_msg">{errors.visitslote.message}</span>
                                                    )}
                                                </div>

                                                {/* Purpose */}
                                                <div className="form_group">
                                                    <select className="form-select" {...register("visitpurpose")}>
                                                        <option value="">Purpose of Visit</option>
                                                        <option value="Family">Family</option>
                                                        <option value="Visit">Visit</option>
                                                        <option value="Resident Admission Inquiry">Resident Admission Inquiry</option>
                                                        <option value="Volunteering">Volunteering</option>
                                                        <option value="Donation">Donation</option>
                                                        <option value="CSR Partnership">CSR Partnership</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {errors.visitpurpose && (
                                                        <span className="error_msg">{errors.visitpurpose.message}</span>
                                                    )}
                                                </div>

                                                {/* Visitors */}
                                                <div className="form_group">
                                                    <input className="form-control" type="number" {...register("visitvisitors")} placeholder="Number of Visitors" />
                                                    {errors.visitvisitors && (
                                                        <span className="error_msg">{errors.visitvisitors.message}</span>
                                                    )}
                                                </div>
                                                {/* Submit */}
                                                <div className="form_submit">
                                                    <button className="submite_btn" type="submit">
                                                        Schedule <span>Now</span>
                                                    </button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    <div className="enquiry_form_rightbox">
                                        <img src="/assets/images/enquiry/form-image.webp" alt="Enquiry form image" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Enquiry form ends  */}
            </main>

            <Footer />
        </div>
    );
};

export default EnquiryForm;
