import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="p-2">
            <h1>Benvenuto!</h1>
            <div>
            <Link to="/login">Vai al Login</Link></div>
            <div><Link to="/admin">Amministrazione</Link></div>
            <div><Link to="/admin/totale">Totale</Link></div>

        </div>
    );
}

export default Home;
