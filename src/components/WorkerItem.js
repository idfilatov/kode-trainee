import React from 'react'

function WorkerItem(props) {
    return (
        <li className='worker-list-item'>
            {(props.sortType === 'birthdate' && props.worker.firstNexYear) ? <div>-----{new Date().getFullYear() + 1}----</div> : null}
            <br />
            <div className='worker-avatar'>
                <img src="https://api.lorem.space/image/face?w=120&h=120" alt='' />
            </div>
            <div className='worker-details'>
                {`${props.worker.firstName} ${props.worker.lastName} (${props.worker.userTag})`}
                <br />
                {`${props.worker.position}`}
                <br />
                {props.sortType === 'birthdate' ? props.worker.birthday : null}
            </div>
        </li>
    )
}

export default WorkerItem