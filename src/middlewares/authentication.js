const authorize = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log(apiKey)
  if (apiKey == 'abcd-efgh-ijlk-1234') {
    // Authorized
    console.log("Authorized")
    next();
  } else {
    // Unauthorized
    res.status(403).json({ message: 'Unauthorized' });
  }
}

module.exports =  authorize