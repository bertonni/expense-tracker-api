const tracing = async (req, res, next) => {
  console.log(`METHOD: ${req.method}, PATH: ${req.url}`);
  next();
}

export default tracing;