// імпорт самого реакту, та методів з нього які нам потрібні
import React, { useState, useEffect } from 'react';
// імпорт зовнішнього компоненту "Картка з розміткою картки"
import Card from './components/Card';
// імпорт стилів
import './style/main.css'

const App = () => {

    // декларація взаємозв'язків при зміні яких компонент буде оновлюватись
    // статус завантаження 
    const [loaded, isLoaded] = useState(false)
    // наповнення сторінки
    const [content, setContent] = useState([])
    
    // прокидання помилки, але насправді не думаю, що воно працюватиме 
    const [error, setError] = useState(null)

    // декларація URL змінюється кожен день, в теорії можна прописати функцію щоб редактувала рядок, але поки не на часі
    const url = 'https://newsapi.org/v2/everything?q=tesla&from=2023-01-06&sortBy=publishedAt&apiKey=f241cf7e68114acd9721a3cf9322d600'


    // функція яка робить запит на newsAPI і повертає 
    function req() {
        // Фетч отримує з URL данні переводить їх в JSON, а потім починає маніпуляцію з ними і зберігає їх в state контент
        fetch(url).then(res => res.json()).then((result) => {

            
            // змінна для того, щоб було простіше працювати з JSON файлом
            let data = result.articles

            // тут точно щось не правильно, можна було зробити без тимчасової змінної, але чогось в мене це не виходило, потім ще покручу
            let temparray = [...content]

            // витягання потрібної інформації (заголовок, автор, опис, адресса зображення), перекидання їх всі в об'єкт і закидаємо їх в тимчасовий масив

            console.log(data)
            data.map(article => (
                temparray.push({ title: article.title, author: article.author, desc: article.description, img: article.urlToImage, article: article.content })
            ))
            // Перенесення значень з тимчасового масиву, в постійну змінну яка буде провокувати ререндеринг компоненту
            setContent(temparray)
            // зміна статусу завантаження контенту на протилежний, який провокуватиме ререндеринг компоненту
            isLoaded(!loaded)
        }, (error) => {
            // прокидання помилки на всяк випадок тупо Ctrl+V
            setError(error)
            isLoaded(!loaded)
        }
        )
    }
    // метод який виконує функцію при кожній зміні залежності. Якщо залежності не вказані, то він спрацьовуватиме лише в той момент коли компонент створюється
    useEffect(req, [])
    
    // прописування який контент буде рендериться в залежності від залежностей loaded, error
    if (loaded) {
        // якщо статус завантаження true, то в такому випадку по масиву контент проходимось за допомогою методу map і до кожного елементу масиву створюємо зовнішній компонент Сard в який вже передаємо значення кожного елменту масиву
        return (<div className='App'>{content.map(article => (<Card
            title={article.title}
            body={article.desc}
            author={article.author}
            imgURL={article.img}
            article = {article.article}
        ></Card>))}</div>)
    } else if (error) {
        // прокидання помилки, поки не зтикався, тож тільки здогадуюсь як воно має працювати.
        return (<>{error}</>)
    } else {
        // прелоадер який буде працювати поки статуси негативні
        return (<><div className="lds-heart"><div></div></div></>)
    }
}
export default App;
