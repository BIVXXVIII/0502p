import React, {useState} from 'react';

const Card = (props) => {
    const [hiddenstatus, setStatus] = useState(false)
    let author = props.author
    let imgURL = props.imgURL
    let imgTag = <img className='card_img' src={imgURL} alt="news img" />

    // перевірка наявності контенту і заміна його

    const contentCheck = () => {
        if (!author) {
            author = '...'
        }
        if (!imgURL) {
            imgTag = null
        }
    }

    const showNews = () => {
        setStatus(!hiddenstatus)
    }
    contentCheck()
    if (!hiddenstatus) {
        return (
            <div className='card'>
                <hgroup>
                    <h3 className='card_title'>{props.title}</h3>
                    <p>author: {author}</p>
                </hgroup>
                {imgTag}
                <article>{props.body}</article>
                <span style={{
                    fontWeight: '600',
                    cursor: 'pointer'
                }}
                    onClick={showNews}>read more...</span>
            </div>
        );
    } else {
        return (<div className='card'>
            <hgroup>
                <h3 className='card_title'>{props.title}</h3>
                <p>author: {author}</p>
            </hgroup>
            {imgTag}
            <article>{props.body} more more more more</article>
            <span style={{
                fontWeight: '600',
                cursor: 'pointer'
            }}
                onClick={showNews}>read more...</span>
        </div>)
    }
    }

export default Card;
