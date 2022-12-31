async function delay<ResultType>(promise: any): Promise<ResultType> {
  return await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  }).then(() => promise);
}

export default delay;
