"use client";

import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import InnerBanner from "../../components/InnerBanner";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { enquirySchema } from "@/schemas/enquirySchema";
// import { z } from "zod";
import { useRouter } from "next/navigation";

// Generate TypeScript type from schema
// type EnquiryFormData = z.infer<typeof enquirySchema>;

interface FormValues {
    full_name: string,
    email: string,
    phone_number: string,
    subject: string,
    message: string
}

const EnquiryForm = () => {
    // const {
    //     // register,
    //     handleSubmit,
    //     formState: { errors },
    //     reset
    // } = useForm<EnquiryFormData>({
    //     resolver: zodResolver(enquirySchema),
    // });

    const [formValues, setFormValues] = useState<FormValues>({
        full_name: '',
        email: '',
        phone_number: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const router = useRouter();
    const [msg, setMsg] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    }

    const validate = () => {
        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const numberRegex = /^\d+$/;
        const newErrors: Partial<FormValues> = {};
        if (!formValues.full_name) newErrors.full_name = "required";
        // if (!formValues.email) newErrors.email = "required";
        if (!formValues.email && !emailRegex.test(formValues.email)) {
            newErrors.email = "Personal email is required";
        }
        // if (!formValues.phone_number) newErrors.phone_number = "required";
        if (formValues.phone_number && !phoneRegex.test(formValues.phone_number)) {
            newErrors.phone_number = "Valid contact number is required";
        }
        if (!formValues.subject) newErrors.subject = "required";
        if (!formValues.message) newErrors.message = "required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        // console.log("Form Submitted:", data);
        e.preventDefault();
        if (!validate()) return;

        const formData = {
            full_name: formValues.full_name,
            email: formValues.email,
            phone_number: formValues.phone_number || null,
            subject: formValues.subject,
            message: formValues.message,
        };

        const res = await fetch("/api/enquiry_form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.status == 1) {
            setMsg("Form submitted successfully!");
            // e.target.reset();
            router.refresh();
        } else {
            setMsg(data.error || "Something went wrong!");
        }

        // reset();
    };

    return (
        <div className="my_enquiry_form_page">
            <Header />

            <main className="enquiry_main">
                <InnerBanner
                    inner_banner_heading="Write to Us "
                    inner_banner_image="/assets/images/enquiry/enquiry-form-banner.webp"
                    inner_banner_alt="Services Banner"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Enquiry Form", active: true },
                    ]}
                />

                {/* Enquiry form start */}
                <section className="enquiry_form_section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="enquiry_form_mainbox">
                                    <div className="enquiry_form_leftbox">
                                        <h2 className="sub_heading">Enquiry Now</h2>
                                        <p>
                                            For any questions, feedback, suggestions, or general communication.
                                        </p>
                                        <div className="enquiry_formbox">
                                            <form onSubmit={handleSubmit}>

                                                {/* Full Name */}
                                                <div className="form_group">
                                                    <input
                                                        className="form-control"
                                                        id="full_name" name="full_name"
                                                        type="text"
                                                        placeholder="Enter name"
                                                        // {...register("fullName")}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.full_name && <span className="error_msg" style={{ color: "red" }}>{errors.full_name}</span>}
                                                    {/* {errors.fullName && (
                                                        <span className="error_msg">{errors.fullName.message}</span>
                                                    )} */}
                                                </div>

                                                {/* Email */}
                                                <div className="form_group">
                                                    <input
                                                        className="form-control"
                                                        id="email" name="email"
                                                        type="email"
                                                        placeholder="Enter email"
                                                        // {...register("email")}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.email && <span className="error_msg" style={{ color: "red" }}>{errors.email}</span>}
                                                    {/* {errors.email && (
                                                        <span className="error_msg">{errors.email.message}</span>
                                                    )} */}
                                                </div>

                                                {/* Phone Number */}
                                                <div className="form_group">
                                                    <input
                                                        className="form-control"
                                                        id="phone_number" name="phone_number"
                                                        type="text"
                                                        placeholder="Enter phone number"
                                                        // {...register("phone")}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.phone_number && <span className="error_msg" style={{ color: "red" }}>{errors.phone_number}</span>}
                                                    {/* {errors.phone && (
                                                        <span className="error_msg">{errors.phone.message}</span>
                                                    )} */}
                                                </div>

                                                {/* <div className="form_group">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Enter phone number"
                                                        name="phone"
                                                    />
                                                </div> */}

                                                {/* Subject */}
                                                <div className="form_group">
                                                    <select className="form-select" id="subject" name="subject"
                                                        // {...register("subject")}
                                                        onChange={handleInputChange}>
                                                        <option value="">Select subject</option>
                                                        <option value="General Query">General Query</option>
                                                        <option value="Feedback">Feedback</option>
                                                        <option value="Collaboration">Collaboration</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {errors.subject && <span className="error_msg" style={{ color: "red" }}>{errors.subject}</span>}
                                                    {/* {errors.subject && (
                                                        <span className="error_msg">{errors.subject.message}</span>
                                                    )} */}
                                                </div>

                                                {/* Message */}
                                                <div className="form_group msg_form_group">
                                                    <textarea
                                                        className="form-control"
                                                        id="message" name="message"
                                                        rows={2}
                                                        placeholder="Write message..."
                                                        // {...register("message")}
                                                        onChange={handleInputChange}
                                                    ></textarea>
                                                    {errors.message && <span className="error_msg" style={{ color: "red" }}>{errors.message}</span>}
                                                    {/* {errors.message && (
                                                        <span className="error_msg">{errors.message.message}</span>
                                                    )} */}
                                                </div>

                                                {/* Submit */}
                                                <div className="form_submit">
                                                    <button className="submite_btn" type="submit">
                                                        Submit <span>Enquiry</span>
                                                    </button>
                                                </div>
                                                {msg && <p>{msg}</p>}
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
