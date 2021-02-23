import React, { useState, useEffect } from "react";
import { userInfo } from "os";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersApi } from "../../../api/admin";
import EditProfileForm from "../../../components/Admin/EditProfileForm";
import { Layout, Tabs, Card } from "antd";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const token = getAccessTokenApi();

  useEffect(() => {
    getUsersApi(token).then((response) => {
      setUsers(response.users);
    });
  }, [token]);

  return (
    <Card className="user-editprofile__card">
      <EditProfileForm />
    </Card>
  );
}
