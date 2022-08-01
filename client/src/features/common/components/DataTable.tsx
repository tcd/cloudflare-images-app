import { ReactNode } from "react"
import ReactDataTable, {
    TableProps as ReactDataTableProps,
    TableColumn as ReactDataTableColumn,
} from "react-data-table-component"
import ArrowDownward from "@mui/icons-material/ArrowDownward"

import { SpinningLoader } from "@feature/common"

// These aren't exported from "react-data-table-component", but that's where they're from
export declare type Primitive = string | number | boolean | bigint;
export declare type Selector<T> = (row: T, rowIndex?: number) => Primitive;

// =============================================================================
// Types
// =============================================================================

export type Field<T> = keyof(T) | Selector<T>

export type ColumnAlignment = "left" | "center" | "right"

export interface DataTableColumn<T> {
    field: Field<T>
    header: string
    align?: ColumnAlignment
    sortable?: boolean
    width?: number
    renderFunc?: (t: T) => ReactNode
}

interface DataTableProps<T> {
    rows: T[]
    columns: DataTableColumn<T>[]
    /**
     * @default "There are no records to display"
     */
    noDataMessage?: string
}

type TablePropsMinus<T> = Omit<
    ReactDataTableProps<T>,
    "columns" | "data"
>

export type DataTablePropsPlus<T,> = DataTableProps<T> & TablePropsMinus<T>

// =============================================================================
// Component
// =============================================================================

// const selectProps = { indeterminate: (isIndeterminate: boolean) => isIndeterminate }

export const DataTable = <T,>(props: DataTablePropsPlus<T>): JSX.Element => {
    const {
        rows,
        columns,
        noDataMessage,
        ...otherProps
    } = props
    const validColumns = convertColumns(columns)
    return (
        <div className="data-table-wrapper">
            <ReactDataTable
            // className="table table-bordered border-primary"
                highlightOnHover={true}
                // pagination
                // selectableRowsComponent={Checkbox}
                // selectableRowsComponentProps={selectProps}
                sortIcon={<ArrowDownward/>}
                // dense
                data={rows}
                columns={validColumns}
                progressComponent={<SpinningLoader />}
                noDataComponent={<DefaultNoDataComponent message={noDataMessage} />}
                {...otherProps}
            />
        </div>
    )
}

const convertColumns = <T,>(customColumns: DataTableColumn<T>[]): ReactDataTableColumn<T>[] => {
    const newColumns: ReactDataTableColumn<T>[] = []
    for (const customColumn of customColumns) {
        const newColumn: ReactDataTableColumn<T> = {}
        newColumn.sortable = customColumn.sortable ?? false
        newColumn.name = customColumn.header
        if (typeof(customColumn.field) == "string") {
            // @ts-ignore:next-line
            newColumn.selector = (row) => { return row[customColumn.field] }
        } else {
            // @ts-ignore:next-line
            newColumn.selector = customColumn.field
        }
        if (customColumn.renderFunc) {
            newColumn.cell = (row) => customColumn.renderFunc(row)
        }
        if (customColumn.width) {
            newColumn.width = customColumn.width + "px"
        }
        if (customColumn.align == "center") {
            newColumn.center = true
        } else if (customColumn.align == "right") {
            newColumn.right = true
        }
        newColumns.push(newColumn)
    }
    return newColumns
}

interface DefaultNoDataComponentProps {
    message?: string
}

const DefaultNoDataComponent = ({ message }: DefaultNoDataComponentProps): JSX.Element => {
    message ??= "There are no records to display "
    return (
        <div style={{ padding: "24px" }}>{message}</div>
    )
}
