import React from 'react'

function Modal(props) {
    console.log('comparator keys: ', Object.keys(props.comparators));
    return (
        <div>
            Выберите тип сортировки:
            {/* {Object.keys(props.comparators).map((c) => <p key={c}>{props.comparators[c]['description']}</p>)} */}
            {Object.keys(props.comparators).map((c) =>
                <div key={c}>
                    <input
                        type="radio"
                        id={c}
                        value={c}
                        checked={c === props.sortType}
                        onChange={(c) => props.onChangeHandler(c)}
                    />
                    <label htmlFor={c}>{props.comparators[c]['description']}</label><br></br>
                </div>
            )}

        </div>
    )
}

export default Modal