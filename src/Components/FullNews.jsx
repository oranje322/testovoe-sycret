import React from "react";
import {Link} from "react-router-dom";

const FullNews = ({data}) => {
    const {title, description, urlToImage} = data

    window.scrollTo(0, 0)

    return (
        <div className={'full-news-block'}>
            <div className="full-title-block">
                <h1 className="full-title">{title}</h1>
            </div>
            <div className="full-img-block">
                <img className={'full-img'} src={urlToImage} alt="img"/>
            </div>
            <div className="full-content-block">
                <p className="full-content">{description}{description}{description}</p>
            </div>
            <Link to={'/'}>
                <button className={'btn'}>Назад</button>
            </Link>
        </div>
    )
}

export default FullNews