const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

// All routes here start with /tasks

// Calendar Routes (Must be before :id to avoid conflict)
router.get('/calendar', requireAuth, checkUser, taskController.task_calendar_get);
router.get('/api/events', requireAuth, taskController.task_api_get);

// Standard CRUD
router.get('/', requireAuth, checkUser, taskController.task_index);
router.post('/', requireAuth, taskController.task_create_post); // Was inline POST /add
router.get('/create', requireAuth, checkUser, taskController.task_create_get); // Standardize on /create or keep /add? Keeping /add for now in controller but route can be /create
// Note: Controller has task_create_get rendering 'taskManager/add'. Let's route /add to it.
router.get('/add', requireAuth, checkUser, taskController.task_create_get);
router.post('/add', requireAuth, taskController.task_create_post);

router.get('/:id', requireAuth, checkUser, taskController.task_details);
router.delete('/:id', requireAuth, taskController.task_delete);

module.exports = router;