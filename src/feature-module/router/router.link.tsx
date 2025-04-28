import { Route } from "react-router";
import { all_routes } from "./all_routes";
import ComingSoon from "../pages/comingSoon";
import Login from "../auth/login/login";
import Register from "../auth/register/register";
import TwoStepVerification from "../auth/twoStepVerification/twoStepVerification";
import EmailVerification from "../auth/emailVerification/emailVerification";
import ResetPassword from "../auth/resetPassword/resetPassword";
import ForgotPassword from "../auth/forgotPassword/forgotPassword";
import Error404 from "../pages/error/error-404";
import Error500 from "../pages/error/error-500";
import UnderMaintenance from "../pages/underMaintenance";
import Login2 from "../auth/login/login-2";
import Login3 from "../auth/login/login-3";
import ResetPassword2 from "../auth/resetPassword/resetPassword-2";
import ResetPassword3 from "../auth/resetPassword/resetPassword-3";
import TwoStepVerification2 from "../auth/twoStepVerification/twoStepVerification-2";
import TwoStepVerification3 from "../auth/twoStepVerification/twoStepVerification-3";
import Register2 from "../auth/register/register-2";
import Register3 from "../auth/register/register-3";
import ForgotPassword2 from "../auth/forgotPassword/forgotPassword-2";
import ForgotPassword3 from "../auth/forgotPassword/forgotPassword-3";
import ResetPasswordSuccess from "../auth/resetPasswordSuccess/resetPasswordSuccess";
import ResetPasswordSuccess2 from "../auth/resetPasswordSuccess/resetPasswordSuccess-2";
import ResetPasswordSuccess3 from "../auth/resetPasswordSuccess/resetPasswordSuccess-3";
import LockScreen from "../auth/lockScreen";
import EmailVerification2 from "../auth/emailVerification/emailVerification-2";
import EmailVerification3 from "../auth/emailVerification/emailVerification-3";
import ReadAloud from "../practice/speaking/readAloud";
import AdminDashboard from "../mainMenu/adminDashboard";
import RepeatSentence from "../practice/speaking/repeatSentence";
import DescribeImage from "../practice/speaking/describeImage";
import ReTellLecture from "../practice/speaking/reTellLecture";
import RespondSituation from "../practice/speaking/respondSituation";
import AnswerShortQuestion from "../practice/speaking/answerShortQuestipn";
import WriteEssay from "../practice/writing/writeEssay";
import WriteEmail from "../practice/writing/writeEmail";
import ReadingWritngFillBlank from "../practice/reading/readingWritingFillBlank";
import MultipleChooseAnswer from "../practice/reading/multipleChooseAnswer";
import MultipleChooseSingleAnswer from "../practice/reading/multipleChooseSingleAnswer";
import SummarizeWritinText from "../practice/writing/summarizeWritinText";
import SummarizeSpokenText from "../practice/listening/summarizeSpokenText";
import MultipleChooseAnswerListen from "../practice/listening/multipleChooseAnswer";
import FillInTheBlanks from "../practice/listening/fillIntheBlanks";
import HighlightCorrectSummary from "../practice/listening/highlightCorrectSummary";
import MultipleChooseSingleAnswerListen from "../practice/listening/multipleChooseSingleAnswerListen";
import SelectMissingWord from "../practice/listening/selectMissingWord";
import HighlightIncorrectWord from "../practice/listening/highlightIncorreectWord";
import WriteFromDictation from "../practice/listening/writefromDictation";
import ReorderParagraph from "../practice/reading/reOrderParagraph";
import FillInTheBlanksRead from "../practice/reading/fillInTheBlanksRead";
import FullMocktest from "../mockTest/pages/fullMocktest";
import MockTest from "../mockTest/pages/mockTest";
import SectionalMocktest from "../mockTest/pages/sectionalMocktest";
import MockTestResult from "../mockTest/pages/mockTestResult";
import Result from "../mockTest/pages/result";
import PendingMocktest from "../mockTest/pages/pendingMocktest";
import StudyTool from "../studyTool/StudyTool";
import ClassRecording from "../classRecording/ClassRecording";
import PredictionFile from "../predictionFile/predictionFile";
import TimeTable from "../timeTable/timeTable";
import ClassLink from "../classLink/ClassLink";
import Template from "../template/template";
import TemplateDetail from "../template/templateDetail";
import SubscriptionPlan from "../subscription/subscriptionPlan";
import Community from "../community/community";
import StudyPlan from "../studyPlan/studyPlan";
import GrammerPractice from "../grammerPractice/grammerPractice";
import Performance from "../myPerformance/performance";
import TestDnd from "../practice/reading/testDND";
import Ptetestcard from "../ptetestFormate/ptetestcard";

const routes = all_routes;

export const authRoutes = [
  { path: routes.adminDashboard, element: <AdminDashboard />, route: Route },
  { path: routes.fullMocktest, element: <FullMocktest />, route: Route },
  {
    path: routes.sectionalMocktest,
    element: <SectionalMocktest />,
    route: Route,
  },
  { path: routes.mockTestResult, element: <MockTestResult />, route: Route },
  { path: routes.pendingMocktest, element: <PendingMocktest />, route: Route },
  { path: routes.studyPlan, element: <StudyPlan />, route: Route },
  
];
export const myPracticeRoutes = [
  { path: routes.drag_drop, element: <TestDnd />, route: Route},
  { path: routes.readAloud, element: <ReadAloud />, route: Route},
  { path: routes.repeatSentence, element: <RepeatSentence />, route: Route },
  { path: routes.describeImage, element: <DescribeImage />, route: Route },
  { path: routes.reTellLecture, element: <ReTellLecture />, route: Route },
  { path: routes.respondSituation, element: <RespondSituation />, route: Route },
  
  {
    path: routes.answerShortQuestion,
    element: <AnswerShortQuestion />,
    route: Route,
  },
  {
    path: routes.summarizeWritinText,
    element: <SummarizeWritinText />,
    route: Route,
  },
  { path: routes.writeEssay, element: <WriteEssay />, route: Route },
  { path: routes.writeEmail, element: <WriteEmail />, route: Route },
  {
    path: routes.readingWritngFillBlank,
    element: <ReadingWritngFillBlank />,
    route: Route,
  },
  {
    path: routes.multipleChooseAnswer,
    element: <MultipleChooseAnswer />,
    route: Route,
  },
  {
    path: routes.multipleChooseSingleAnswer,
    element: <MultipleChooseSingleAnswer />,
    route: Route,
  },
  {
    path: routes.summarizeSpokenText,
    element: <SummarizeSpokenText />,
    route: Route,
  },
  {
    path: routes.multipleChooseAnswerListen,
    element: <MultipleChooseAnswerListen />,
    route: Route,
  },
  { path: routes.fillInTheBlanks, element: <FillInTheBlanks />, route: Route },
  {
    path: routes.fillInTheBlanksRead,
    element: <FillInTheBlanksRead />,
    route: Route,
  },
  {
    path: routes.reorderParagraph,
    element: <ReorderParagraph />,
    route: Route,
  },
  {
    path: routes.highlightCorrectSummary,
    element: <HighlightCorrectSummary />,
    route: Route,
  },
  {
    path: routes.multipleChooseSingleAnswerListen,
    element: <MultipleChooseSingleAnswerListen />,
    route: Route,
  },
  {
    path: routes.selectMissingWord,
    element: <SelectMissingWord />,
    route: Route,
  },
  {
    path: routes.highlightIncorrectWord,
    element: <HighlightIncorrectWord />,
    route: Route,
  },
  {
    path: routes.writeFromDictation,
    element: <WriteFromDictation />,
    route: Route,
  },
];

export const publicRoutes = [
  { path: routes.comingSoon, element: <ComingSoon />, route: Route },
  { path: routes.login, element: <Login />, route: Route },
  { path: routes.login2, element: <Login2 />, route: Route },
  { path: routes.login3, element: <Login3 />, route: Route },
  { path: routes.register, element: <Register />, route: Route },
  {
    path: routes.twoStepVerification,
    element: <TwoStepVerification />,
    route: Route,
  },
  {
    path: routes.twoStepVerification2,
    element: <TwoStepVerification2 />,
    route: Route,
  },
  {
    path: routes.twoStepVerification3,
    element: <TwoStepVerification3 />,
    route: Route,
  },
  {
    path: routes.emailVerification,
    element: <EmailVerification />,
    route: Route,
  },
  {
    path: routes.emailVerification2,
    element: <EmailVerification2 />,
    route: Route,
  },
  {
    path: routes.emailVerification3,
    element: <EmailVerification3 />,
    route: Route,
  },
  { path: routes.register2, element: <Register2 />, route: Route },
  { path: routes.register3, element: <Register3 />, route: Route },
  { path: routes.resetPassword, element: <ResetPassword />, route: Route },
  { path: routes.resetPassword2, element: <ResetPassword2 />, route: Route },
  { path: routes.resetPassword3, element: <ResetPassword3 />, route: Route },
  { path: routes.forgotPassword, element: <ForgotPassword />, route: Route },
  { path: routes.forgotPassword2, element: <ForgotPassword2 />, route: Route },
  { path: routes.forgotPassword3, element: <ForgotPassword3 />, route: Route },
  { path: routes.error404, element: <Error404 />, route: Route },
  { path: routes.error500, element: <Error500 />, route: Route },
  {
    path: routes.underMaintenance,
    element: <UnderMaintenance />,
    route: Route,
  },
  { path: routes.lockScreen, element: <LockScreen /> },
  { path: routes.resetPasswordSuccess, element: <ResetPasswordSuccess /> },
  { path: routes.resetPasswordSuccess2, element: <ResetPasswordSuccess2 /> },
  { path: routes.resetPasswordSuccess3, element: <ResetPasswordSuccess3 /> },
];

export const mockRoutes = [
  { path: routes.mockTest, element: <MockTest />, route: Route },
  { path: routes.result, element: <Result />, route: Route },
];
export const commonRoutes = [
  { path: routes.studyTool, element: <StudyTool />, route: Route },
  { path: routes.classRecording, element: <ClassRecording />, route: Route },
  { path: routes.predictionFile, element: <PredictionFile />, route: Route },
  { path: routes.timeTable, element: <TimeTable />, route: Route },
  { path: routes.classLink, element: <ClassLink />, route: Route },
  { path: routes.template, element: <Template />, route: Route },
  { path: routes.templateDetail, element: <TemplateDetail />, route: Route },
  {
    path: routes.subscriptionPlan,
    element: <SubscriptionPlan />,
    route: Route,
  },
  { path: routes.community, element: <Community />, route: Route },
  { path: routes.grammerPractice, element: <GrammerPractice />, route: Route },
  { path: routes.performance, element: <Performance />, route: Route },
  { path: routes.ptetestcard, element: <Ptetestcard />, route: Route },
];
