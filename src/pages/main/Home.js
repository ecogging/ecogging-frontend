import MainHome from "../../components/main/MainHome";
import MainAccompany from "../../components/main/MainAccompany";
import MainEvents from "../../components/main/MainEvents";
import MainForums from "../../components/main/MainForums";
import Bar from "../../components/main/Bar";

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
            <Bar />
        </div>
    );
}