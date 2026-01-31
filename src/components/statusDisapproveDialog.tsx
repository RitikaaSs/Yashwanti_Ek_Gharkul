
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

interface CandidateDataModel {
    id: number
    status: string
    remark: string
}

const StatusDisapprovedDialog = ({ onClose, id }: { onClose: (fetchData: boolean) => void, id: number }) => {
    const [errors, setErrors] = useState<Partial<CandidateDataModel>>({});
    const router = useRouter();
    const [formValues, setFormValues] = useState<CandidateDataModel>({
        id: 0,
        status: "",
        remark: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors: Partial<CandidateDataModel> = {};
        if (!formValues.remark) newErrors.remark = "required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = {
            candidate_id: id,
            status: "Disapproved",
            remark: formValues.remark,
        };

        const res = await fetch("/api/candidate/edit_status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.status == 1) {
            alert("Applicant rejected successfully!");
            router.push(`/admin/disapproved-list`);
        } else {
            alert(data.error || "Something went wrong!");
        }

    };

    return (
        <div className="">
            {/* <LoadingDialog isLoading={loading} /> */}


            <div className='rightpoup_close' onClick={() => onClose(false)}>
                <img src={"/assets/admin/close.png"} alt="close" title='Close' />
            </div>

            <div className="row">
                <div className="col-lg-12 mb-4 inner_heading25">Remark for disapproval</div>
            </div>
            <form onSubmit={handleUpdate}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form_box mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Remark:  </label>
                            <input type="text" className="form-control" id="remark" value={formValues.remark} name="remark" onChange={handleInputChange} />
                            {errors.remark && <span className="error" style={{ color: "red" }}>{errors.remark}</span>}
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

export default StatusDisapprovedDialog