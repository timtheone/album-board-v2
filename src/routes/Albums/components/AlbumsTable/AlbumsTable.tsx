import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function AlbumsTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Albums by user id"
          onChange={(event) => {
            navigate(`?page=0&userId=${event.target.value}`);
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    navigate(`/albums/${row.getAllCells()[0].getValue()}`);
                  }}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (searchParams.get('page') && Number(searchParams.get('page')) > 0) {
              navigate(`?page=${Number(searchParams.get('page')) - 1}`);
            }
          }}
          disabled={!searchParams.get('page') || searchParams.get('page') === '0'}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (!searchParams.get('page')) {
              navigate(`?page=1`);
            } else {
              navigate(`?page=${Number(searchParams.get('page')) + 1}`);
            }
          }}
          disabled={searchParams.get('page') === '9'}>
          Next
        </Button>
      </div>
    </div>
  );
}
