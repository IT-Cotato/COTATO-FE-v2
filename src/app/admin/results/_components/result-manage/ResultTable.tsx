import {RESULT_PARTS} from '@/constants/admin/admin-result';
import {ResultSummaryData} from '@/schemas/admin/admin-result.type';

interface ResultTableProps {
  data: ResultSummaryData[];
}

export const ResultTable = ({data}: ResultTableProps) => {
  const totalColumnCount = RESULT_PARTS.length + 1;
  const columnWidth = `${100 / totalColumnCount}%`;

  return (
    <div className='overflow-x-auto'>
      <table className='w-full table-fixed bg-white text-center'>
        <colgroup>
          <col style={{width: columnWidth}} />
          {RESULT_PARTS.map((part) => (
            <col key={part.value} style={{width: columnWidth}} />
          ))}
        </colgroup>
        <thead>
          <tr className='bg-neutral-200 text-body-l font-semibold'>
            <th className='px-5.5 py-[11.5px] whitespace-nowrap text-neutral-600'>
              합격 여부
            </th>
            {RESULT_PARTS.map((part) => (
              <th
                key={part.value}
                className='whitespace-nowrap text-neutral-600'>
                {part.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-neutral-50 bg-neutral-50'>
          {data.map((row, index) => (
            <tr key={index}>
              <td className='px-5.5 py-[11.5px] text-body-l font-semibold whitespace-nowrap text-neutral-600'>
                {row.status}
              </td>
              {RESULT_PARTS.map((part) => (
                <td
                  key={part.value}
                  className='text-body-l font-semibold text-neutral-500'>
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
