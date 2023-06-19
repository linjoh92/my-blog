// profil.js
import styles from "./profil.module.css";
import { useUser } from '@supabase/auth-helpers-react'
import { 
  userCacheKey,
  editUser,
  getUserById,
} from "../../api-routes/user"; 
import Button from "@components/button";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";


export default function Profil() {
    const user = useUser();

    const { data: activeUserData, error: activeUserError } = useSWR(
      user?.id ? ['userCacheKey', user.id] : null,
      getUserById
    );
    
  const activeUser = activeUserData?.data;
  const [nameInput, setNameInput] = useState(activeUser?.name || "");
  
  const { trigger: editTrigger } = useSWRMutation(
    userCacheKey,
    editUser
  );
  
  const handleOnSubmit = async () => {
    const updatedUser = {
      id: user.id,
      name: nameInput,
    };
    const { data, error } = await editTrigger(updatedUser);

    if (error) {
        console.log(error)
    }
  };

  console.log(activeUser)

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2>Profil</h2>
        <div className={styles.profilInfo}>
          <label>E-mail:</label>
          <p>{user?.email}</p>
        </div>
        <div className={styles.profilInfo}>
          <label>Name:</label>
          <p>{activeUser?.name}</p>
          <input
            placeholder="Add name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={handleOnSubmit}>Submit</Button>
      </div>
    </div>
  );
}

