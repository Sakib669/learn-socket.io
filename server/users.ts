export type USER = {
  id: string;
  name: string;
  room: string;
};

let users: USER[] = [];

export const addUser = ({ id, name, room }: USER) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name && user.room === room,
  );

  if (existingUser) {
    return { error: "User already exists" };
  }

  const user = { name, id, room };

  users.push(user);

  return { user };
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUserById = (id: string) => {
  const user = users.find((user) => user.id === id);
  return user;
};

export const getRoomUsers = (room: string) => {
  const roomUsers = users.filter((user) => user.room === room);
  return roomUsers;
};
