import React from "react";

import { filters } from './../utils'

function FiltersPanel(props) {
    return (
        <div className='header-filters-panel'>
            <div className='header-filter-tabs'>
                <div className='header-filter-tabs-holder'>
                    {filters.map((f) => <button
                        className={props.filter === f.filterName ? 'header-filter-button-active' : 'header-filter-button'}
                        key={f.filterName}
                        onClick={() => props.updateFilter(f.filterName)}>
                        <div className={props.filter === f.filterName ? 'header-filter-button-text-active' : 'header-filter-button-text'}>
                            {f.filterPlaceholder}
                        </div>

                    </button>)}
                </div>
            </div>
            <hr />
        </div>
    )
}

export default FiltersPanel