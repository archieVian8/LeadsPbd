import express from "express";
import { signUpUser, signInUser, viewProfileById } from "../controller/userController.js";
import { signUpEventOrganizer, signInEventOrganizer, viewProfileEventOrganizerById } from "../controller/eventOrganizerController.js";
import { createCompetition, viewAllCompetitions, viewCompetitionsByJenjang, viewCompetitionsByTingkat, viewCompetitionsByTingkatJenjang, joinCompetition, viewCompetitionApplicants, viewCompetitionById } from "../controller/competitionController.js";
import { createAcademicEvent, viewAllAcademicEvents, viewAcademicEventsByJenjang, viewAcademicEventsByHeld, viewAcademicEventsByJenjangHeld, joinAcademicEvents, viewAcademicEventsApplicants, viewAcademicEventsById } from "../controller/academicEventsController.js";
import { chooseCompetitionWinnersRanked, viewCompetitionWinners } from "../controller/winnersController.js";
import { viewUserAchievement } from "../controller/userAchievementController.js";

const router = express.Router();
router.post('/signUpUser',signUpUser);
router.post('/signInUser', signInUser);
router.post('/viewProfileById', viewProfileById);

router.post('/signUpEventOrganizer', signUpEventOrganizer);
router.post('/signInEventOrganizer', signInEventOrganizer);
router.post('/viewProfileEventOrganizerById', viewProfileEventOrganizerById);

router.post('/createCompetition', createCompetition);
router.get('/viewAllCompetitions', viewAllCompetitions);
router.get('/viewCompetitionsByJenjang/:jenjang', viewCompetitionsByJenjang);
router.get('/viewCompetitionsByTingkat/:tingkat', viewCompetitionsByTingkat);
router.get('/viewCompetitionsByTingkatJenjang/:tingkat/:jenjang', viewCompetitionsByTingkatJenjang);
router.post('/joinCompetition', joinCompetition);
router.post('/viewCompetitionApplicants', viewCompetitionApplicants);
router.post('/viewCompetitionById', viewCompetitionById);

router.post('/createAcademicEvent', createAcademicEvent);
router.get('/viewAllAcademicEvents', viewAllAcademicEvents);
router.get('/viewAcademicEventsByJenjang/:jenjang', viewAcademicEventsByJenjang);
router.get('/viewAcademicEventsByHeld/:eventsHeld', viewAcademicEventsByHeld);
router.get('/viewAcademicEventsByJenjangHeld/:jenjang/:eventsHeld', viewAcademicEventsByJenjangHeld);
router.post('/joinAcademicEvents', joinAcademicEvents);
router.post('/viewAcademicEventsApplicants', viewAcademicEventsApplicants);
router.post('/viewAcademicEventsById', viewAcademicEventsById);

router.post('/chooseCompetitionWinnersRanked', chooseCompetitionWinnersRanked);
router.post('/viewCompetitionWinners', viewCompetitionWinners);

router.post('/viewUserAchievement', viewUserAchievement);

export default router; 
