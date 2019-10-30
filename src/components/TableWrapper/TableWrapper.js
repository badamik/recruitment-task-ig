import React from 'react';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import './styles.scss';

const TableWrapper = (props) => {
    return (
        <ReactTable 
            className="react-table"
            data={props.data}
            columns={[
                {
                    Header: "Name",
                    accessor: 'name',
                    className: 'table-header'
                },
                {
                    Header: "Profit & Loss",
                    accessor: 'profitLoss',
                    sortMethod: (a, b) => {
                        a = parseFloat(a.substr(1));
                        b = parseFloat(b.substr(1));
                        if(a>b) {
                            return 1;
                        } else {
                            return -1;
                        };
                    }
                },
                {
                    Header: "Account Type",
                    accessor: 'accountType'
                }
            ]}
            minRows={0}/>
    )
}

export default TableWrapper;