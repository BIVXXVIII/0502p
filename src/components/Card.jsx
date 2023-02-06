import React from 'react';

const Card = (props) => {
    return (
        <div>
            <hgroup>
                <h3>{props.title}</h3>
                <p>author: {props.author}</p>
            </hgroup>
            <article>{props.body}</article>
            <span style={{
                fontWeight: '600',
                cursor: 'pointer'
            }}
                onClick={() => { console.log("click") }}>read more...</span>
        </div>
    );
}

export default Card;
