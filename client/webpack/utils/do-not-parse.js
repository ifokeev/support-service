export default ({
  name,
  path
}) => {
  const alias = {};
  alias[name] = path;

  return {
    module: {
      noParse: [
        path
      ]
    },
    resolve: {
      alias
    }
  };
}
