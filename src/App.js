import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Container, FormControl, Input, InputLabel } from "@mui/material";
import Message from "./components/Message";
import { db } from "./firebase";
import { collection, onSnapshot, addDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    onSnapshot(q, (snapshot) => {
      let book = [];
      snapshot.docs.forEach((doc) => {
        book.unshift({ id: doc.id, message: { ...doc.data() } });
      });
      setMessage(book);
    });
    // Stop listening to changes
  }, []);
  useEffect(() => {
    setUserName(prompt("Please enter Your name!"));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    addData();
    setInput("");
  };

  const addData = async () => {
    try {
      await addDoc(collection(db, "messages"), {
        username: userName,
        message: input,
        timestamp: serverTimestamp(),
      });
      console.log("completed");
    } catch (err) {
      alert("Error adding document: ", err.message);
      console.error("Error adding document: ", err.message);
    }
  };

  return (
    <div className="App">
      <img
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADgAOAMBEQACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAEBgMFBwL/xAA2EAABAwIEAwUGBAcAAAAAAAACAQMEAAUGERIhQWFxEyIxUaEyUoGRscEHctHSFBUWIyRCQ//EABsBAAMAAwEBAAAAAAAAAAAAAAMEBQECBgAH/8QAMREAAQQBAgMECAcAAAAAAAAAAQACAwQRITESE0EFIlHhIzJhkaGx0fAUFVJxgcHx/9oADAMBAAIRAxEAPwDca8vJRv8AjRmI4Ua2CL7o7E6XsCvL3vp1o7YHEZKr1OyzIOOY4Hh18koSr5cZhKsia8qL/qJaR+SbVq6Aq7FWrxDDWD+0ML5Z56lz886WfBhNd0jCsoV7uEQkVmY6ie6Rah+S0AtezYpaWjBKO8wJvseK2phCxOEWXi2E09gl+y1uyfJw5QbnZTohxxaj4+aZaYUhJf4hYgKG2NriHpeeHU8SeIhwTqu/w61SoVOb6Q7BUuz4ATzHbDZZ12lVfwytcxdC5Q3VluJFILlKvrojZFMDlIS10w2RTtuVOlhRNCtAwbeSmMlCkFqeaHMCVdyD9U+6V6Fx9UrmO1aYidzWDQ/PzWZX+ac+9zpJFnreLT+VFyH0RK7+rA2OBjfZ/q9G8MYGoDNfOmOALfmplwvhKVfmDkq+kaOK6RJQ1Ka8ck2251Kv3oqzuDGShyXBHpjKFv1hnWF9BlDrYJcgfBO6XLkvKtYJorTcs38EzBabKNN1BaoUq5yhjQmlccXx8hTzVeCUvZYyMcTk06wyJvE4q9xDZ4tjYis/xJOz3MydRPZQeXHx+9R8c3JxovUbklhzjjDRsocPTFi3iG6i7dqgl0LZfrST2cLspy5GJq72+z5apWcFRcMS9pCVF619FBBGQuRMyNstrevFyZhMbKa94vcFPFaBZsNrxGR3RY5y12TNtOGbewy+6MdgEQGwyUiX4JuvNa49kU9yQuaMnqhauKN/w7pB/wCUmK8PIhJKD6SGTwcFgEtOQg+ytmGLS+6yyLEdtNZZbqa8EzXdV4JReKa3KATklFzJO8AnJWTT7i9c570yQv8AcdLPLgKcETolWX1hGwNHRdJXDY2Bjei7ianHmwbXvkaIPVV2qTYiTweA0kqTF1vK3YhmNKioDhq82vmJLn6LmnwrqOz5hNWaeo0P8L57LJwuwisN4hYsECWrMRXLi8SIDhL3BDL5+Oe3HahXKT7UjeJ2GDp1ytWzgD2qknzJNwlHJmvE68XiRcOSeScqeiiZE3gYMBFbMjbBiCdYnlKKaEyS99g/ZLnyXnQLVKK03D9/HqmmuDt0RibFUvEANsuNBHjgurswJV1F5qtDpdnR1SXA5JTtdrWHKo2yok8aqRuTJgyEU+/RRyzBku2NfJB8PXKoF0BrStrc/Lru8Tp7/JPOMsPJfIIkxkkxjNWlXbWnEV6/X40Hs67+Gkw71Tv9VyNiEyN7u4WTutGy4bToEDgKokJJkqKnCuta4OGQdFF5pBwVGqVsmY5FytZVCJ65WsqnC5dx2nX322GGycdcLSACmaktDmLQwuccAKnG8AZK2HCFgSx2/J7SUx7IniTwTyFOSfXOuMuWOfJkbDZTLVkzO02GyvqUSqybFFsmyMVzWo0R5w3DQxQQXdFRN8/DLnXWUbETKjC5wGFzNqOV1tzWtJXa4DvnYI5ojKSpu123eT0y9ax+cVeLGv74+z8E7HSnaMnCF/ozEWrL+Wr17dv91G/NKf6/gfonY43jcKwgfh3c3iRZshiM3xQVVwvlsnrS0vbcLR6MEn3ffuT7H8KeLDhu3WIFWI2pvkmRPubmv6JySodq9NZPfOnh0WXyufoVcUmhr//Z"
        alt="messanger"
        style={{ marginTop: "20px" }}
      />
      <h2>Welcome 📛 : {userName}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter a message...</InputLabel>

          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            color="primary"
            variant="contained"
            size="small"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon  />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {message.map(({ message, id }) => (
          <Message key={id} username={userName} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
