export const indexRoute = () => ({
  url: '/',
  pattern: '/'
});

export const team = () => ({
  url: '/team',
  pattern: '/team'
});

export const posts = () => ({
  url: '/posts',
  pattern: '/posts'
});

export const post = slug => ({
  url: `${posts().url}/${slug}`,
  pattern: `${posts().pattern}/:slug`
});

export const tags = () => ({
  url: '/tags',
  pattern: '/tags'
});

export const tag = slug => ({
  url: `${tags().url}/${slug}`,
  pattern: `${tags().pattern}/:slug`
});

export const events = () => ({
  url: '/events',
  pattern: '/events'
});

export const event = id => ({
  url: `${events().url}/${id}`,
  pattern: `${events().pattern}/:id`,
});

export const jobs = () => ({
  url: '/jobs',
  pattern: '/jobs'
});

export const job = slug => ({
  url: `${jobs().url}/${slug}`,
  pattern: `${jobs().pattern}/:slug`,
});
