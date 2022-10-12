import React from 'react'

function NoSearchResults(props) {
    return (
        <div className='no-results-holder'>
            <div className='no-results-lupa-holder'>
                <img className='no-results-lupa-img' src="lupa.jpg" alt='lupa'></img>
            </div>
            <div className='no-results-text'>
                <div className='no-results-text-upper'>Мы никого не нашли</div>
                <div className='no-results-text-lower'>Попробуй скорректировать запрос</div>
            </div>
        </div>
    )
}

export default NoSearchResults