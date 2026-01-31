
'use client'
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
interface UserDataModel {
    id: number
    full_name: string
    email: string
    phone_number: string
    address: string
    new_password?: string
    confirm_password?: string
}

const EditProfileDialog = ({ onClose, id, role }: { onClose: (fetchData: boolean) => void, id: number, role: string }) => {
    const [errors, setErrors] = useState<Partial<CandidateDataModel>>({});
    const [errorsUser, setErrorsUser] = useState<Partial<UserDataModel>>({});
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
    const [userformValues, setuserFormValues] = useState<UserDataModel>({
        id: 0,
        full_name: "",
        email: "",
        phone_number: "",
        address: ""
    });
    const fetchProfile = useCallback(async () => {
        if (!id) return;

        if (role === "admin") {
            const res = await fetch("/api/candidate/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            const data = await res.json();

            if (data.status === 1) {
                setFormValues(data.data.personal_details[0]);
            }
        } else {
            const res = await fetch("/api/user_profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            const data = await res.json();

            if (data.status === 1) {
                setuserFormValues(data.data[0]);
            }
        }

    }, [id, role]);

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

    const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setuserFormValues((prev) => ({ ...prev, [name]: value }));

    };
    const validate = () => {
        const newErrors: Partial<CandidateDataModel> = {};
        if (!formValues.name) newErrors.name = "required";
        if (!/^[A-Za-z\s]+$/.test(formValues.name)) {
            newErrors.name = "Name is required. Only alphabets are allowed";
        }
        if (!formValues.date_of_birth) newErrors.date_of_birth = "required";
        if (!formValues.age) newErrors.age = "required";
        if (!formValues.marital_status) newErrors.marital_status = "required";
        if (!formValues.gender) newErrors.gender = "required";
        if (!formValues.blood_group) newErrors.blood_group = "required";
        if (!formValues.address) newErrors.address = "required";
        if (!formValues.education) newErrors.education = "required";
        if (!formValues.profession) newErrors.profession = "required";
        if (!formValues.hobbies) newErrors.hobbies = "required";
        // if (!formValues.room_no) newErrors.room_no = "required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const validateUser = () => {
        const newErrors: Partial<UserDataModel> = {};
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!userformValues.full_name) newErrors.full_name = "required";
        if (!/^[A-Za-z\s]+$/.test(userformValues.full_name)) {
            newErrors.full_name = "Name is required. Only alphabets are allowed";
        }
        if (!userformValues.email) newErrors.email = "required";
        if (!userformValues.address) newErrors.address = "required";
        // if (!userformValues.phone_number) newErrors.phone_number = "required";
         if (userformValues.phone_number && !phoneRegex.test(userformValues.phone_number)) {
            newErrors.phone_number = "Valid contact number is required";
        }
        if (userformValues.new_password || userformValues.confirm_password) {
            if (!userformValues.new_password)
                newErrors.new_password = "required";

            if (!userformValues.confirm_password)
                newErrors.confirm_password = "required";

            if (
                userformValues.new_password &&
                userformValues.confirm_password &&
                userformValues.new_password !== userformValues.confirm_password
            ) {
                newErrors.confirm_password = "Passwords do not match";
            }
        }
        setErrorsUser(newErrors);
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
    const handleUserUpdate = async (e: React.FormEvent) => {

        e.preventDefault();
        if (!validateUser()) return;

        const formData = {
            id: id,
            full_name: userformValues.full_name,
            address: userformValues.address,
            email: userformValues.email,
            phone_number: userformValues.phone_number,
            new_password: userformValues.new_password,
            confirm_password: userformValues.confirm_password,
        };

        const res = await fetch("/api/user_profile_edit", {
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
                <img src={"/assets/admin/close.png"} alt="close" title='Close' />
            </div>
            {
                role === "admin" ? (<>
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
                                        className="form-select"
                                        id="marital_status"
                                        name="marital_status"
                                        value={formValues.marital_status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Married">Married</option>
                                        <option value="Unmarried">Unmarried</option>
                                        <option value="Widower/Widow">Widower/Widow</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Separated">Separated</option>
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
                                        className="form-select"
                                        id="gender"
                                        name="gender"
                                        value={formValues.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
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
                    </form></>)
                    : (<><div className="row">
                        <div className="col-lg-12 mb-4 inner_heading25">Update Profile details</div>
                    </div>
                        <form onSubmit={handleUserUpdate}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form_box mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Name:  </label>
                                        <input type="text" className="form-control" id="full_name" value={userformValues.full_name} name="full_name" onChange={handleUserInputChange} />
                                        {errorsUser.full_name && <span className="error" style={{ color: "red" }}>{errorsUser.full_name}</span>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form_box mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address:  </label>
                                        <input type="email" className="form-control" id="email" name="email" value={userformValues.email} onChange={handleUserInputChange} />
                                        {errorsUser.email && <span className="error" style={{ color: "red" }}>{errorsUser.email}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form_box mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Contact number:  </label>
                                        <input type="text" className="form-control" id="phone_number" maxLength={10} minLength={10} value={userformValues.phone_number} name="phone_number" onChange={handleUserInputChange} />
                                        {errorsUser.phone_number && <span className="error" style={{ color: "red" }}>{errorsUser.phone_number}</span>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form_box mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Address:  </label>
                                        <input type="text" className="form-control" id="address" name="address" value={userformValues.address} onChange={handleUserInputChange} />
                                        {errorsUser.address && <span className="error" style={{ color: "red" }}>{errorsUser.address}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form_box mb-3">
                                        <label className="form-label">New Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="new_password"
                                            value={userformValues.new_password || ""}
                                            onChange={handleUserInputChange}
                                        />
                                        {errorsUser.new_password && (
                                            <span style={{ color: "red" }}>{errorsUser.new_password}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form_box mb-3">
                                        <label className="form-label">Confirm Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirm_password"
                                            value={userformValues.confirm_password || ""}
                                            onChange={handleUserInputChange}
                                        />
                                        {errorsUser.confirm_password && (
                                            <span style={{ color: "red" }}>{errorsUser.confirm_password}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-5">
                                <div className="col-lg-12 ">
                                    <input type='submit' value="Update" className="red_button" />
                                </div>
                            </div>
                        </form></>)
            }
        </div>
    )
}

export default EditProfileDialog