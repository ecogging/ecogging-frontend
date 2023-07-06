import MainHome from "./MainHome";
import MainAccompany from "./MainAccompany";
import MainEvents from "./MainEvents";
import MainForums from "./MainForums";
import Bar from "./Bar";

export default function Home() {
    return(
        <div className="home">
            <MainHome />
            <Bar />
            <MainAccompany />
            <Bar />
            <MainEvents />
            <Bar />
            <MainForums />
        </div>
    );
}