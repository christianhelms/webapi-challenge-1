const db = require('../data/dbConfig');

module.exports = {
  get,
  getById,
  getProjectActions,
  insert,
  update,
  remove,
};

function get() {
  return db('projects');
}

function getById(id) {
  return db('projects')
    .where({ id })
    .first();
}

function getProjectActions(projectId) {
  return db('action as a')
    .join('project as p', 'p.id', 'a.project_id')
    .select('a.id', 'a.description', 'p.name as postedBy')
    .where('a.project_id', projectId);
}

function insert(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('projects')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('projects')
    .where('id', id)
    .del();
}
