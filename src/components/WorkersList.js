import React from 'react'

import WorkerItem from './WorkerItem'

function WorkersList(props) {
    return (
        <div className='body'>
            <div className='workers'>
                {props.sortedWorkers.map((worker) =>
                    <WorkerItem
                        key={worker.id}
                        worker={worker}
                        sortType={props.sortType}
                    />)
                }

            </div>
        </div>
    )
}

export default WorkersList