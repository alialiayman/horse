import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import links from "./links.json";

export function Posts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const posts = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setData(posts);
    }

    getPosts();
  }, []);

  const addPost = async () => {
    try {
        for (const link of links) {
            const docRef = await addDoc(collection(db, "posts"), link);
            console.log("Document written with ID: ", docRef.id);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }


  return (
    <div>
        <button onClick={() => addPost()}>Clear</button>
      {data?.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
}
