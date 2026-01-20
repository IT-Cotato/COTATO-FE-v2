import {RESULT_PARTS} from '@/constants/admin/admin-result';
import {ResultSummaryData} from '@/schemas/admin/admin-result.type';

interface ResultTableProps {
  data: ResultSummaryData[];
}

export const ResultTable = ({data}: ResultTableProps) => {
  return (
    <div className='overflow-x-auto border border-neutral-100'>
      <table className='w-full table-fixed bg-white'>
        <colgroup>
          <col style={{width: '25%'}} />
          {RESULT_PARTS.map((part) => (
            <col
              key={part.value}
              style={{width: `${75 / RESULT_PARTS.length}%`}}
            />
          ))}
        </colgroup>
        <thead>
          <tr className='bg-neutral-300 text-body-l font-semibold text-white'>
            <th className='px-6 py-4.25 text-left whitespace-nowrap'>
              합격 여부
            </th>
            {RESULT_PARTS.map((part) => (
              <th key={part.value} className='text-left whitespace-nowrap'>
                {part.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-neutral-100'>
          {data.map((row, index) => (
            <tr key={index}>
              <td className='px-6 py-4.25 text-body-l font-semibold whitespace-nowrap text-neutral-800'>
                {row.status}
              </td>
              {RESULT_PARTS.map((part) => (
                <td
                  key={part.value}
                  className='text-left text-body-l text-neutral-600'>
                  {row[part.value] ?? 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
