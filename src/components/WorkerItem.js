import React from 'react'
import { Link } from "react-router-dom";

function WorkerItem(props) {
    return (
        <Link to={`/${props.worker.id}`} className='worker-list-item'>
            {(props.sortType === 'birthdate' && props.worker.firstNexYear) ? <div>-----{new Date().getFullYear() + 1}----</div> : null}
            <br />
            <div className='worker-avatar'>
                <img src={props.worker.avatarUrl} alt='' />
            </div>
            <div className='worker-details'>
                {`${props.worker.firstName} ${props.worker.lastName} (${props.worker.userTag})`}
                <br />
                {`${props.worker.position}`}
                <br />
                {props.sortType === 'birthdate' ? props.worker.birthday : null}
            </div>
        </Link>
    )
}

export default WorkerItem