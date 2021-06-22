import DashboardNav from "../components/DashboardNav";
import NavConnect from "../components/Navconnect";
import { Link } from "react-router-dom";
const DashboardSeller = () => {
    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <NavConnect/>
            </div>

            <div className="container-fluid p-4">
                <DashboardNav/>
            </div>
            <div className="container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Hotels</h2>
                    </div>
                </div>
                <div className="col-md-2">
                    <Link to="/hotels/new" className="btn btn-primary">Create Hotels</Link>
                </div>
            </div>
            </div>
        </>
    );
};

export default DashboardSeller;