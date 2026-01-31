"use client";

import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import InnerBanner from "../../components/InnerBanner";

interface FormValues {
    user_name: string,
    user_address: string,
    user_email: string,
    user_phone: string,

    name: string,
    date_of_birth: string,
    age: string,
    marital_status: string,
    gender: string,
    blood_group: string,
    relationship_with_applicant: string,
    address: string,
    education: string,
    profession: string,
    hobbies: string,
    volunteer_interest: string,
    volunteer_details: string,
    health_data: string,
    digital_signature: string
    // signature: File | null;
}

const ApplicationForm = () => {

    const [formValues, setFormValues] = useState<FormValues>({
        user_name: '',
        user_address: '',
        user_email: '',
        user_phone: '',

        name: '',
        date_of_birth: '',
        age: '',
        marital_status: '',
        gender: '',
        blood_group: '',
        relationship_with_applicant: '',
        address: '',
        education: '',
        profession: '',
        hobbies: '',
        volunteer_interest: '',
        volunteer_details: '',
        health_data: '',
        digital_signature: '0',
    });
    const resetForm = () => {
        setFormValues({
            user_name: '',
            user_address: '',
            user_email: '',
            user_phone: '',

            name: '',
            date_of_birth: '',
            age: '',
            marital_status: '',
            gender: '',
            blood_group: '',
            relationship_with_applicant: '',
            address: '',
            education: '',
            profession: '',
            hobbies: '',
            volunteer_interest: '',
            volunteer_details: '',
            health_data: '',
            digital_signature: ''
        });
    };
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    // const [photo, setPhoto] = useState<File | null>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "date_of_birth") {
            const age = value ? calculateAge(value) : "";
            setFormValues((prev) => ({
                ...prev,
                date_of_birth: value,
                age: age,
            }));
        } else {
            setFormValues((prev) => ({ ...prev, [name]: value }));
        }
    }
    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age.toString();
    };
    const validate = () => {
        // const phoneRegex = /^[6-9]\d{9}$/;
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const numberRegex = /^\d+$/;
        const newErrors: Partial<FormValues> = {};
        if (!formValues.user_name) newErrors.user_name = "required";
        if (!/^[A-Za-z\s]+$/.test(formValues.user_name)) {
            newErrors.user_name = "Name is required. Only alphabets are allowed";
        }
        // if (!formValues.user_address) newErrors.user_address = "required";
        if (!formValues.user_email) newErrors.user_email = "required";
        if (!formValues.user_phone) newErrors.user_phone = "required";

        if (!formValues.name) newErrors.name = "required";
        if (!/^[A-Za-z\s]+$/.test(formValues.name)) {
            newErrors.name = "Name is required. Only alphabets are allowed";
        }
        if (!formValues.date_of_birth) newErrors.date_of_birth = "required";
        if (!formValues.age) newErrors.age = "required";
        if (!formValues.gender) newErrors.gender = "required";
        // if (!formValues.digital_signature) newErrors.digital_signature = "required";
if (formValues.digital_signature !== "1") {
  newErrors.digital_signature = "Consent is required";
}

        // if (!formValues.blood_group) newErrors.blood_group = "required";
        // if (!formValues.relationship_with_applicant) newErrors.relationship_with_applicant = "required";
        // if (!formValues.address) newErrors.address = "required";
        // if (!formValues.education) newErrors.education = "required";
        // if (!formValues.profession) newErrors.profession = "required";
        // if (!formValues.hobbies) newErrors.hobbies = "required";
        if (
            formValues.volunteer_interest === "1" &&
            !formValues.volunteer_details
        ) {
            newErrors.volunteer_details = "required";
        }
        if (!formValues.health_data) newErrors.health_data = "required";

        // if (!formValues.user_email && !emailRegex.test(formValues.user_email)) {
        //     newErrors.user_email = "Email is required";
        // }

        // if (formValues.user_phone && !phoneRegex.test(formValues.user_phone)) {
        //     newErrors.user_phone = "Valid contact number is required";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        if (!validate()) return;

        const formData = {
            user_name: formValues.user_name,
            user_address: formValues.user_address,
            user_email: formValues.user_email,
            user_phone: formValues.user_phone,

            name: formValues.name,
            date_of_birth: formValues.date_of_birth,
            age: formValues.age,
            marital_status: formValues.marital_status,
            gender: formValues.gender,
            blood_group: formValues.blood_group,
            relationship_with_applicant: formValues.relationship_with_applicant,
            address: formValues.address,
            education: formValues.education,
            profession: formValues.profession,
            hobbies: formValues.hobbies,
            volunteer_interest: formValues.volunteer_interest,
            volunteer_details: formValues.volunteer_details,
            health_data: formValues.health_data,
            digital_signature: formValues.digital_signature === "1" ? "1" : "0",
        };

        const res = await fetch("/api/application_form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.status == 1) {
            alert("Application submitted successfully! Your login has been created with email and password as your contact number. You would be able to access it once your application is approved.");
            // e.target.reset();
            resetForm();
        } else {
            alert(data.error || "Something went wrong!");
        }
        // reset();
    };

    return (
        <div className="my_application_form_page">
            <Header />
            <main className="enquiry_main">
                <InnerBanner
                    inner_banner_heading="Application Form"
                    inner_banner_image="/assets/images/enquiry/enquiry-form-banner.webp"
                    inner_banner_alt="Application form banner"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Application Form", active: true },
                    ]}
                />
                {/* Enquiry form start */}
                <section className="enquiry_form_section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="enquiry_form_mainbox">
                                    <div className="enquiry_form_leftbox">
                                        <h2 className="sub_heading text-center">Application Form</h2>
                                        <div className="enquiry_formbox application_formbox">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form_group_main_heading">From</div>
                                                <div className="form_group_for_mainbox">
                                                    <div className="form_group">
                                                        <label>Name <span className="req_text">*</span></label>
                                                        <input className="form-control" type="text" name="user_name" id="user_name" placeholder="Enter name" value={formValues.user_name} onChange={handleInputChange} />
                                                        {errors.user_name && <span className="error_msg" style={{ color: "red" }}>{errors.user_name}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Mobile No <span className="req_text">*</span></label>
                                                        <input className="form-control" type="text" name="user_phone" id="user_phone" minLength={10} maxLength={10} placeholder="Enter mobile number" value={formValues.user_phone} onChange={handleInputChange} />
                                                        {errors.user_phone && <span className="error_msg" style={{ color: "red" }}>{errors.user_phone}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Email ID <span className="req_text">*</span></label>
                                                        <input className="form-control" type="email" name="user_email" id="user_email" placeholder="Enter email address" value={formValues.user_email} onChange={handleInputChange} />
                                                        {errors.user_email && <span className="error_msg" style={{ color: "red" }}>{errors.user_email}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Address</label>
                                                        <textarea className="form-control" name="user_address" id="user_address" rows={1} placeholder="Enter address" value={formValues.user_address} onChange={handleInputChange}></textarea>
                                                        {errors.user_address && <span className="error_msg" style={{ color: "red" }}>{errors.user_address}</span>}
                                                    </div>
                                                </div>
                                                <div className="form_group_main_heading">Applicant Details</div>
                                                <div className="form_group_applicant_mainbox">
                                                    <div className="form_group">
                                                        <label htmlFor="">Name <span>(As per Aadhaar Card) </span><span className="req_text">*</span></label>
                                                        <input className="form-control" type="text" name="name" id="name" placeholder="Enter name of applicant" value={formValues.name} onChange={handleInputChange} />
                                                        {errors.name && <span className="error_msg" style={{ color: "red" }}>{errors.name}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label htmlFor="">Date of Birth <span className="req_text">*</span></label>
                                                        <input className="form-control" type="date" name="date_of_birth" id="date_of_birth" placeholder="Enter dob" value={formValues.date_of_birth}
                                                            max={new Date().toISOString().split("T")[0]} onChange={handleInputChange} />
                                                        {errors.date_of_birth && <span className="error_msg" style={{ color: "red" }}>{errors.date_of_birth}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label htmlFor="">Age <span className="req_text">*</span></label>
                                                        <input className="form-control" type="text" name="age" id="age" placeholder="Enter age" value={formValues.age} readOnly />
                                                        {errors.age && <span className="error_msg" style={{ color: "red" }}>{errors.age}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label htmlFor="">Marital Status </label>
                                                        <div className="form_radio_mainbox">
                                                            <label htmlFor="Married">
                                                                <input type="radio" id="Married" name="marital_status" checked={formValues.marital_status === "Married"} value="Married" onChange={handleInputChange} />
                                                                <div className="chekmark">
                                                                    <svg width="12" height="12" x="0" y="0" viewBox="0 0 520 520"><g><path d="M239.987 460.841a10 10 0 0 1-7.343-3.213L34.657 243.463A10 10 0 0 1 42 226.675h95.3a10.006 10.006 0 0 1 7.548 3.439l66.168 76.124c7.151-15.286 20.994-40.738 45.286-71.752 35.912-45.85 102.71-113.281 216.994-174.153a10 10 0 0 1 10.85 16.712c-.436.341-44.5 35.041-95.212 98.6-46.672 58.49-108.714 154.13-139.243 277.6a10 10 0 0 1-9.707 7.6z" data-name="6-Check" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                                </div>
                                                                <div className="radio_name">Married</div>
                                                            </label>
                                                            <label htmlFor="Unmarried">
                                                                <input type="radio" id="Unmarried" name="marital_status" value="Unmarried" checked={formValues.marital_status === "Unmarried"} onChange={handleInputChange} />
                                                                <div className="chekmark">
                                                                    <svg width="12" height="12" x="0" y="0" viewBox="0 0 520 520"><g><path d="M239.987 460.841a10 10 0 0 1-7.343-3.213L34.657 243.463A10 10 0 0 1 42 226.675h95.3a10.006 10.006 0 0 1 7.548 3.439l66.168 76.124c7.151-15.286 20.994-40.738 45.286-71.752 35.912-45.85 102.71-113.281 216.994-174.153a10 10 0 0 1 10.85 16.712c-.436.341-44.5 35.041-95.212 98.6-46.672 58.49-108.714 154.13-139.243 277.6a10 10 0 0 1-9.707 7.6z" data-name="6-Check" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                                </div>
                                                                <div className="radio_name">Unmarried</div>
                                                            </label>
                                                            <label htmlFor="Widower">
                                                                <input type="radio" id="Widower" name="marital_status" value="Widower/Widow" checked={formValues.marital_status === "Widower/Widow"} onChange={handleInputChange} />
                                                                <div className="chekmark">
                                                                    <svg width="12" height="12" x="0" y="0" viewBox="0 0 520 520"><g><path d="M239.987 460.841a10 10 0 0 1-7.343-3.213L34.657 243.463A10 10 0 0 1 42 226.675h95.3a10.006 10.006 0 0 1 7.548 3.439l66.168 76.124c7.151-15.286 20.994-40.738 45.286-71.752 35.912-45.85 102.71-113.281 216.994-174.153a10 10 0 0 1 10.85 16.712c-.436.341-44.5 35.041-95.212 98.6-46.672 58.49-108.714 154.13-139.243 277.6a10 10 0 0 1-9.707 7.6z" data-name="6-Check" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                                </div>
                                                                <div className="radio_name">Widower/Widow</div>
                                                            </label>
                                                            <label htmlFor="Divorced">
                                                                <input type="radio" id="Divorced" name="marital_status" value="Divorced" checked={formValues.marital_status === "Divorced"} onChange={handleInputChange} />
                                                                <div className="chekmark">
                                                                    <svg width="12" height="12" x="0" y="0" viewBox="0 0 520 520"><g><path d="M239.987 460.841a10 10 0 0 1-7.343-3.213L34.657 243.463A10 10 0 0 1 42 226.675h95.3a10.006 10.006 0 0 1 7.548 3.439l66.168 76.124c7.151-15.286 20.994-40.738 45.286-71.752 35.912-45.85 102.71-113.281 216.994-174.153a10 10 0 0 1 10.85 16.712c-.436.341-44.5 35.041-95.212 98.6-46.672 58.49-108.714 154.13-139.243 277.6a10 10 0 0 1-9.707 7.6z" data-name="6-Check" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                                </div>
                                                                <div className="radio_name">Divorced</div>
                                                            </label>
                                                            <label htmlFor="Separated">
                                                                <input type="radio" id="Separated" name="marital_status" value="Separated" checked={formValues.marital_status === "Separated"} onChange={handleInputChange} />
                                                                <div className="chekmark">
                                                                    <svg width="12" height="12" x="0" y="0" viewBox="0 0 520 520"><g><path d="M239.987 460.841a10 10 0 0 1-7.343-3.213L34.657 243.463A10 10 0 0 1 42 226.675h95.3a10.006 10.006 0 0 1 7.548 3.439l66.168 76.124c7.151-15.286 20.994-40.738 45.286-71.752 35.912-45.85 102.71-113.281 216.994-174.153a10 10 0 0 1 10.85 16.712c-.436.341-44.5 35.041-95.212 98.6-46.672 58.49-108.714 154.13-139.243 277.6a10 10 0 0 1-9.707 7.6z" data-name="6-Check" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                                </div>
                                                                <div className="radio_name">Separated</div>
                                                            </label>
                                                            {errors.marital_status && <span className="error_msg" style={{ color: "red" }}>{errors.marital_status}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form_group">
                                                        <label htmlFor="">Gender <span className="req_text">*</span></label>
                                                        <div className="form_radio_mainbox">
                                                            <label htmlFor="Male">
                                                                <input type="radio" name="gender" id="Male" value="Male" checked={formValues.gender === "Male"} onChange={handleInputChange} />
                                                                <div className="chekmark">
                                                                    <svg width="12" height="12" x="0" y="0" viewBox="0 0 520 520"><g><path d="M239.987 460.841a10 10 0 0 1-7.343-3.213L34.657 243.463A10 10 0 0 1 42 226.675h95.3a10.006 10.006 0 0 1 7.548 3.439l66.168 76.124c7.151-15.286 20.994-40.738 45.286-71.752 35.912-45.85 102.71-113.281 216.994-174.153a10 10 0 0 1 10.85 16.712c-.436.341-44.5 35.041-95.212 98.6-46.672 58.49-108.714 154.13-139.243 277.6a10 10 0 0 1-9.707 7.6z" data-name="6-Check" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                                </div>
                                                                <div className="radio_name">Male</div>
                                                            </label>
                                                            <label htmlFor="Female">
                                                                <input type="radio" name="gender" id="Female" value="Female" checked={formValues.gender === "Female"} onChange={handleInputChange} />
                                                                <div className="chekmark">
                                                                    <svg width="12" height="12" x="0" y="0" viewBox="0 0 520 520"><g><path d="M239.987 460.841a10 10 0 0 1-7.343-3.213L34.657 243.463A10 10 0 0 1 42 226.675h95.3a10.006 10.006 0 0 1 7.548 3.439l66.168 76.124c7.151-15.286 20.994-40.738 45.286-71.752 35.912-45.85 102.71-113.281 216.994-174.153a10 10 0 0 1 10.85 16.712c-.436.341-44.5 35.041-95.212 98.6-46.672 58.49-108.714 154.13-139.243 277.6a10 10 0 0 1-9.707 7.6z" data-name="6-Check" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                                </div>
                                                                <div className="radio_name">Female</div>
                                                            </label>
                                                            {errors.gender && <span className="error_msg" style={{ color: "red" }}>{errors.gender}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form_group">
                                                        <label htmlFor="">Blood Group</label>
                                                        <input className="form-control" type="text" name="blood_group" id="blood_group" placeholder="Enter blood type" value={formValues.blood_group} onChange={handleInputChange} />
                                                        {errors.blood_group && <span className="error_msg" style={{ color: "red" }}>{errors.blood_group}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Applicant <span>(Self/Son/Daughter/Husband/Wife/Nominated Family Member’s Name)</span></label>
                                                        <input className="form-control" type="text" name="relationship_with_applicant" id="relationship_with_applicant" value={formValues.relationship_with_applicant} placeholder="Your relation with the applicant - Your name" onChange={handleInputChange} />
                                                        {errors.relationship_with_applicant && <span className="error_msg" style={{ color: "red" }}>{errors.relationship_with_applicant}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Address<span>(*Not applicable if the applicant is filling the form for themselves)</span></label>
                                                        <textarea className="form-control" name="address" rows={2} id="address" placeholder="Enter full address" value={formValues.address} onChange={handleInputChange}></textarea>
                                                        {errors.address && <span className="error_msg" style={{ color: "red" }}>{errors.address}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Educational Qualification</label>
                                                        <input className="form-control" type="text" name="education" id="education" placeholder="Enter highest education qualification of applicant" value={formValues.education} onChange={handleInputChange} />
                                                        {errors.education && <span className="error_msg" style={{ color: "red" }}>{errors.education}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Profession <span>(details of last Job/Business done)</span></label>
                                                        <input className="form-control" type="text" name="profession" id="profession" placeholder="Enter profession type" value={formValues.profession} onChange={handleInputChange} />
                                                        {errors.profession && <span className="error_msg" style={{ color: "red" }}>{errors.profession}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Hobbies & Interests</label>
                                                        <input className="form-control" type="text" name="hobbies" id="hobbies" placeholder="Enter hobbies of the applicant" value={formValues.hobbies} onChange={handleInputChange} />
                                                        {errors.hobbies && <span className="error_msg" style={{ color: "red" }}>{errors.hobbies}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Health Data <span className="req_text">*</span></label>
                                                        <textarea className="form-control" name="health_data" rows={1} id="health_data" placeholder="Ailments if any, in details" value={formValues.health_data} onChange={handleInputChange}></textarea>
                                                        {errors.health_data && <span className="error_msg" style={{ color: "red" }}>{errors.health_data}</span>}
                                                    </div>
                                                    <div className="form_group">
                                                        <label>Would you like to volunteer for any activities in the home?</label>
                                                        <div className="form_radio_mainbox">
                                                            <label htmlFor="Yes">
                                                                <input type="radio" name="volunteer_interest" id="Yes" checked={formValues.volunteer_interest === "1"} value="1" onChange={handleInputChange} />
                                                                <div className="chekmark">
                                                                    <svg width="12" height="12" x="0" y="0" viewBox="0 0 520 520"><g><path d="M239.987 460.841a10 10 0 0 1-7.343-3.213L34.657 243.463A10 10 0 0 1 42 226.675h95.3a10.006 10.006 0 0 1 7.548 3.439l66.168 76.124c7.151-15.286 20.994-40.738 45.286-71.752 35.912-45.85 102.71-113.281 216.994-174.153a10 10 0 0 1 10.85 16.712c-.436.341-44.5 35.041-95.212 98.6-46.672 58.49-108.714 154.13-139.243 277.6a10 10 0 0 1-9.707 7.6z" data-name="6-Check" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                                </div>
                                                                <div className="radio_name">Yes</div>
                                                            </label>
                                                            <label htmlFor="No">
                                                                <input type="radio" name="volunteer_interest" id="No" checked={formValues.volunteer_interest === "0"} value="0" onChange={handleInputChange} />
                                                                <div className="chekmark">
                                                                    <svg width="12" height="12" x="0" y="0" viewBox="0 0 520 520"><g><path d="M239.987 460.841a10 10 0 0 1-7.343-3.213L34.657 243.463A10 10 0 0 1 42 226.675h95.3a10.006 10.006 0 0 1 7.548 3.439l66.168 76.124c7.151-15.286 20.994-40.738 45.286-71.752 35.912-45.85 102.71-113.281 216.994-174.153a10 10 0 0 1 10.85 16.712c-.436.341-44.5 35.041-95.212 98.6-46.672 58.49-108.714 154.13-139.243 277.6a10 10 0 0 1-9.707 7.6z" data-name="6-Check" fill="#028298" opacity="1" data-original="#000000"></path></g></svg>
                                                                </div>
                                                                <div className="radio_name">No</div>
                                                            </label>
                                                            {errors.volunteer_interest && <span className="error_msg" style={{ color: "red" }}>{errors.volunteer_interest}</span>}
                                                        </div>
                                                    </div>
                                                    {formValues.volunteer_interest === "1" && (
                                                    <div className="form_group">
                                                        <label>If Yes, then what and why?</label>
                                                        <textarea className="form-control" name="volunteer_details" rows={1} id="volunteer_details" placeholder="Write your interest.." value={formValues.volunteer_details} onChange={handleInputChange}></textarea>
                                                        {errors.volunteer_details && <span className="error_msg" style={{ color: "red" }}>{errors.volunteer_details}</span>}
                                                    </div>)}
                                                    <div className="form_group consent_box">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={formValues.digital_signature === "1"}
                                                                onChange={(e) =>
                                                                    setFormValues((prev) => ({
                                                                        ...prev,
                                                                        digital_signature: e.target.checked ? "1" : "0",
                                                                    }))
                                                                }
                                                            />
                                                            <span>
                                                                I hereby declare that the information provided is true and I give my
                                                                consent for the use and processing of my personal and medical information
                                                                as per the terms mentioned above.
                                                            </span>
                                                        </label>
                                                        {errors.digital_signature && (
                                                            <span className="error_msg" style={{ color: "red" }}>
                                                                {errors.digital_signature}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Submit */}
                                                <div className="form_submit">
                                                    <button className="submite_btn" type="submit">
                                                        Submit Now
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
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

export default ApplicationForm;
