import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Shared/Loading/Loading";
import Forbidden from "../Components/Shared/Forbidden/Forbidden";

const DecoratorRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || !user || roleLoading) {
    return <Loading />;
  }
  if (role !== "decorator") {
    return <Forbidden />;
  }
  return children;
};

export default DecoratorRoute;
