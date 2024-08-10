export const getQueryParams = (queryParams) => {
  const { status, pagination } = queryParams;
  if (status === "favorites") return ``;

  return `?status=${status}&pagination[page]=${pagination.page}&pagination[pageSize]=${pagination.pageSize}`;
};
