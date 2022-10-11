import React from 'react'

function Modal(props) {
    console.log('comparator keys: ', Object.keys(props.comparators));
    return (
        <div className='under-modal'>
            <div className='modal'>
                <div className='modal-header'>
                    <div className='modal-header-text'>
                        <div>Сортировка</div>
                    </div>
                    <button className='header-sort' onClick={() => props.onCloseHandler()}>
                        <i class="material-icons" >close</i>
                    </button>
                </div>
                <div className='modal-switcher'>
                    {/* {Object.keys(props.comparators).map((c) => <p key={c}>{props.comparators[c]['description']}</p>)} */}
                    {Object.keys(props.comparators).map((c) =>
                        <div key={c} className='modal-switcher-item'>
                            <input
                                className='modal-switcher-item-radio'
                                type="radio"
                                id={c}
                                value={c}
                                checked={c === props.sortType}
                                onChange={(c) => props.onChangeHandler(c)}
                            />
                            <label className='modal-switcher-item-text' htmlFor={c}>{props.comparators[c]['description']}</label><br></br>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal