export default function DataTable({ columns, data, keyField = "id" }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-100">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-3 py-2 font-medium text-gray-600"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-6 text-center text-gray-400"
              >
                No records yet.
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr key={row[keyField]} className="border-t border-slate-100">
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-2">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
