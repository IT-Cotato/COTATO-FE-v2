export const usePagination = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
) => {
  const getVisiblePages = () => {
    const half = Math.floor(maxVisible / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = Math.min(maxVisible, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    return Array.from({length: end - start + 1}, (_, i) => start + i);
  };

  return {
    visiblePages: getVisiblePages(),
    isPrevDisabled: currentPage <= 1,
    isNextDisabled: currentPage >= totalPages,
  };
};
