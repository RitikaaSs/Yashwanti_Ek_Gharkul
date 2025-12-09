"use client";

import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import InnerBanner from "../../components/InnerBanner";
import { useRouter } from "next/navigation";

interface FormValues {
    full_name: string,
    email: string,
    phone_number: string,
    preferred_date: string,
    preferred_time_slot: string,
    purpose_of_visit: string,
    number_of_visitors: string
}

const EnquiryForm = () => {
    // const {
    //     register,
    //     handleSubmit,
    //     // formState: { errors },
    //     reset
    // } = useForm<VisitorFormData>({
    //     resolver: zodResolver(visitorSchema),
    // });

    const [formValues, setFormValues] = useState<FormValues>({
        full_name: '',
        email: '',
        phone_number: '',
        preferred_date: '',
        preferred_time_slot: '',
        purpose_of_visit: '',
        number_of_visitors: ''
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
        if (!formValues.preferred_date) newErrors.preferred_date = "required";
        if (!formValues.preferred_time_slot) newErrors.preferred_time_slot = "required";
        if (!formValues.purpose_of_visit) newErrors.purpose_of_visit = "required";
        if (!formValues.number_of_visitors) newErrors.number_of_visitors = "required";

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
            preferred_date: formValues.preferred_date,
            preferred_time_slot: formValues.preferred_time_slot,
            purpose_of_visit: formValues.purpose_of_visit,
            number_of_visitors: formValues.number_of_visitors
        };

        const res = await fetch("/api/book_visit", {
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
                                            <form onSubmit={handleSubmit}>

                                                {/* Full Name */}
                                                <div className="form_group">
                                                    <input className="form-control" id="full_name" name="full_name" type="text" placeholder="Full Name" onChange={handleInputChange} />
                                                    {/* {errors.visitname && (
                                                        <span className="error_msg">{errors.visitname.message}</span>
                                                    )} */}
                                                    {errors.full_name && <span className="error_msg" style={{ color: "red" }}>{errors.full_name}</span>}
                                                </div>

                                                {/* Email */}
                                                <div className="form_group">
                                                    <input className="form-control" id="email" name="email" type="email" placeholder="Email Address" onChange={handleInputChange} />
                                                    {/* {errors.visitemail && (
                                                        <span className="error_msg">{errors.visitemail.message}</span>
                                                    )} */}
                                                    {errors.email && <span className="error_msg" style={{ color: "red" }}>{errors.email}</span>}
                                                </div>

                                                {/* Phone number */}
                                                <div className="form_group">
                                                    <input className="form-control" id="phone_number" name="phone_number" type="text" placeholder="Phone Number" onChange={handleInputChange} />
                                                    {/* {errors.visitphone && (
                                                        <span className="error_msg">{errors.visitphone.message}</span>
                                                    )} */}
                                                    {errors.phone_number && <span className="error_msg" style={{ color: "red" }}>{errors.phone_number}</span>}
                                                </div>

                                                {/* Date */}
                                                <div className="form_group">
                                                    <input className="form-control" id="preferred_date" name="preferred_date" type="date" placeholder="Preferred Date of Visit" onChange={handleInputChange} />
                                                    {/* {errors.visitdate && (
                                                        <span className="error_msg">{errors.visitdate.message}</span>
                                                    )} */}
                                                    {errors.preferred_date && <span className="error_msg" style={{ color: "red" }}>{errors.preferred_date}</span>}
                                                </div>

                                                {/* Time slot */}
                                                <div className="form_group">
                                                    <select className="form-select" id="preferred_time_slot" name="preferred_time_slot" onChange={handleInputChange}>
                                                        <option value="">Preferred Time Slot</option>
                                                        <option value="10–11 AM">10–11 AM</option>
                                                        <option value="12–1 PM">12–1 PM</option>
                                                        <option value="3–4 PM">3–4 PM</option>

                                                    </select>
                                                    {/* {errors.visitslote && (
                                                        <span className="error_msg">{errors.visitslote.message}</span>
                                                    )} */}
                                                    {errors.preferred_time_slot && <span className="error_msg" style={{ color: "red" }}>{errors.preferred_time_slot}</span>}
                                                </div>

                                                {/* Purpose */}
                                                <div className="form_group">
                                                    <select className="form-select" id="purpose_of_visit" name="purpose_of_visit" onChange={handleInputChange}>
                                                        <option value="">Purpose of Visit</option>
                                                        <option value="Family">Family</option>
                                                        <option value="Visit">Visit</option>
                                                        <option value="Resident Admission Inquiry">Resident Admission Inquiry</option>
                                                        <option value="Volunteering">Volunteering</option>
                                                        <option value="Donation">Donation</option>
                                                        <option value="CSR Partnership">CSR Partnership</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {/* {errors.visitpurpose && (
                                                        <span className="error_msg">{errors.visitpurpose.message}</span>
                                                    )} */}
                                                    {errors.purpose_of_visit && <span className="error_msg" style={{ color: "red" }}>{errors.purpose_of_visit}</span>}
                                                </div>

                                                {/* Visitors */}
                                                <div className="form_group">
                                                    <input className="form-control" type="text" id="number_of_visitors" name="number_of_visitors" placeholder="Number of Visitors" onChange={handleInputChange} />
                                                    {/* {errors.visitvisitors && (
                                                        <span className="error_msg">{errors.visitvisitors.message}</span>
                                                    )} */}
                                                    {errors.number_of_visitors && <span className="error_msg" style={{ color: "red" }}>{errors.number_of_visitors}</span>}
                                                </div>
                                                {/* Submit */}
                                                <div className="form_submit">
                                                    <button className="submite_btn" type="submit">
                                                        Schedule <span>Now</span>
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
