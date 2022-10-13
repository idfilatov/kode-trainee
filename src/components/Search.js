import React from 'react'

function Search(props) {
    return (
        <div className='header-search-panel'>
            <div className='header-search-bar'>
                <i className="material-icons" >search</i>
                <input
                    className='header-search'
                    type='text'
                    placeholder='Введи имя, тег, почту...'
                    value={props.query}
                    onChange={(event) => props.updateQuery(event.target.value)}
                />
                {props.query !== ''
                    ? <button className='header-sort' onClick={props.clearQuery}>
                        <i className="material-icons" >close</i>
                    </button> : null
                }

                <button className='header-sort' onClick={props.toggleModal}>
                    <i className="material-icons" >sort</i>
                </button>
            </div>

        </div>
    )
}

export default Search