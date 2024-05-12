import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Home3 from "./pages/home/Home3";
import Home2 from "./pages/home/Home2";
import MealPlan from "./pages/mealPlan/AddMealPlan";
import AllMealPlans from "./pages/mealPlan/AllMealPlans";
import AddWorkout from "./pages/Workout/AddWorkout";
import AllWorkout from "./pages/Workout/AllWorkout";
import ViewAllWorkout from "./pages/Workout/ViewAllWorkout";
import UpdateWorkout from "./pages/Workout/UpdateWorkout";
import MealPlanDetails  from "./pages/mealPlan/MealPlanDetails";
import UpdateMealPlanDetails  from "./pages/mealPlan/UpdateMealPlan";
import Status from "./pages/status/createStatus";
import Login from "./login";
import Profile from "./pages/profile/Profile";
import Tests from "./pages/Tests";
import StatusHome from "./pages/status/status";
import OneStatus from "./pages/status/viewSatus";
import StatusReport from "./pages/status/report";
import StatusMain from "./pages/home/Home1";
import ReadWorkout from "./pages/Workout/ReadWorkout";
import Register from "./Register";

function App() {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("user");

    if (userId) {
      fetchUserData(userId);
    }
  }, [location.search]);

  const fetchUserData = (userId) => {
    // Make an API call to fetch user data using the provided userId
    fetch(`http://localhost:8080/api/users/getuser/${userId}`)
      .then((response) => response.json())
      .then((userData) => {
        // Save the user data in local storage
        window.localStorage.setItem("user", JSON.stringify(userData));

        //console log the user data from the local storage by fetching it from the local storage
        const user = JSON.parse(window.localStorage.getItem("user"));
        console.log("User data from local storage:", user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };



  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="*" element={<Home />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
      <Route path="/" element={<Home />} />
      <Route path="/workout" element={<Home3 />} />
      <Route path="/meal" element={<Home2 />} />
      <Route path="/addworkout" element={<AddWorkout />} />
      <Route path="/allworkout" element={<AllWorkout />} />
      <Route path="/viewallworkout" element={<ViewAllWorkout />} />
      <Route path="/updateworkout/:id" element={<UpdateWorkout />} />
      <Route path="/ReadWorkout/:id" element={<ReadWorkout />} />
      <Route path="/status" element={<Status />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addmealplan" element={<MealPlan />} />
      <Route path="/allmealplans" element={<AllMealPlans />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addmealplan" element={<MealPlan />} />
      <Route path="/allmealplans" element={<AllMealPlans />} />
      <Route path="/addmealplan" element={<MealPlan />} />
      <Route path="/allmealplans" element={<AllMealPlans />} />
      <Route path="/mealplan/:id" element={<MealPlanDetails />} />
      <Route path="/mealplan/update/:id" element={<UpdateMealPlanDetails />} />
      <Route path="/status" element={<Status />} />
      <Route path="/status-home" element={<StatusHome />} />
      <Route path="/view-status/:id" element={<OneStatus/>} />
      <Route path="/status-report" element={<StatusReport/>} /> 
      <Route path="/status-main" element={<StatusMain/>} /> 
    </Routes>
  );
}

export default App;
