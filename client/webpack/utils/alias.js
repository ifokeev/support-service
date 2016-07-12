export default ({
  name,
  path
}) => {
  const alias = {};
  alias[name] = path;

  return {
    resolve: {
      alias
    }
  };
}
