
'use client'
import React, { useState } from 'react'

interface FormValues {
    full_name: string
    email: string
    phone_number: string
    address: string
}

const AddSecondaryUser = ({ onClose, id }: { onClose: (fetchData: boolean) => void, id: number }) => {

    // const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [formValues, setFormValues] = useState<FormValues>({
        full_name: "",
        email: "",
        phone_number: "",
        address: ""

    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    }

    const validate = () => {
        const newErrors: Partial<FormValues> = {};
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formValues.full_name) newErrors.full_name = "required";
        
        if (!formValues.email) newErrors.email = "required";
        if (!formValues.phone_number) newErrors.phone_number = "required";
        // if (!formValues.address) newErrors.address = "required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        if (!validate()) return;

        const formData = {
            elderly_id: id,
            name: formValues.full_name,
            address: formValues.address,
            email: formValues.email,
            contact_number: formValues.phone_number
        };

        const res = await fetch("/api/candidate/add_second_guardian", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.status == 1) {
            onClose(true)
        } else {
            alert(data.error || "Something went wrong!");
        }

    };

    return (
        <div className="">

            <div className='rightpoup_close' onClick={() => onClose(false)}>
                <img src={"/assets/admin/close.png"} alt="close" title='Close' />
            </div>
            <div className="row">
            </div>
            <div className="row">
                <div className="col-lg-12 mb-4 inner_heading25">Add Secondary Guardian</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Full name:  </label>
                            <input type="text" className="form-control" id="full_name" name="full_name" onChange={handleInputChange} />
                            {errors.full_name && <span className="error" style={{ color: "red" }}>{errors.full_name}</span>}

                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email:  </label>
                            <input  className="form-control" type="email" id="email" name="email" onChange={handleInputChange} />
                            {errors.email && <span className="error" style={{ color: "red" }}>{errors.email}</span>}

                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Contact number </label>
                            <input type="text" className="form-control" id="phone_number" name="phone_number" maxLength={10} minLength={10} onChange={handleInputChange} />
                            {errors.phone_number && <span className="error" style={{ color: "red" }}>{errors.phone_number}</span>}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
                            {/* <input type="text" className="form-control" id="record_date" value={formValues.record_date} name="record_date" onChange={handleInputChange} /> */}
                            <input type="text" className="form-control" id="address" name="address" onChange={handleInputChange} />
                            {errors.address && <span className="error" style={{ color: "red" }}>{errors.address}</span>}
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-lg-12 ">
                        <input type='submit' value="Add"
                            className="red_button" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddSecondaryUser