
'use client'
import moment from 'moment'
import React, { useEffect, useState, useCallback } from 'react'
interface CandidateDataModel {
    id: number
    name: string
    date_of_birth: string
    age: string
    marital_status: string
    gender: string
    blood_group: string
    address: string
    education: string
    profession: string
    hobbies: string
    room_no: string
}


const EditProfileDialog = ({ onClose, id }: { onClose: (fetchData: boolean) => void, id: number }) => {
    // const [listData, setlistData] = useState<CandidateDataModel>();
    // const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState<Partial<CandidateDataModel>>({});
    const [formValues, setFormValues] = useState<CandidateDataModel>({
        id: 0,
        name: "",
        date_of_birth: "",
        age: "",
        marital_status: "",
        gender: "",
        blood_group: "",
        address: "",
        education: "",
        profession: "",
        hobbies: "",
        room_no: ""
    });

    const fetchProfile = useCallback(async () => {
        if (!id) return;

        const res = await fetch("/api/candidate/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        const data = await res.json();

        if (data.status === 1) {
            setFormValues(data.data.personal_details[0]);
        }
    }, [id]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

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
    };

    const validate = () => {
        const newErrors: Partial<CandidateDataModel> = {};
        if (!formValues.name) newErrors.name = "required";
        if (!formValues.date_of_birth) newErrors.date_of_birth = "required";
        if (!formValues.age) newErrors.age = "required";
        if (!formValues.marital_status) newErrors.marital_status = "required";
        if (!formValues.gender) newErrors.gender = "required";
        if (!formValues.blood_group) newErrors.blood_group = "required";
        if (!formValues.address) newErrors.address = "required";
        if (!formValues.education) newErrors.education = "required";
        if (!formValues.profession) newErrors.profession = "required";
        if (!formValues.hobbies) newErrors.hobbies = "required";
        if (!formValues.room_no) newErrors.room_no = "required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async (e: React.FormEvent) => {

        e.preventDefault();
        if (!validate()) return;

        const formData = {
            id: id,
            name: formValues.name,
            date_of_birth: formValues.date_of_birth,
            age: formValues.age,
            marital_status: formValues.marital_status,
            gender: formValues.gender,
            blood_group: formValues.blood_group,
            address: formValues.address,
            education: formValues.education,
            profession: formValues.profession,
            hobbies: formValues.hobbies,
            room_no: formValues.room_no
        };

        const res = await fetch("/api/candidate/update_profile", {
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


    return (
        <div className="">
            {/* <LoadingDialog isLoading={loading} /> */}


            <div className='rightpoup_close' onClick={() => onClose(false)}>
                <img src={"/images/close_white.png"} alt="close" title='Close' />
            </div>
            <div className="row">
                {/* <div className="col-lg-12" style={{textAlign: "right"}}>
                    <img src={staticIconsBaseURL+"/images/close.png"} className="img-fluid edit-icon" alt="Search Icon" style={{ width: "15px", paddingBottom: "5px", alignItems: "right", cursor:"pointer" }}
                     onClick={onClose}/>
                </div> */}
            </div>
            <div className="row">
                <div className="col-lg-12 mb-4 inner_heading25">Update Personal details</div>
            </div>
            <form onSubmit={handleUpdate}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Name:  </label>
                            <input type="text" className="form-control" id="name" value={formValues.name} name="name" onChange={handleInputChange} />
                            {errors.name && <span className="error" style={{ color: "red" }}>{errors.name}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">DOB:  </label>
                            {/* <input type="text" className="form-control" id="date_of_birth" value={moment(formValues.date_of_birth).format('DD-MM-YYYY')} name="date_of_birth" onChange={handleInputChange} /> */}
                            <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" value={formValues.date_of_birth} onChange={handleInputChange} />
                            {errors.date_of_birth && <span className="error" style={{ color: "red" }}>{errors.date_of_birth}</span>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Age:  </label>
                            <input type="text" className="form-control" id="age" value={formValues.age} name="age" readOnly />
                            {errors.age && <span className="error" style={{ color: "red" }}>{errors.age}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Marital Status:  </label>
                            <select
                                className="form-control"
                                id="marital_status"
                                name="marital_status"
                                value={formValues.marital_status}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>

                            {/* <input type="text" className="form-control" id="marital_status" value={formValues.marital_status} name="marital_status" onChange={handleInputChange} /> */}
                            {errors.marital_status && <span className="error" style={{ color: "red" }}>{errors.marital_status}</span>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Gender:  </label>
                            <select
                                className="form-control"
                                id="gender"
                                name="gender"
                                value={formValues.gender}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {/* <input type="text" className="form-control" id="gender" value={formValues.gender} name="gender" onChange={handleInputChange} /> */}
                            {errors.gender && <span className="error" style={{ color: "red" }}>{errors.gender}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Blood group:  </label>
                            <input type="text" className="form-control" id="blood_group" value={formValues.blood_group} name="blood_group" onChange={handleInputChange} />
                            {errors.blood_group && <span className="error" style={{ color: "red" }}>{errors.blood_group}</span>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Address:  </label>
                            <input type="text" className="form-control" id="address" value={formValues.address} name="address" onChange={handleInputChange} />
                            {errors.address && <span className="error" style={{ color: "red" }}>{errors.address}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Education:  </label>
                            <input type="text" className="form-control" id="education" value={formValues.education} name="education" onChange={handleInputChange} />
                            {errors.education && <span className="error" style={{ color: "red" }}>{errors.education}</span>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Profession:  </label>
                            <input type="text" className="form-control" id="profession" value={formValues.profession} name="profession" onChange={handleInputChange} />
                            {errors.profession && <span className="error" style={{ color: "red" }}>{errors.profession}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Hobbies:  </label>
                            <input type="text" className="form-control" id="hobbies" value={formValues.hobbies} name="hobbies" onChange={handleInputChange} />
                            {errors.hobbies && <span className="error" style={{ color: "red" }}>{errors.hobbies}</span>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Room no:  </label>
                            <input type="text" className="form-control" id="room_no" value={formValues.room_no} name="room_no" onChange={handleInputChange} />
                            {errors.room_no && <span className="error" style={{ color: "red" }}>{errors.room_no}</span>}
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-lg-12 ">
                        <input type='submit' value="Update" className="red_button" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfileDialog