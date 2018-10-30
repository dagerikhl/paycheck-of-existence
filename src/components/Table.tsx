import * as React from 'react';

import './Table.scss';

interface OwnProps {
    colums: Array<JSX.Element | string>;
    rows: Array<Array<JSX.Element | string>>;
}

const TableComponent: React.SFC<OwnProps> = ({ colums, rows }) => (
    <table className="table">
        <thead>
            <tr>
                {colums.map((column, i) => <th key={i}>{column}</th>)}
            </tr>
        </thead>

        <tbody>
            {rows.map((row, i) => (
                <tr key={i}>
                    {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export const Table = TableComponent;
