const express = require("express");
const router = express.Router();
const Actions = require("../action/actionDb");

router.get("/", (req, res) => {
  Actions.get().then(actions => {
    res.status(200).json(actions);
  });
});

router.get("/:id", (req, res) => {
  const actionId = req.params.id;
  Actions.getById(actionId)
    .first()
    .then(action => {
      if (!action) {
        return res
          .status(404)
          .json({
            message: "The action with the specified ID does not exist."
          });
      } else {
        res.status(200).json(action);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Actions.update(id, changes)
    .then(update => {
        res.status(200).json(update);
      })
      .catch(err => {
        res.status(500).json({ message: 'error' });
      });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Actions.remove(id).then(response => {
        res.status(200).json({
            Deleted: "This action has been deleted from the database"
        })
    })
})


module.exports = router;
