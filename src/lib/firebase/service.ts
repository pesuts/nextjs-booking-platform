import bcrypt from "bcrypt";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

const USERS_COLLECTION_NAME = "users";
const USERS_COLLECTION = collection(firestore, USERS_COLLECTION_NAME);

export async function retrieveDataUsers() {
  const snapshot = await getDocs(USERS_COLLECTION);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  if (await isEmailRegistered(email)) {
    return {
      error: true,
      status: 400,
      message: "Email already registered",
    };
  }
  await addDoc(USERS_COLLECTION, {
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: "member",
  });
  return {
    error: false,
    status: 200,
    message: "Registration success",
  };
}

const isEmailRegistered = async (email: string) => {
  const qRef = where("email", "==", email);
  const q = query(USERS_COLLECTION, qRef);

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return data.length > 0;
};