
'use client'
import React, { useState } from 'react'
interface CandidateDataModel {
    id: number
    name: string
    date_of_birth: string
    age: number
    marital_status: string
    gender: string
    blood_group: string
    address: string
    education: string
    profession: string
    hobbies: string
    health_data: string
}


const EditProfileDialog = ({ onClose, id }: { onClose: (fetchData: boolean) => void, id: number }) => {
const [listData, setlistData] = useState<CandidateDataModel>();
    // const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState<Partial<CandidateDataModel>>({});
    const [formValues, setFormValues] = useState<CandidateDataModel>({
        id: 0,
        name: "",
        date_of_birth: "",
        age: 0,
        marital_status: "",
        gender: "",
        blood_group: "",
        address: "",
        education: "",
        profession: "",
        hobbies: "",
        health_data: "",

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
            setlistData(data.data.personal_details[0]);
        }
    }, [id]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    }

    const validate = () => {
        const newErrors: Partial<CandidateDataModel> = {};
        if (!formValues.diagnosis) newErrors.diagnosis = "required";
        if (!formValues.medications) newErrors.medications = "required";
        if (!formValues.doctor_notes) newErrors.doctor_notes = "required";
        if (!formValues.record_date) newErrors.record_date = "required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        if (!validate()) return;

        const formData = {
            elderly_id: id,
            diagnosis: formValues.diagnosis,
            medications: formValues.medications,
            doctor_notes: formValues.doctor_notes,
            record_date: formValues.record_date
        };

        const res = await fetch("/api/add_medical_info", {
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

        // reset();
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
                <div className="col-lg-12 mb-4 inner_heading25">Add Medical records</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Diagosis:  </label>
                            <input type="text" className="form-control" id="diagnosis" value={formValues.diagnosis} name="diagnosis" onChange={handleInputChange} />
                            {errors.diagnosis && <span className="error" style={{ color: "red" }}>{errors.diagnosis}</span>}

                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Medications:  </label>
                            <input type="text" className="form-control" id="medications" value={formValues.medications} name="medications" onChange={handleInputChange} />
                            {errors.medications && <span className="error" style={{ color: "red" }}>{errors.medications}</span>}

                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Doctor&apos;s note: </label>
                            <input type="text" className="form-control" id="doctor_notes" value={formValues.doctor_notes} name="doctor_notes" onChange={handleInputChange} />
                            {errors.doctor_notes && <span className="error" style={{ color: "red" }}>{errors.doctor_notes}</span>}
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form_box mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Record date:</label>
                        {/* <input type="text" className="form-control" id="record_date" value={formValues.record_date} name="record_date" onChange={handleInputChange} /> */}
                        <input className="form-control" type="date" name="record_date" id="record_date" placeholder="Enter date" onChange={handleInputChange} />
                        {errors.record_date && <span className="error" style={{ color: "red" }}>{errors.record_date}</span>}
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-lg-12 ">
                        <input type='submit' value="Add" className="red_button" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfileDialog