import { CONTENT_STATUS } from "./types";

export const bySortOrder = (first, second) => first.sortOrder - second.sortOrder;

export const sortBySortOrder = (records) => [...records].sort(bySortOrder);

export const isPublished = (record) => record.status === CONTENT_STATUS.published;

export const isAdminVisible = (record) => record.status !== CONTENT_STATUS.archived;

export const listPublished = (records) => sortBySortOrder(records.filter(isPublished));

export const listAdminVisible = (records) =>
  sortBySortOrder(records.filter(isAdminVisible));

export const findById = (records, id) =>
  records.find((record) => record.id === id) || null;

export const listByIds = (records, ids) => {
  const idSet = new Set(ids);

  return sortBySortOrder(records.filter((record) => idSet.has(record.id)));
};
