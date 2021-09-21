import React from 'react';
import TableChartIcon from '@material-ui/icons/TableChart';
import ListIcon from '@material-ui/icons/List';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TableView from './TableView';
import ListView from './ListView';

const Content = () => {

    const [view, setView] = React.useState('table');

    const handleView = (event, newView) => {
        setView(newView);
    };

    return (
        <div style={{ marginTop: '2%' }}>

            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={handleView}
                aria-label="view mode"
            >
                <ToggleButton value="table" aria-label="table mode" >
                    <TableChartIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list mode">
                    <ListIcon />
                </ToggleButton>

            </ToggleButtonGroup>

            {
                view === 'table' ? <TableView /> : <ListView />
            }

            




        </div>
    )

}


export default Content