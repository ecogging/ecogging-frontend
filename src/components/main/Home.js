import MainHome from "./MainHome";
import MainMates from "./MainMates";
import MainEvents from "./MainEvents";
import MainForums from "./MainForums";

export default function Home() {
    return(
        <div className="home">
            <MainHome />
            <MainMates />
            <MainEvents />
            <MainForums />
        </div>
    );
}