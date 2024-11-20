import supabase, { supabaseUrl } from "./supabase";

export async function Login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

//load user information
export async function getUserDetails() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

//logout

export async function Logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

//register/signup

export async function SignUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

//update user profile

export async function UpdateProfile({ password, fullName, avatar }) {
  // 1) update password or fullName not those update at same time
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error1 } = await supabase.auth.updateUser(updateData);
  if (error1) {
    throw new Error(error1.message);
  }
  if (!avatar) return data;

  //2) if avatar, so upload it
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error2 } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (error2) {
    throw new Error("Could not upload avatar");
  }

  //3) if above 2 points are succesful we update user again
  const { data: updatedUser, error3 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error3) {
    throw new Error(error3.message);
  }
  return updatedUser;
}
