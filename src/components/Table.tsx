import * as React from 'react';

import './Table.css';

type AcceptedCells = JSX.Element | string | number;

interface OwnProps {
    className?: string;
    colums: AcceptedCells[];
    rows: AcceptedCells[][];
    footerCells: AcceptedCells[];
}

const TableComponent: React.SFC<OwnProps> = ({ className, colums, rows, footerCells }) => (
    <table className={`${className} table`}>
        <thead>
            <tr>
                {colums.map((cell, i) => <th key={i}>{cell}</th>)}
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

        <tfoot>
            <tr>
                {footerCells.map((cell, i) => <td key={i}>{cell}</td>)}
            </tr>
        </tfoot>
    </table>
);

export const Table = TableComponent;
