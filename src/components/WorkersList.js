import React from 'react'

import WorkerItem from './WorkerItem'

function WorkersList(props) {
    return (
        <ul>
            {props.workers.map((worker) => <WorkerItem key={worker.id} worker={worker} />)}
        </ul>
    )
}

export default WorkersList