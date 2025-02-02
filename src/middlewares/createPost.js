export function createPost(req, res, next) {
  const body = req.body;
  const locals = res.locals;
  const data = {
    id: body.id,
    artist: body.artist,
    title: body.title,
    coverUrl: body.coverUrl,
    description: body.description,
  };

  locals["data"] = data;

  next();
}
