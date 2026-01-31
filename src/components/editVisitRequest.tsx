
'use client'
import React, { useCallback, useEffect, useState } from 'react'

interface FormValues {
    id: number
    full_name: string
    email: string
    preferred_date: string
    phone_number: string
    preferred_time_slot: string
    purpose_of_visit: string
    number_of_visitors: number
    status: string
}

const EditVisitRequest = ({ onClose, id }: { onClose: (fetchData: boolean) => void, id: number }) => {

    // const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [formValues, setFormValues] = useState<FormValues>({
        id: 0,
        full_name: "",
        email: "",
        preferred_date: "",
        phone_number: "",
        preferred_time_slot: "",
        purpose_of_visit: "",
        status: "",
        number_of_visitors: 0

    });
    const fetchProfile = useCallback(async () => {
        if (!id) return;

        const res = await fetch("/api/book_visit_list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        const data = await res.json();

        if (data.status === 1 && data.data) {
            setFormValues(data.data);
        }
    }, [id]);


    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]:
                name === "number_of_visitors" ? Number(value) : value,
        }));
    };


    const validate = () => {
        const newErrors: Partial<FormValues> = {};
        if (!formValues.full_name) newErrors.full_name = "required";
        if (!formValues.email) newErrors.email = "required";
        if (!formValues.phone_number) newErrors.phone_number = "required";
        if (!formValues.preferred_date) newErrors.preferred_date = "required";
        if (!formValues.preferred_time_slot) newErrors.preferred_time_slot = "required";
        if (!formValues.purpose_of_visit) newErrors.purpose_of_visit = "required";
        if (!formValues.status) newErrors.status = "required";


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        if (!validate()) return;

        const formData = {
            id: id,
            full_name: formValues.full_name,
            email: formValues.email,
            preferred_date: formValues.preferred_date,
            phone_number: formValues.phone_number,
            preferred_time_slot: formValues.preferred_time_slot,
            purpose_of_visit: formValues.purpose_of_visit,
            status: formValues.status,
            number_of_visitors: formValues.number_of_visitors
        };

        const res = await fetch("/api/book_visit_edit", {
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
                <div className="col-lg-12 mb-4 inner_heading25">Edit Visit Request</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Full name  </label>
                            <input type="text" className="form-control" id="full_name" name="full_name" value={formValues.full_name} onChange={handleInputChange} />
                            {errors.full_name && <span className="error" style={{ color: "red" }}>{errors.full_name}</span>}

                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email  </label>
                            <input type="text" className="form-control" id="email" name="email" value={formValues.email} onChange={handleInputChange} />
                            {errors.email && <span className="error" style={{ color: "red" }}>{errors.email}</span>}

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Contact number </label>
                            <input type="text" className="form-control" id="phone_number" name="phone_number" value={formValues.phone_number} onChange={handleInputChange} />
                            {errors.phone_number && <span className="error" style={{ color: "red" }}>{errors.phone_number}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Prefered Date  </label>
                            {/* <input type="text" className="form-control" id="date_of_birth" value={moment(formValues.date_of_birth).format('DD-MM-YYYY')} name="date_of_birth" onChange={handleInputChange} /> */}
                            <input type="date" className="form-control" id="preferred_date" name="preferred_date" value={formValues.preferred_date} onChange={handleInputChange} />
                            {errors.preferred_date && <span className="error" style={{ color: "red" }}>{errors.preferred_date}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Preferred time slot:  </label>
                            <select
                                className="form-select"
                                id="preferred_time_slot"
                                name="preferred_time_slot"
                                value={formValues.preferred_time_slot}
                                onChange={handleInputChange}
                            >
                                <option value="">Preferred Time Slot</option>
                                <option value="10–11 AM">10–11 AM</option>
                                <option value="12–1 PM">12–1 PM</option>
                                <option value="3–4 PM">3–4 PM</option>
                            </select>
                            {errors.preferred_time_slot && <span className="error" style={{ color: "red" }}>{errors.preferred_time_slot}</span>}
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Purpose of visit  </label>
                            <select
                                className="form-select"
                                id="purpose_of_visit"
                                name="purpose_of_visit"
                                value={formValues.purpose_of_visit}
                                onChange={handleInputChange}
                            >

                                <option value="all">Purpose</option>
                                <option value="Family">Family</option>
                                <option value="Visit">Visit</option>
                                <option value="Resident Admission Inquiry">Resident Admission Inquiry</option>
                                <option value="Volunteering">Volunteering</option>
                                <option value="Donation">Donation</option>
                                <option value="CSR Partnership">CSR Partnership</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.purpose_of_visit && <span className="error" style={{ color: "red" }}>{errors.purpose_of_visit}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Number of visitors</label>
                            {/* <input type="text" className="form-control" id="record_date" value={formValues.record_date} name="record_date" onChange={handleInputChange} /> */}
                            <input type="text" className="form-control" id="number_of_visitors" name="number_of_visitors" value={formValues.number_of_visitors} onChange={handleInputChange} />
                            {errors.number_of_visitors && <span className="error" style={{ color: "red" }}>{errors.number_of_visitors}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Status</label>
                            <select
                                className="form-select"
                                id="status"
                                name="status"
                                value={formValues.status}
                                onChange={handleInputChange}
                            >
                                <option value="all"> Status</option>
                                <option value="Visited">Visited</option>
                                <option value="Not visited">Not visited</option>
                            </select>
                            {errors.status && <span className="error" style={{ color: "red" }}>{errors.status}</span>}
                        </div>
                    </div>

                </div>
                <div className="row mb-5">
                    <div className="col-lg-12 ">
                        <input type='submit' value="Edit"
                            className="red_button" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditVisitRequest