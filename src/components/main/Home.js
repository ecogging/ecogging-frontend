import MainHome from "./MainHome";
import MainMates from "./MainMates";
import MainEvents from "./MainEvents";
import MainForums from "./MainForums";
import Bar from "./Bar";

export default function Home() {
    return(
        <div className="home">
            <MainHome />
            <Bar />
            <MainMates />
            <Bar />
            <MainEvents />
            <Bar />
            <MainForums />
        </div>
    );
}