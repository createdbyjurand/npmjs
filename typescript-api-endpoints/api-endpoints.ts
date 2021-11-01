export const apiEndpoints = {
  applications: (() => {
    const baseUrl = '/api/applications';

    return {
      baseUrl,
      search: (name: string) => `${baseUrl}?search=${name}`,
      details: (id: number) => `${baseUrl}/${id}`,
      contacts: (id: number) => `${baseUrl}/${id}/contacts`,
      pageWithSearch: (pageNumber: number, searchText: string) => `${baseUrl}?page=${pageNumber}&search=${searchText}`,
      page: (pageNumber: number) => `${baseUrl}?page=${pageNumber}`,

    };
  })(),

  users: (() => {
    const baseUrl = '/api/users';

    return {
      baseUrl,
      search: (name: string) => `${baseUrl}?search=${name}`,
      details: (id: number) => `${baseUrl}/${id}`,
      applications: (id: number) => `${baseUrl}/${id}/applications`,
    };
  })(),

  dicts: (() => {
    const baseUrl = '/api/dicts';

    return {
      baseUrl,
      filter: (dictName: string) => `${baseUrl}?dicts=${dictName}`,
    };
  })(),

  reports: (() => {
    const baseUrl = '/api/reports';

    return {
      baseUrl,
      generate: (name: string) => `${baseUrl}/applications/?name=${name}`,
    };
  })(),
};
