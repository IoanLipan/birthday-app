import { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const Birthday = () => {
  const [date, setDate] = useState("");
  const [birthdays, setBirthdays] = useState([]);

  const handleAddBirthday = async () => {
    try {
      await addDoc(collection(firestore, "birthdays"), {
        date,
        userId: auth.currentUser.uid,
      });
      setDate("");
      fetchBirthdays();
    } catch (error) {
      console.error("Error adding birthday:", error);
    }
  };

  const fetchBirthdays = async () => {
    const q = query(
      collection(firestore, "birthdays"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const birthdaysList = querySnapshot.docs.map((doc) => doc.data());
    setBirthdays(birthdaysList);
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchBirthdays();
    }
  }, [auth.currentUser]);

  return (
    <div>
      <h1>Birthdays</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleAddBirthday}>Add Birthday</button>
      <ul>
        {birthdays.map((birthday, index) => (
          <li key={index}>{birthday.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Birthday;
