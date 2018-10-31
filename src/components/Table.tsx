import * as React from 'react';

import './Table.css';

type AcceptedCells = JSX.Element | string | number | undefined;

interface OwnProps {
    className?: string;
    columns: AcceptedCells[];
    columnClassNames?: Array<string | undefined>;
    rows: AcceptedCells[][];
    footerCells?: AcceptedCells[];
}

const TableComponent: React.SFC<OwnProps> = ({ className, columns, columnClassNames, rows, footerCells }) => (
    <table className={`${className} table`}>
        <thead>
            <tr>
                {columns.map((cell, i) => <th key={i}>{cell}</th>)}
            </tr>
        </thead>

        <tbody>
            {rows.map((row, i) => (
                <tr key={i}>
                    {row.map((cell, j) => <td key={j} className={columnClassNames && columnClassNames[j]}>{cell}</td>)}
                </tr>
            ))}
        </tbody>

        {footerCells && <tfoot>
            <tr>
                {footerCells.map((cell, i) =>
                    <td key={i}>{cell}</td>)}
            </tr>
        </tfoot>}
    </table>
);

export const Table = TableComponent;
