import React from 'react'
import {Link} from "react-router-dom";

const News = ({data, index, handleClickNews}) => {

    const {title, description, urlToImage} = data

    const onClickNews = () => {
        handleClickNews(index)
    }
    return (
        <Link to={`/id/${index}`}>
            <div onClick={onClickNews} className="news-block">
                <div className="img-block">
                    <img className={'img'} src={urlToImage} alt="img"/>
                </div>
                <div className="description-block">
                    <h3 className="title">{title}</h3>
                    <p className="description">{description}</p>
                </div>
            </div>
        </Link>



)
}

export default News