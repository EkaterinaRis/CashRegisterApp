import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PropsFromSlot } from '@mui/x-date-pickers';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function ProductTable(props) {

  const data = props.data;

  interface DataInterface {
    store_id: 0,
    image: "",
    name: "",
    code: ""
    price: 0,
    limitedEdition: true,
    description: "",
    maxItems: 0,
    minItems: 0,
    numItems: 0,
    newPrice: 0,
  }

  const columns = useMemo<MRT_ColumnDef<DataInterface>[]>(
    () => [
      {
        header: 'Availablity',
        accessorFn: (originalRow) => (originalRow.numItems > 0 ? 'true' : 'false'), //must be strings
        id: 'isActive',
        filterVariant: 'checkbox',
        Cell: ({ cell }) =>
          cell.getValue() === 'true' ? 'Available' : 'Unavailable',
        size: 170,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'text', // default
        size: 200,
      },
      {
        accessorFn: (originalRow) => (originalRow.price > originalRow.newPrice ? originalRow.newPrice : originalRow.price),
        header: 'Price',
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            style: 'currency',
            currency: 'den',
          }),
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive', // default (or between)
        muiFilterSliderProps: {
          marks: true,
          max: 10000, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 2,
          valueLabelFormat: (value) =>
            value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'den',
            }),
        },
      },
      {
        accessorFn: (originalRow) => originalRow.price > originalRow.newPrice,
        header: 'Sale',
        filterVariant: 'checkbox',
        Cell: ({ cell }) => {
          const row = cell.row.original;

          const price = Number(row.price);
          const newPrice = Number(row.newPrice);

          if (price == newPrice) {
            return 'Regular price';
          }

          const discount = Math.round(((price - newPrice) / price) * 100);

          return `Sale -${discount}%`;
        },
        size: 170,
      },
      {
        accessorKey: 'code',
        header: 'Code',
        filterVariant: 'range',
        filterFn: 'between',
        size: 80,
      },
      {
        accessorKey: 'limitedEdition',
        header: 'Limited edition',
        filterVariant: 'checkbox',
        Cell: ({ cell }) =>
          cell.getValue() === 'true' ? 'Not limited' : 'Limited',
        size: 170,
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'minItems',
        header: 'Minimum items in store',
        enableColumnFilter: false
      },
      {
        accessorKey: 'maxItems',
        header: 'Maximum items in store',
        enableColumnFilter: false
      },
      {
        accessorKey: 'numItems',
        header: 'Number of items available',
        enableColumnFilter: false
      },
      {
        header: 'Status',
        accessorFn: (originalRow) => ((originalRow.numItems > originalRow.minItems) ? ((originalRow.numItems < originalRow.maxItems) ? 'In range' : 'Too many items') : 'Items needed'),
        filterVariant: "select",
        filterSelectOptions: ['In range', 'Too many items', 'Items needed']
      }
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

function MyProductTable(props) {
  return <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ProductTable data={props.data} />
    </LocalizationProvider>
  </div>
};

function BillTable(props) {

  const data = props.data;

  interface DataInterface {
    id: 0,
    store_id: 0,
    employee_id: 0,
    time: 0,
    cost: 0,
    products: {}
  }

  const navigate = useNavigate();

  const columns = useMemo<MRT_ColumnDef<DataInterface>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Bill ID',
      },
      {
        accessorKey: 'employee_id',
        header: 'Employee ID',
      },
      {
        accessorKey: 'cost',
        header: 'Cost',
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            style: 'currency',
            currency: 'den',
          }),
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive', // default (or between)
        muiFilterSliderProps: {
          marks: true,
          max: 10000, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 2,
          valueLabelFormat: (value) =>
            value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'den',
            }),
        },
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.time), //convert to date for sorting and filtering
        id: 'time',
        header: 'Time of payment',
        filterVariant: 'datetime-range',
        Cell: ({ cell }) =>
          `${cell.getValue<Date>().toLocaleDateString()} ${cell
            .getValue<Date>()
            .toLocaleTimeString()}`, // convert back to string for display
      },
      {
        header: "Product details",
        id: "products",
        Cell: ({ row }) => <Button onClick={() => navigate("/productDetail", { state: row.original })}>Get product details</Button>
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

function MyBillTable(props) {
  return <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BillTable data={props.data} />
    </LocalizationProvider>
  </div>
};

function EmployeeTable(props) {

  const data = props.data;

  interface DataInterface {
    store_id: 0,
    employee_id: 0,
    start: ""
    end: ""
  }

  const columns = useMemo<MRT_ColumnDef<DataInterface>[]>(
    () => [
      {
        accessorKey: 'employee_id',
        header: 'Employee id',
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.start), //convert to date for sorting and filtering
        id: 'start',
        header: 'Start',
        filterVariant: 'datetime-range',
        Cell: ({ cell }) =>
          `${cell.getValue<Date>().toLocaleDateString()} ${cell
            .getValue<Date>()
            .toLocaleTimeString()}`, // convert back to string for display
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.end), //convert to date for sorting and filtering
        id: 'end',
        header: 'End',
        filterVariant: 'datetime-range',
        Cell: ({ cell }) =>
          `${cell.getValue<Date>().toLocaleDateString()} ${cell
            .getValue<Date>()
            .toLocaleTimeString()}`, // convert back to string for display
      },
      {
        header: "Time spent on register",
        accessorFn: (originalRow) => {
          const startTime = originalRow.start;
          const endTime = originalRow.end;

          const startDate = new Date(startTime).getTime();
          const endDate = new Date(endTime).getTime();

          const diffMs = endDate - startDate;

          const diffSeconds = Math.floor(diffMs / 1000);
          const hours = Math.floor(diffSeconds / 3600);
          const minutes = Math.floor((diffSeconds % 3600) / 60);
          const seconds = diffSeconds % 60;
          const milliseconds = diffMs % 1000;

          return hours + "h " + minutes + "m " + seconds + "s " + milliseconds + "ms";
        },
      }
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

function MyEmployeeTable(props) {
  return <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <EmployeeTable data={props.data} />
    </LocalizationProvider>
  </div>
};


function PackageTable(props) {

  const data = props.data;

  interface DataInterface {
    id: 1,
    store_id: 5,
    product_id: 1,
    employee_id: 1,
    items: 2,
    time: "2025-07-04T07:43:40.987000Z",
    code: 0,
    name: "",
    limitedEdition: true,
    price: 0
  }

  const columns = useMemo<MRT_ColumnDef<DataInterface>[]>(
    () => [
      {
        accessorKey: 'employee_id',
        header: 'Employee ID',
      },
      {
        header: "Product ID",
        accessorKey: "product_id"
      },
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'text', // default
        size: 200,
      },
      {
        accessorKey: 'code',
        header: 'Code',
        filterVariant: 'range',
        filterFn: 'between',
        size: 80,
      },
      {
        accessorKey: 'limitedEdition',
        header: 'Limited edition',
        filterVariant: 'checkbox',
        Cell: ({ cell }) =>
          cell.getValue() === 'true' ? 'Not limited' : 'Limited',
        size: 170,
      },
      {
        header: "Number od items",
        accessorKey: "items"
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.time),
        id: 'time',
        header: 'Time',
        filterVariant: 'datetime-range',
        Cell: ({ cell }) =>
          `${cell.getValue<Date>().toLocaleDateString()} ${cell
            .getValue<Date>()
            .toLocaleTimeString()}`,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

function MyPackageTable(props) {
  return <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PackageTable data={props.data} />
    </LocalizationProvider>
  </div>
};

function RefundTable(props) {

  const data = props.data;

  interface DataInterface {
    id: 0,
    store_id: 0,
    employee_id: 0,
    time: 0,
    cost: 0,
    products: {},
    timeRefund: "",
  }

  const navigate = useNavigate();

  const columns = useMemo<MRT_ColumnDef<DataInterface>[]>(
    () => [
      {
        accessorKey: 'employee_id',
        header: 'Employee ID',
      },
      {
        accessorKey: 'cost',
        header: 'Cost',
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString('en-US', {
            style: 'currency',
            currency: 'den',
          }),
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive', // default (or between)
        muiFilterSliderProps: {
          marks: true,
          max: 10000, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 2,
          valueLabelFormat: (value) =>
            value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'den',
            }),
        },
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.time), //convert to date for sorting and filtering
        id: 'time',
        header: 'Time of payment',
        filterVariant: 'datetime-range',
        Cell: ({ cell }) =>
          `${cell.getValue<Date>().toLocaleDateString()} ${cell
            .getValue<Date>()
            .toLocaleTimeString()}`, // convert back to string for display
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.timeRefund), //convert to date for sorting and filtering
        id: 'timeRefund',
        header: 'Time of refund',
        filterVariant: 'datetime-range',
        Cell: ({ cell }) =>
          `${cell.getValue<Date>().toLocaleDateString()} ${cell
            .getValue<Date>()
            .toLocaleTimeString()}`, // convert back to string for display
      },
      {
        header: "Product details",
        id: "products",
        Cell: ({ row }) => <Button onClick={() => navigate("/productDetail", { state: row.original })}>Get product details</Button>
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

function MyRefundTable(props) {
  return <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RefundTable data={props.data} />
    </LocalizationProvider>
  </div>
};

export { MyProductTable, MyBillTable, MyEmployeeTable, MyPackageTable, MyRefundTable }
