'use client';

import React from 'react';
import { FiInbox, FiChevronUp, FiChevronDown, FiChevronsUpDown } from 'react-icons/fi';

/**
 * Reusable Table Component
 *
 * Props:
 * - columns      : Array<{ key, label, render?, sortable?, align?, width? }>
 *                    key       — maps to row data key
 *                    label     — column header label
 *                    render    — optional custom cell renderer: (value, row) => ReactNode
 *                    sortable  — boolean, enables sort icon on header
 *                    align     — 'left' | 'center' | 'right'  (default: 'left')
 *                    width     — e.g. 'w-32', 'w-48' (optional Tailwind class)
 * - rows         : Array<object>  — data rows; each object must have a unique `id`
 * - isLoading    : boolean         — shows skeleton loader
 * - emptyMessage : string          — message when rows is empty  (default: 'No data found')
 * - sortKey      : string          — currently sorted column key
 * - sortOrder    : 'asc' | 'desc' — current sort order
 * - onSort       : (key) => void   — called when a sortable column header is clicked
 * - className    : string          — extra classes on the wrapper div
 * - striped      : boolean         — alternating row background  (default: true)
 * - hoverable    : boolean         — row hover highlight  (default: true)
 * - caption      : string          — optional accessible caption for the table
 */

const ALIGN_MAP = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// ------- Skeleton loader row -------
const SkeletonRow = ({ columns }) => (
  <tr className="animate-pulse">
    {columns.map((col) => (
      <td key={col.key} className="px-5 py-3.5">
        <div className="h-4 bg-slate-200 rounded-md w-3/4" />
      </td>
    ))}
  </tr>
);

// ------- Sort icon -------
const SortIcon = ({ colKey, sortKey, sortOrder }) => {
  if (colKey !== sortKey) {
    return <FiChevronsUpDown className="w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0" />;
  }
  return sortOrder === 'asc'
    ? <FiChevronUp className="w-3.5 h-3.5 text-indigo-600 ml-1.5 shrink-0" />
    : <FiChevronDown className="w-3.5 h-3.5 text-indigo-600 ml-1.5 shrink-0" />;
};

// ------- Main Table -------
const Table = ({
  columns = [],
  rows = [],
  isLoading = false,
  emptyMessage = 'No data found',
  sortKey,
  sortOrder = 'asc',
  onSort,
  className = '',
  striped = true,
  hoverable = true,
  caption,
}) => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-700" role="table">
          {caption && (
            <caption className="sr-only">{caption}</caption>
          )}

          {/* ---- Head ---- */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={[
                    'px-5 py-3.5 text-xs font-bold tracking-wide uppercase text-slate-500 select-none',
                    ALIGN_MAP[col.align] ?? 'text-left',
                    col.width ?? '',
                    col.sortable && onSort
                      ? 'cursor-pointer hover:text-slate-800 hover:bg-slate-100 transition-colors duration-150'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => col.sortable && onSort && onSort(col.key)}
                  aria-sort={
                    sortKey === col.key
                      ? sortOrder === 'asc' ? 'ascending' : 'descending'
                      : undefined
                  }
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    {col.sortable && onSort && (
                      <SortIcon colKey={col.key} sortKey={sortKey} sortOrder={sortOrder} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* ---- Body ---- */}
          <tbody className="divide-y divide-slate-100">
            {/* Loading skeleton */}
            {isLoading &&
              skeletonRows.map((_, i) => (
                <SkeletonRow key={i} columns={columns} />
              ))}

            {/* Empty state */}
            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <FiInbox className="w-10 h-10" />
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!isLoading &&
              rows.map((row, rowIdx) => (
                <tr
                  key={row.id ?? rowIdx}
                  className={[
                    'transition-colors duration-100',
                    striped && rowIdx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white',
                    hoverable ? 'hover:bg-indigo-50/40' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={[
                        'px-5 py-3.5 whitespace-nowrap',
                        ALIGN_MAP[col.align] ?? 'text-left',
                      ].join(' ')}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
