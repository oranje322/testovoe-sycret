import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import News from "./Components/News";
import debounce from 'lodash/debounce';
import {Route, Switch, useLocation} from "react-router-dom";
import FullNews from "./Components/FullNews";


const URL = 'https://newsapi.org/v2/top-headlines?country=ru&apiKey=1bbd2d1426494ff0b0580cbf55a09bb8'


const App = () => {
    const [news, setNews] = useState([])
    const [activeNews, setActiveNews] = useState(0)
    const [backHeight, setBackHeight] = useState(0)

    const location = useLocation();

    setTimeout(() => {
        if (location.pathname === '/' && backHeight !== 0) {
            window.scrollTo(0, backHeight)
            setBackHeight(0)
        }
    }, 0)


    useEffect(() => {
            if (news.length === 0) {
                axios.get(URL).then(response => setNews(response.data.articles))
            }

            const updateNews = () => {
                let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

                if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
                    axios.get(URL).then(response => setNews(prev => [
                        ...prev,
                        ...response.data.articles
                    ]))
                }
            }
            window.addEventListener("scroll", debounce(updateNews, 3000));
            return () => {
                window.removeEventListener("scroll", debounce(updateNews, 3000));
            };
        }, []
    )

    const handleClickNews = (id) => {
        setActiveNews(id)
        setBackHeight(-document.documentElement.getBoundingClientRect().top)
        console.log(document.documentElement.getBoundingClientRect())
    }

    return (
        <div className={'wrapper'}>
            <Switch>
                <Route path={`/id/${activeNews}`}>
                    <FullNews data={news[activeNews]}
                              setBackHeight={setBackHeight}/>
                </Route>
                <Route exact path={'/'}>
                    {
                        news.map((news, index) => <News index={index}
                                                        key={`news${index}`}
                                                        data={news}
                                                        handleClickNews={handleClickNews}
                        />)
                    }
                </Route>
            </Switch>
        </div>

    );
}

export default App;
