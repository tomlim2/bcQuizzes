import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/layout";
import Main from "../pages/main";
import Quiz from "../pages/quiz";
import QuizFinish from "../pages/quizFinish";

const pageMap = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "quiz/:quizId",
        element: <Quiz />,
      },
      {
        path: "quiz/finish",
        element: <QuizFinish />,
      },
    ],
  },
]);

export default function routerRoot() {
  return <RouterProvider router={pageMap} />;
}
