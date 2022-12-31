function paginator(args: any) {
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(args.length / itemsPerPage);

  const newArgs = Array.from(
    {
      length: numberOfPages,
    },
    (_, index) => {
      const start = index * itemsPerPage;
      return args.slice(start, start + itemsPerPage);
    }
  );
  return newArgs;
}

export default paginator;
