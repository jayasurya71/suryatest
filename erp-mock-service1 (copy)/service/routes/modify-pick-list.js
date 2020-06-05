const express =require('express');
const router=express.Router();

const modifypicklist_controller=require('../controller/modifypicklist_controller');

router.post('/britannia/erp_mock_service',modifypicklist_controller.britannia_modifypicklist_validate);

router.post('/marico/erp_mock_service',modifypicklist_controller.marico_modifypicklist_validate);
module.exports=router;
