import styles from "./profil.module.css";
import { useUser } from "@supabase/auth-helpers-react";
import { userCacheKey, editUser, getUserById } from "../../api-routes/user";
import Button from "@components/button";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import Heading from "@components/heading";

export default function Profil() {
  const user = useUser();
  const activeUserId = user?.id;

  const {
    data: { data: userData = {} } = {},
    error,
    isLoading,
  } = useSWR(activeUserId ? userCacheKey : null, () =>
    getUserById(null, { arg: activeUserId })
  );

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const { trigger: editTrigger } = useSWRMutation(userCacheKey, editUser);

  const handleOnSubmit = async () => {
    const updatedUser = {
      id: user.id,
      name: nameInput,
      email: emailInput,
    };
    const { data, error } = await editTrigger(updatedUser);

    if (!error) {
      setIsSaved(true);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Heading>Profil</Heading>
      <div>
        <h3>Profil information</h3>
        <div className={styles.profilInfo}>
          <label>E-mail:</label>
          <input
            className={styles.inputProfil}
            placeholder={userData.email}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <div className={styles.profilInfo}>
          <label>Name:</label>
          <input
            className={styles.inputProfil}
            placeholder={userData.name ? userData.name : "add name"}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={handleOnSubmit} className={styles.buttonProfil}>
          {isSaved ? "Saved!" : "Save"}
        </Button>
      </div>
    </div>
  );
}
