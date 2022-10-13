import React from 'react'
import { NavLink } from "react-router-dom";

import { departmentsToRussian, dateToHuman } from './../utils'

function WorkerItem(props) {
    return (
        <NavLink to={`/${props.worker.id}`} className='workers-list-item'>
            {(props.sortType === 'birthdate' && props.worker.firstNexYear)
                ? <div className='workers-list-item-next-year'>
                    <hr className='workers-list-item-next-year-line' />
                    <span />
                    <div className='workers-list-item-next-year-date'>{new Date().getFullYear() + 1}</div>
                    <hr className='workers-list-item-next-year-line' />
                </div>
                : null}
            <div className='workers-list-item-content'>
                <div className='workers-list-item-avatar-holder'>
                    <img className='workers-list-item-avatar' src={props.worker.avatarUrl} alt='' />
                </div>
                <div className='workers-list-item-details'>
                    <div className='workers-list-item-details-personal-info'>
                        <div className='workers-list-item-details-name'>
                            {`${props.worker.firstName} ${props.worker.lastName}`}
                        </div>
                        <div className='workers-list-item-details-tag'>
                            {`${props.worker.userTag}`}
                        </div>

                    </div>
                    <div className='workers-list-item-details-department'>
                        {`${departmentsToRussian[props.worker.department]}`}
                    </div>
                </div>
                <div className='workers-list-item-details-date'>
                    {props.sortType === 'birthdate' ? dateToHuman(props.worker.birthday) : null}
                </div>
            </div>
        </NavLink>
    )
}

export default WorkerItem