import React from 'react'
import { Link } from "react-router-dom";

import { updateWorkers } from './../utils'


class WorkerDetailsPage extends React.Component {

    state = {
        workers: []
    }

    componentDidMount() {
        updateWorkers(
            'all',
            workers => this.setState(() => ({
                workers: workers
            }))
        );
    }
    render() {
        const id = this.props.location.pathname.slice(1);
        console.log('WorkerDetailsPage props: ', id);
        const { workers } = this.state;
        let currentWorker = workers.filter((w) => w.id === id);
        // currentWorker = currentWorker[0];
        console.log('currentWorker: ', currentWorker[0]);
        currentWorker = currentWorker[0];
        // console.log('kek: ', kek);

        return (
            <div>
                <Link to={'/'}>На главную</Link>
                <br />
                Worker Details Page
                <br />
                <div className='worker-avatar'>
                    <img src={currentWorker?.avatarUrl} alt='' />
                </div>
                <div className='worker-details'>
                    {`${currentWorker?.firstName ?? ''} ${currentWorker?.lastName ?? ''} (${currentWorker?.userTag ?? ''})`}
                    <br />
                    {`${currentWorker?.position ?? ''}`}

                </div>
            </div>
        )
    }
}

export default WorkerDetailsPage