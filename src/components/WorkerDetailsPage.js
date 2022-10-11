import React from 'react'
import { Link } from "react-router-dom";

import { updateWorkers, departmentsToRussian, dateToHuman, getYearsOld } from './../utils'


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
                <div className='worker-details-header'>
                    <div className='worker-details-header-back'>
                        <Link to={'/'}><i class="material-icons" style={{ 'color': '#050510' }}>chevron_left</i></Link>
                    </div>
                    <div className='worker-details-header-avatar-holder'>
                        <img className='worker-details-header-avatar' src={currentWorker?.avatarUrl} alt='' />
                    </div>
                    <div className='worker-details-header-personal-info'>
                        <div className='worker-details-header-name'>
                            {`${currentWorker?.firstName ?? ''} ${currentWorker?.lastName ?? ''}`}
                        </div>
                        <div className='worker-details-header-tag'>
                            {`${currentWorker?.userTag ?? ''}`}
                        </div>
                    </div>
                    <div className='worker-details-header-department'>
                        {`${departmentsToRussian[currentWorker?.department] ?? ''}`}
                    </div>
                </div>
                <div className='worker-details-body'>
                    <div className='worker-details-line'>
                        <i class="material-symbols-outlined" style={{ 'color': '#050510' }}>star</i>
                        <div className='worker-details-info'>
                            {dateToHuman(currentWorker?.birthday ?? '', false)}
                        </div>
                    </div>
                    <hr />
                    <div className='worker-details-line'>
                        <i class="material-symbols-outlined" style={{ 'color': '#050510' }}>call</i>
                        <div className='worker-details-info'>
                            {`${currentWorker?.phone ?? ''}`}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WorkerDetailsPage