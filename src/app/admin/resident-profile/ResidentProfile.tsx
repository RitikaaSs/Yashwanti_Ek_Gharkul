"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import moment from "moment";
import AddMedicalInfoDialog from "@/components/addMedicalInfoDialog";
import { logout } from "@/app/pro_utils/constantFun";
import EditProfileDialog from "@/components/editProfileDialog";
import AddSecondaryUser from "@/components/addSecondaryGuardian";
// import router from "next/router";
interface CandidateDataModel {
    id: number
    user_id: number
    name: string
    date_of_birth: string
    age: number
    marital_status: string
    gender: string
    blood_group: string
    relationship_with_applicant: string
    address: string
    education: string
    profession: string
    hobbies: string
    volunteer_interest: number
    volunteer_details: string
    health_data: string
    status: string
    updated_at: string
    reviewer_id: string
    approver_id: string
    room_no: string
}
interface userDataModel {
    full_name: string
    email: string
    phone_number: string
    address: string
}
interface userSecDataModel {
    name: string
    email: string
    contact_number: string
    address: string
}
interface CandidateMedicalDataModel {
    diagnosis: string,
    medications: string,
    doctor_notes: string,
    record_date: string,
    attachment: string
}
export default function ResidentProfile() {
    const [listData, setlistData] = useState<CandidateDataModel>();
    const [userData, setUserData] = useState<userDataModel>();
    const [secUserData, setsecUserData] = useState<userSecDataModel>();
    const [showDialog, setShowDialog] = useState(false);
    const [showSecUserDialog, setShowshowSecUserDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [medicalId, setMedicalId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [medData, setMedData] = useState<CandidateMedicalDataModel[]>();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();
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
            setUserData(data.data.user_details[0]);
            setMedData(data.data.medical_record);
            setsecUserData(data.data.secondary_guardians[0]);
        }
    }, [id]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleDialogClose = (shouldRefresh: boolean) => {
        setShowDialog(false);

        if (shouldRefresh) {
            fetchProfile(); // refresh data
        }
    };
    const handledEditDialogClose = (shouldRefresh: boolean) => {
        setShowEditDialog(false);

        if (shouldRefresh) {
            fetchProfile(); // refresh data
        }
    };
    const handleSecUserDialogClose = (shouldRefresh: boolean) => {
        setShowshowSecUserDialog(false);

        if (shouldRefresh) {
            fetchProfile(); // refresh data
        }
    };
    return (
        <div>
            <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
        .layout {
          display: flex;
          background: #f5f5f5;
          min-height: 100vh;
        }
        .sidebar {
          width: 240px;
          background: #0A6C85;
          color: white;
          display: flex;
          flex-direction: column;
          padding: 20px 0;
        }
        .sidebar h2 {
          text-align: center;
          margin-bottom: 30px;
        }
        .menu a {
          display: block;
          padding: 12px 20px;
          text-decoration: none;
          color: #cfcfcf;
          transition: 0.2s;
        }
        .menu a:hover {
          background: #34344a;
          color: #fff;
        }
        .main {
          flex: 1;
          padding: 30px;
        }
        .card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
      `}</style>

            <div className="layout">
                <aside className="sidebar">
                    <div style={{ "padding": '0 3.75rem' }}><img src="/assets/images/home/footer-logo.webp" alt="Logo" className="img-fluid" /></div>

                    <nav className="menu">
                        <a href="/admin">Dashboard</a>
                        <a href="/admin/resident-list">Resident List</a>
                        <a href="/admin/user-list">Relatives</a>
                        <a href="/admin/visit-requests">Visit requests</a>
                        <a href="/admin/enquiries">Enquiries</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); logout("admin"); }}>Logout</a>
                    </nav>
                </aside>

                <main className="main">
                    {/* <LoadingDialog isLoading={isLoading} /> */}
                    <div className="card">
                        <div className="col-lg-3">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '16px',
                                }}
                            >
                                ← Back
                            </button></div>
                        <h2>Candidate Profile</h2>
                        <div className="container" id='employement_id'>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="d_user_new_details_mainbox">
                                        <div className="d_user_profile_heading">
                                            <div className="row">
                                                <div className="col-lg-6">Basic Details</div>
                                                <div className="col-lg-6" style={{ textAlign: "right" }}>
                                                    <button className="btn btn-primary mb-3" style={{ background: "#0A6C85" }} onClick={() => { setUserId(listData?.id || 0); setShowEditDialog(true); }}>
                                                        Update</button></div>
                                                {/* <img src={staticIconsBaseURL + "/images/menu.png"} className="img-fluid edit-icon" alt="Search Icon" style={{ width: "20px", paddingBottom: "5px", alignItems: "center" }} onClick={() => { setEditLeaveId(applied.id); setShowDialog(true); setisToBeEdited(false) }} /> */}
                                            </div>
                                        </div>
                                        <div className="d_user_profile_details_listing_box">
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Name</div>
                                                <div className="d_user_profile_details_content">{listData?.name || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Age</div>
                                                <div className="d_user_profile_details_content">{listData?.age || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Gender</div>
                                                <div className="d_user_profile_details_content">{listData?.gender || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">DOB</div>
                                                <div className="d_user_profile_details_content">{moment(listData?.date_of_birth).format('DD-MM-YYYY') || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Marital Status</div>
                                                <div className="d_user_profile_details_content">{
                                                    listData?.marital_status === "Widower/Widow"
                                                        ? listData?.gender === "Male"
                                                            ? "Widower"
                                                            : listData?.gender === "Female"
                                                                ? "Widow"
                                                                : "Widowed"
                                                        : listData?.marital_status
                                                }</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Blood group</div>
                                                <div className="d_user_profile_details_content">{listData?.blood_group || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Education</div>
                                                <div className="d_user_profile_details_content">{listData?.education || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Profession</div>
                                                <div className="d_user_profile_details_content">{listData?.profession || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Hobbies</div>
                                                <div className="d_user_profile_details_content">{listData?.hobbies || "--"}</div>
                                            </div>
                                            {/* <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Guardian</div>
                                                <div className="d_user_profile_details_content">{listData?.user_id || "--"}</div>
                                            </div> */}
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Address</div>
                                                <div className="d_user_profile_details_content">{listData?.address || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Health Data</div>
                                                <div className="d_user_profile_details_content">{listData?.health_data || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Room no.</div>
                                                <div className="d_user_profile_details_content">{listData?.room_no || "--"}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d_user_new_details_mainbox">
                                        <div className="d_user_profile_heading">
                                            <div className="row">
                                                <div className="col-lg-6">Guardian Details</div>
                                                {!secUserData ? <div className="col-lg-6" style={{ textAlign: "right" }}>
                                                    <button className="btn btn-primary mb-3" style={{ background: "#0A6C85" }} onClick={() => { setUserId(listData?.id || 0); setShowshowSecUserDialog(true); }}>
                                                        Add Secondary</button></div> : <></>}

                                                {/* <img src={staticIconsBaseURL + "/images/menu.png"} className="img-fluid edit-icon" alt="Search Icon" style={{ width: "20px", paddingBottom: "5px", alignItems: "center" }} onClick={() => { setEditLeaveId(applied.id); setShowDialog(true); setisToBeEdited(false) }} /> */}
                                            </div>
                                        </div>
                                        {/* <div className="d_user_profile_heading"></div> */}
                                        {/*  */}
                                        <div className="d_user_profile_details_listing_box">
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Name	(Primary)</div>
                                                <div className="d_user_profile_details_content">{userData?.full_name || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Email ID</div>
                                                <div className="d_user_profile_details_content">{userData?.email || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Contact info</div>
                                                <div className="d_user_profile_details_content">{userData?.phone_number || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Address</div>
                                                <div className="d_user_profile_details_content">{userData?.address || "--"}</div>
                                            </div>
                                        </div>
                                        {secUserData && <>
                                            <div className="d_user_profile_heading"></div>
                                            <div className="d_user_profile_details_listing_box">
                                                <div className="d_user_profile_details_listing">
                                                    <div className="d_user_profile_details_subheading">Name	(Secondary)</div>
                                                    <div className="d_user_profile_details_content">{secUserData?.name || "--"}</div>
                                                </div>
                                                <div className="d_user_profile_details_listing">
                                                    <div className="d_user_profile_details_subheading">Email ID</div>
                                                    <div className="d_user_profile_details_content">{secUserData?.email || "--"}</div>
                                                </div>
                                                <div className="d_user_profile_details_listing">
                                                    <div className="d_user_profile_details_subheading">Contact info</div>
                                                    <div className="d_user_profile_details_content">{secUserData?.contact_number || "--"}</div>
                                                </div>
                                                <div className="d_user_profile_details_listing">
                                                    <div className="d_user_profile_details_subheading">Address</div>
                                                    <div className="d_user_profile_details_content">{secUserData?.address || "--"}</div>
                                                </div>
                                            </div></>}
                                    </div>
                                    <div className="d_user_new_details_mainbox">
                                        <div className="d_user_profile_heading">
                                            <div className="row">
                                                <div className="col-lg-6">Medical Records</div>
                                                <div className="col-lg-6" style={{ textAlign: "right" }}>
                                                    <button className="btn btn-primary mb-3" style={{ background: "#0A6C85" }} onClick={() => { setMedicalId(listData?.id || 0); setShowDialog(true); }}>
                                                        + Add</button></div>
                                                {/* <img src={staticIconsBaseURL + "/images/menu.png"} className="img-fluid edit-icon" alt="Search Icon" style={{ width: "20px", paddingBottom: "5px", alignItems: "center" }} onClick={() => { setEditLeaveId(applied.id); setShowDialog(true); setisToBeEdited(false) }} /> */}
                                            </div>
                                        </div>
                                        {medData && medData.length > 0 ? medData.map((medItem, index) => (
                                            <div className="d_user_profile_details_listing_box" key={index} style={{ margin: "10px 10px 20px 10px", borderBottom: "2px solid #dedede" }}>
                                                <div className="d_user_profile_details_listing" >
                                                    <div className="d_user_profile_details_subheading">Diagnosis</div>
                                                    <div className="d_user_profile_details_content">{medItem?.diagnosis || "--"}</div>
                                                </div>
                                                <div className="d_user_profile_details_listing">
                                                    <div className="d_user_profile_details_subheading">Medications </div>
                                                    <div className="d_user_profile_details_content">{medItem?.medications || "--"}</div>
                                                </div>
                                                <div className="d_user_profile_details_listing">
                                                    <div className="d_user_profile_details_subheading">Doctor&apos;s Note</div>
                                                    <div className="d_user_profile_details_content">{medItem?.doctor_notes || "--"}</div>
                                                </div>
                                                <div className="d_user_profile_details_listing">
                                                    <div className="d_user_profile_details_subheading">Record Date</div>
                                                    <div className="d_user_profile_details_content">{moment(medItem?.record_date).format('DD-MM-YYYY') || "--"}</div>
                                                </div>
                                                {/* {medItem.attachment && (
                                                    <a href={medItem.attachment} target="_blank" rel="noopener noreferrer">
                                                        <img
                                                            src={medItem.attachment}
                                                            alt="Medical attachment"
                                                            style={{ maxWidth: "120px", cursor: "pointer" }}
                                                        />
                                                    </a>
                                                )} */}
                                                {medItem.attachment && (
                                                    <a
                                                        href={`/api/fetch_uploads?path=${encodeURIComponent(medItem.attachment)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img
                                                            src={`/api/fetch_uploads?path=${encodeURIComponent(medItem.attachment)}`}
                                                            alt="Medical attachment"
                                                            style={{ maxWidth: "120px", cursor: "pointer" }}
                                                        />
                                                    </a>
                                                )}

                                            </div>)) : <div>No medical records found.</div>}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={showDialog ? "rightpoup rightpoupopen" : "rightpoup"}>
                        {showDialog && <AddMedicalInfoDialog onClose={handleDialogClose} id={medicalId} />}
                    </div>
                    <div className={showEditDialog ? "rightpoup rightpoupopen" : "rightpoup"}>
                        {showEditDialog && <EditProfileDialog onClose={handledEditDialogClose} id={userId} role={"admin"} />}
                    </div>
                    <div className={showSecUserDialog ? "rightpoup rightpoupopen" : "rightpoup"}>
                        {showSecUserDialog && <AddSecondaryUser onClose={handleSecUserDialogClose} id={userId} />}
                    </div>
                </main>
            </div>
        </div>
    );
}