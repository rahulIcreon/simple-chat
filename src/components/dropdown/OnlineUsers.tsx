import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

interface UserList {
  name: string;
  id: string;
  isOnline: boolean;
}

const OnlineUsers = () => {
  return (
    <div className="onlineUsersWrapper">
      <FormControl fullWidth>
        <InputLabel id="onlineUsers">Online Users</InputLabel>
        <Select
          variant="filled"
          color="primary"
          labelId="onlineUsers"
          id="selectedUser"
          // value={uid}
          label="Users"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Rahul</MenuItem>
          <MenuItem value={20}>Kiran</MenuItem>
          <MenuItem value={30}>Rony</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default OnlineUsers;
