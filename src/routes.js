import PublicHome from './components/public/HomeTemplate.vue';
import NotFound from './components/public/NotFoundTemplate.vue';
import AdminHome from './components/administrator/HomeTemplate.vue';
import AdminAddLeader from './components/administrator/AddLeaderTemplate.vue';
import AdminMaterial from './components/administrator/MaterialTemplate.vue';
import AdminEditMaterial from './components/administrator/EditMaterialTemplate.vue';
import AdminVideo from './components/administrator/VideoTemplate.vue';
import AdminCreateNews from './components/administrator/CreateNewsTemplate.vue';
import AdminCreateQuiz from './components/administrator/CreateQuizTemplate.vue';
import AdminDetailQuiz from './components/administrator/DetailQuizTemplate.vue';
import AdminMaterialList from './components/administrator/ListMaterialTemplate.vue';
import TestMap from './components/administrator/TestMapTemplate.vue';
import AdminReport from './components/administrator/ReportTemplate.vue';
import AdminReportUserList from './components/administrator/ReportUserListTemplate.vue';
import AdminReportUserActivityList from './components/administrator/ReportUserActivityListTemplate.vue';
import AdminQuizList from './components/administrator/ListQuizTemplate.vue';
import AdminForumList from './components/administrator/ListForumTemplate.vue';
import AdminNewsList from './components/administrator/ListNewsTemplate.vue';
import AdminForumDetail from './components/administrator/DetailForumTemplate.vue';
import PublicSignin from './components/public/SigninTemplate.vue';
import PublicSignup from './components/public/SignupTemplate.vue';

export default
[
  {path:'/',component: PublicHome},
  {path:'/signin',component: PublicSignin},
  {path:'/signup',component: PublicSignup},
  {path:'/notfound',component: NotFound},
  {path:'/admin/home',component: AdminHome},
  {path:'/admin/user/addleader',component: AdminAddLeader},
  {path:'/admin/material',component: AdminMaterial},
  {path:'/admin/material/edit/:MaterialID',component: AdminEditMaterial,props:true},
  {path:'/admin/material/list',component: AdminMaterialList},
  {path:'/admin/quiz/list',component: AdminQuizList},
  {path:'/admin/quiz/detail/:QuizID',component: AdminDetailQuiz,props:true},
  {path:'/admin/create/news',component: AdminCreateNews},
  {path:'/admin/create/quiz',component: AdminCreateQuiz},
  {path:'/admin/forum/list',component: AdminForumList},
  {path:'/admin/news/list',component: AdminNewsList},
  {path:'/admin/forum/detail/:ForumID',component: AdminForumDetail,props:true},
  {path:'/admin/video',component: AdminVideo},
  {path:'/admin/report',component: AdminReport},
  {path:'/admin/report/user/list',component: AdminReportUserList},
  {path:'/admin/report/user/activity/list',component: AdminReportUserActivityList},
  {path:'/test/map',component: TestMap}

]
