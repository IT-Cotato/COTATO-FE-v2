import {RESULT_PARTS, STATUS_LABEL_MAP} from '@/constants/admin/admin-result';
import {ResultSummaryData} from '@/schemas/admin/admin-result.type';

interface ResultTableProps {
  data: ResultSummaryData[];
}

export const ResultTable = ({data}: ResultTableProps) => {
  const totalColumnCount = RESULT_PARTS.length + 1;
  const columnWidth = `${100 / totalColumnCount}%`;

  const ORDER: ResultSummaryData['passStatus'][] = [
    'PASS',
    'FAIL',
    'WAITLISTED',
  ];

  const processedData = ORDER.map((statusKey) => {
    const target = data.find((d) => d.passStatus === statusKey);
    return {
      statusLabel: STATUS_LABEL_MAP[statusKey],
      counts: target?.counts || {ALL: 0, PM: 0, DE: 0, FE: 0, BE: 0},
    };
  });

  return (
    <div className='overflow-x-auto'>
      <table className='w-full table-fixed bg-neutral-200 text-center'>
        <colgroup>
          <col style={{width: columnWidth}} />
          {RESULT_PARTS.map((part) => (
            <col key={part.value} style={{width: columnWidth}} />
          ))}
        </colgroup>
        <thead>
          <tr className='lg:text-body-l-sb text-body-m bg-neutral-200 font-bold'>
            <th className='px-[3.25px] py-3 whitespace-nowrap text-neutral-600 lg:px-5.5 lg:py-[11.5px]'>
              합격 여부
            </th>
            {RESULT_PARTS.map((part) => (
              <th
                key={part.value}
                className='px-[3.25px] py-3 whitespace-nowrap text-neutral-600 lg:px-5.5 lg:py-[11.5px]'>
                {part.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-neutral-50 bg-neutral-50'>
          {processedData.map((row, index) => (
            <tr key={index} className='bg-neutral-50'>
              <td className='lg:text-body-l-sb text-body-m px-1 py-[11.5px] font-bold whitespace-nowrap text-neutral-600 lg:px-5.5 lg:font-semibold'>
                {row.statusLabel}
              </td>
              {RESULT_PARTS.map((part) => (
                <td
                  key={part.value}
                  className='text-body-l-sb text-neutral-500'>
                  {row.counts[part.value] ?? 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
