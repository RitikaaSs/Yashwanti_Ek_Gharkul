"use client";
import { logout } from "@/app/pro_utils/constantFun";
import { staticIconsBaseURL } from "@/app/pro_utils/string_constants";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CandidateDataModel {
    id: number
    user_id: number
    name: string
    date_of_birth: string
    age: number
    gender: string
    blood_group: string
    status: string
}
export default function ResidentList() {
    const [listData, setlistData] = useState<CandidateDataModel[]>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState("");
    const [ageRange, setAgeRange] = useState("");
    const [gender, setGender] = useState("all");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const userId = searchParams.get("user_id");/
    const userIdParam = searchParams.get("user_id");
    const userId = userIdParam ? Number(userIdParam) : undefined;

    useEffect(() => {
        async function fetchCandidates() {
            try {
                let ageFrom, ageTo;

                if (ageRange) {
                    const [from, to] = ageRange.split("-").map(Number);
                    ageFrom = from;
                    ageTo = to;
                }

                const body = {
                    userId,
                    status: "Approved",
                    search,
                    ageFrom,
                    ageTo,
                    gender,
                    page,
                };

                const res = await fetch("/api/candidate/list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                const data = await res.json();

                if (data.status === 1) {
                    setlistData(data.data);
                    setTotalPages(data.pagination.totalPages);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchCandidates();
    }, [userId, search, ageRange, gender, page]);

    const resetFilters = () => {
        setSearch("");
        setAgeRange("");
        setGender("all");
        setPage(1);
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
                    <div className="card">
                        <h2>Resident list</h2>
                        <div className="container">
                            <div className="row ">
                                <div className="col-lg-12">
                                    <div className="row mb-4">

                                        <div className="col-lg-12" style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                                            <div className="row"  >
                                                <div className="col-lg-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search by name"
                                                        value={search}
                                                        onChange={(e) => {
                                                            setSearch(e.target.value);
                                                            setPage(1);
                                                        }}
                                                    />
                                                </div>

                                                <div className="col-lg-3">
                                                    <select
                                                        className="form-control"
                                                        value={ageRange}
                                                        onChange={(e) => {
                                                            setAgeRange(e.target.value);
                                                            setPage(1);
                                                        }}
                                                    >
                                                        <option value="">All Ages</option>
                                                        <option value="60-70">60 - 70</option>
                                                        <option value="70-80">70 - 80</option>
                                                        <option value="80-90">80 - 90</option>
                                                        <option value="90-100">90-100</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-3">
                                                    <select
                                                        className="form-control"
                                                        value={gender}
                                                        onChange={(e) => {
                                                            setGender(e.target.value);
                                                            setPage(1);
                                                        }}
                                                    >
                                                        <option value="all">All Genders</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        {/* <option value="Other">Other</option> */}
                                                    </select>
                                                </div>

                                                <div className="col-lg-2">
                                                    <button className="btn btn-secondary w-100" onClick={resetFilters}>
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-lg-12">
                                            <div className="grey_box" style={{ backgroundColor: "#fff" }} >
                                                <div className="row list_label mb-4">
                                                    <div className="col-lg-3 text-center"><div className="label">Name</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Date of birth</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Age</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Gender</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Blood type</div></div>
                                                    <div className="col-lg-1 text-center"><div className="label">Action</div></div>
                                                </div>

                                                {listData && listData.length > 0 ?
                                                    listData.map((list, index) => (
                                                        <div className="row list_listbox" style={{ alignItems: "center", cursor: "pointer" }} key={index} >
                                                            <div className="col-lg-3 text-center"><div className="label">{list.name}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{moment(list.date_of_birth).format('DD-MM-YYYY')}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.age}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.gender}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.blood_group}</div></div>
                                                            <div className="col-lg-1 text-center"><div className="label" onClick={() => {
                                                                router.push(`/admin/resident-profile?id=${list.id}`)
                                                            }}><img src={staticIconsBaseURL + "/images/admin/view_icon.png"} alt="view icon" className="img-fluid" style={{ maxHeight: "18px" }} /></div></div>
                                                        </div>))
                                                    : <>No such candidate</>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mt-4 gap-2" style={{ fontSize: "12px" }}>
                                        <button
                                            className="btn btn-outline-primary"
                                            disabled={page === 1}
                                            onClick={() => setPage(page - 1)}
                                            style={{ fontSize: "12px" }}>
                                            Previous
                                        </button>

                                        <span className="align-self-center">
                                            Page {page} of {totalPages}
                                        </span>

                                        <button
                                            className="btn btn-outline-primary"
                                            disabled={page === totalPages}
                                            onClick={() => setPage(page + 1)}
                                            style={{ fontSize: "12px" }}>
                                            Next
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}