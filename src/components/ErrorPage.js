import React from 'react'

function ErrorPage(props) {
    return (
        <div className='no-results-holder'>
            <div className='no-results-lupa-holder'>
                <img className='no-results-lupa-img' src="nlo.jpg" alt='lupa'></img>
            </div>
            <div className='no-results-text'>
                <div className='no-results-text-upper'>Какой-то сверхразум все сломал</div>
                <div className='no-results-text-lower'>Постараемся быстро починить</div>
                <div className='no-results-text-lowerest'>
                    <button className='retry-button' onClick={() => window.location.reload()}>Попробовать снова</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage