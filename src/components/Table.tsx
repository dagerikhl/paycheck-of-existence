import * as React from 'react';

import { TableCell } from '../constants';

import './Table.css';

interface OwnProps {
    className?: string;
    columns?: TableCell[];
    columnClassNames?: Array<string | undefined>;
    rows: TableCell[][];
    footer?: TableCell[];
    footerClassName?: string;
}

const TableComponent: React.SFC<OwnProps> =
    ({ className, columns, columnClassNames, rows, footer, footerClassName }) => (
        <table className={`${className} table`}>
            {columns && <thead>
                <tr>
                    {columns.map((cell, i) => <th key={i}>{cell}</th>)}
                </tr>
            </thead>}

            <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) =>
                            <td key={j} className={columnClassNames && columnClassNames[j]}>{cell}</td>)}
                    </tr>
                ))}
            </tbody>

            {footer && <tfoot>
                <tr>
                    {footer.map((cell, i) => <td key={i} className={footerClassName}>{cell}</td>)}
                </tr>
            </tfoot>}
        </table>
    );

export const Table = TableComponent;
