// Libraries
const express = require('express');
const router = express.Router();

// Files
const projectDb = require('./projectDb');
const actiondb = require('../action/actionDb');

router.post('/', validateProject, (req, res) => {
  projectDb.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
  req.body.project_id = req.params.id;
  actiondb
    .insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});

router.get('/', (req, res) => {
  projectDb
    .get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'could not get projects' });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.user);
});


// Broken
router.get('/:id/actions', validateProjectId, (req, res) => {
  projectDb
    .getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: 'error getting actions' });
    });
});

router.delete('/:id', validateProjectId, (req, res) => {
  projectDb
    .remove(req.params.id)
    .then(project => {
      res.status(200).json({ message: 'Project deleted' });
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  projectDb
    .update(id, changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});


// Middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;
  projectDb
    .getById(id)
    .then(project => {
      console.log('user is...', project);
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: 'ID not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
}

function validateProject(req, res, next) {
  const body = req.body;
  const name = req.body.name;
  if (!body) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  const body = req.body;
  const description = req.body.description;
  if (!body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!description) {
    res.status(400).json({ message: 'missing required description field' });
  } else {
    next();
  }
}

module.exports = router;