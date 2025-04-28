import User from "@/pages/User/User";

export const userRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <User />,
  },
  //   {
  //     name: "Academic Management",
  //     children: [
  //       {
  //         name: "Create A. Semester",
  //         path: "create-academic-semester",
  //         element: <CreateAcademicSemester />,
  //       },
  //       {
  //         name: "Academic Semester",
  //         path: "academic-semester",
  //         element: <AcademicSemester />,
  //       },
  //       {
  //         name: "Create A. Faculty",
  //         path: "create-academic-faculty",
  //         element: <CreateAcademicFaculty />,
  //       },
  //       {
  //         name: "Academic Faculty",
  //         path: "academic-faculty",
  //         element: <AcademicFaculty />,
  //       },
  //       {
  //         name: "Create A. Department",
  //         path: "create-academic-department",
  //         element: <CreateAcademicDepartment />,
  //       },
  //       {
  //         name: "Academic Department",
  //         path: "academic-department",
  //         element: <AcademicDepartment />,
  //       },
  //     ],
  //   },
];
