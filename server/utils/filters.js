function generateFilter(query) {
  const { status, pagination } = query;

  if (!pagination) return "";

  return (
    (status === "completed"
      ? "&filters[status][$eq]=completed"
      : status === "notCompleted"
      ? "&filters[status][$eq]=notCompleted"
      : "") +
    `&pagination[page]=${pagination.page}&pagination[pageSize]=${pagination.pageSize}`
  );
}

module.exports = {
  generateFilter,
};
