function decode(authToken) {
  const base64Url = authToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payloadinit = Buffer.from(base64, 'base64').toString('ascii');
  return JSON.parse(payloadinit);
}

module.exports = {
  decode,
};
