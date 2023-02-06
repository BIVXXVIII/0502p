import React, {useState, useEffect} from 'react';
import Card from './components/Card';

const App = () => {
    const [loaded, isLoaded] = useState(false)
    const [content, setContent] = useState([])
    const [error, setError] = useState(null)


    const url = 'https://newsapi.org/v2/everything?q=tesla&from=2023-01-06&sortBy=publishedAt&apiKey=f241cf7e68114acd9721a3cf9322d600'

    function req() {
        fetch(url).then(res => res.json()).then((result) => {
            isLoaded(!loaded)
            let data = result.articles
            let temparray = [...content]
            data.map(article => (
                temparray.push({title: article.title, author: article.author, desc: article.description})
            ))
            setContent(temparray)
        })
    }

    useEffect(req, [])
    

    if (loaded) {
        return (<>{content.map(article => (<Card title={article.title}
        body={article.desc} author={article.author}
        ></Card>))}</>)
    } else if (error) {
        return (<>{error}</>)
    } else {
        return (<>is not loaded</>)
    }
}

export default App;
