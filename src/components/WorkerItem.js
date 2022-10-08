import React from 'react'

function WorkerItem(props) {
    return (
        <li className='worker-list-item'>
            <br />
            <div className='worker-avatar'>
                <img src="https://api.lorem.space/image/face?w=120&h=120" alt='' />
            </div>
            <div className='worker-details'>
                {`${props.worker.firstName} ${props.worker.lastName} (${props.worker.userTag})`}
                <br />
                {`${props.worker.position}`}
            </div>
        </li>
    )
}

export default WorkerItem