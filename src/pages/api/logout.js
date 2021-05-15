export default (req, res) => {
  res.setHeader(
    'Set-Cookie',
    ['refresh-token=; Max-Age=0; SameSite=Strict; HttpOnly; Path=/', 'access-token=; Max-Age=0; SameSite=Strict; HttpOnly; Path=/']
  );
  res.status(200).end();
};
