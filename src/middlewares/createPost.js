export function createPost(req, res, next) {
  const body = req.body;
  const locals = res.locals;
  const data = {
    id: body.id,
    title: body.title,
    content: body.content,
  };

  locals["data"] = data;

  next();
}
