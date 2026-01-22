

"use client";
import { logout } from "@/app/pro_utils/constantFun";
import EditProfileDialog from "@/components/editProfileDialog";
import { useEffect, useState } from "react";

interface userDataModel {
    full_name: string
    email: string
    phone_number: string
    address: string
}
export default function ResidentProfile() {
    const [userData, setUserData] = useState<userDataModel>();
        const [uId, setUId] = useState(0);
    const [userId, setUserId] = useState<number | null>(null);
        const [showEditDialog, setShowEditDialog] = useState(false);
    useEffect(() => {
        async function getUser() {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            setUserId(data.id);
        }
        getUser();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchProfile(userId);
        }
    }, [userId]);

const handledEditDialogClose = (shouldRefresh: boolean) => {
        setShowEditDialog(false);

        if (shouldRefresh) {
            fetchProfile(userId); // refresh data
        }
    };
    async function fetchProfile(id: number | null) {
        try {
            
            const res = await fetch("/api/user_profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            const data = await res.json();

            if (data.status === 1) {
                setUserData(data.data[0]);
            }
        } catch (error) {
            console.error("Error fetching status counts:", error);
        }
    }


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
                        <a href="/user">Dashboard</a>
                        <a href="/user/my-profile">My Profile</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); logout("user"); }}>Logout</a>
                    </nav>
                </aside>
                <main className="main">
                    {/* <LoadingDialog isLoading={isLoading} /> */}
                    <div className="card">
                        <h2>My Profile</h2>
                        <div className="container" id='employement_id'>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="d_user_new_details_mainbox">
                                        <div className="d_user_profile_heading">
                                            <div className="row">
                                                {/* <div className="col-lg-6">Basic Details</div> */}
                                                <div className="col-lg-12" style={{ textAlign: "right" }}>
                                                    <button className="btn btn-primary mb-3" style={{background: "#0A6C85"}} onClick={() => { setUId(userId || 0); setShowEditDialog(true); }}>
                                                    Update</button></div>
                                                {/* <img src={staticIconsBaseURL + "/images/menu.png"} className="img-fluid edit-icon" alt="Search Icon" style={{ width: "20px", paddingBottom: "5px", alignItems: "center" }} onClick={() => { setEditLeaveId(applied.id); setShowDialog(true); setisToBeEdited(false) }} /> */}
                                            </div>
                                        </div>
                                        {/* <div className="d_user_profile_heading">User/Guardian Details</div> */}
                                        <div className="d_user_profile_details_listing_box">
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Name	</div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={showEditDialog ? "rightpoup rightpoupopen" : "rightpoup"}>
                        {showEditDialog && <EditProfileDialog onClose={handledEditDialogClose} id={uId} role={"user"} />}
                    </div>
                </main>
            </div>
        </div>
    );
}