const {
  handleSearchContacts,
  handleGetDmContacts,
  handleGetAllContactsForChannel,
} = require("../controllers/contacts.controller");
const Authenticated = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/search", Authenticated, handleSearchContacts);
router.get("/getdmlist", Authenticated, handleGetDmContacts);
router.get("/getallcontacts", Authenticated, handleGetAllContactsForChannel);

module.exports = router;
