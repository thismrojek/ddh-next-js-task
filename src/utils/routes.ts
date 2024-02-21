const ROUTES = {
  people: {
    root: "/people",
    details: (id: number) => `/people/${id}`,
  },
};

export default ROUTES;