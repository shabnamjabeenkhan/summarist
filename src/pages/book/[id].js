import SideBar from "@component/components/SideBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MicIcon from "@mui/icons-material/Mic";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import Input from "../../components/Input";
import Link from "next/link";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [posts, setPosts] = useState([]);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    setIsUserLoggedIn(!!user);
  }, []);

  async function getBookById() {
    const user = auth.currentUser;
    const bookId = router.query.id;

    if (user) {
      await setDoc(doc(db, "users", user.uid, "library", bookId), {
        bookId: bookId,
      });
      setIsBookMarked(true);
      console.log("Bookmarked");
    } else {

      console.log("User not logged in. Open modal or handle non-logged-in user case.");
    }
  }

  async function bookId() {
    try {
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    bookId();
  }, [id]);

  return (
    <div>
      <SideBar />
      <div className="input-wrapper">
        <Input />
      </div>

      <div className="flex justify-center w-[50%] ml-[320px]">
        <div className="text-wrapper">
          <div className="inner-wrapper">
            <div className="inner-book">
              <div className="inner-book-title">{posts.title}</div>
              <div className="inner-book-author">{posts.author}</div>
              <div className="inner-book-subtitle">{posts.subTitle}</div>
            </div>
          </div>

          <div className="inner-book-wrapper">
            <div className="inner-book-description-wrapper">
              <div className="inner-book-description">
                <div className="inner-book-icon">
                  <StarOutlineIcon className="star" />
                </div>
                <div className="inner-book-overall-rating">
                  {posts.averageRating}&nbsp;
                </div>
                <div className="inner-book-total-rating">
                  ({posts.totalRating}&nbsp;ratings)
                </div>
              </div>
              <div className="inner-book-description">
                <div className="inner-book-icon">
                  <AccessTimeIcon className="clock" />
                </div>
                <div className="inner-book-overall-rating">
                  {posts.totalDuration}&nbsp;
                </div>
              </div>
              <div className="inner-book-description">
                <div className="inner-book-icon">
                  <MicIcon className="clock" />
                </div>
                <div className="inner-book-overall-rating">
                  {posts.type}&nbsp;
                </div>
              </div>
              <div className="inner-book-description">
                <div className="inner-book-icon">
                  <LightbulbIcon className="clock" />
                </div>
                <div className="inner-book-overall-rating">
                  {posts.keyIdeas}&nbsp; Key ideas
                </div>
              </div>
            </div>
          </div>

          <div className="inner-book__read--btn-wrapper">
            <button className="inner-book__read--btn">
              <div className="inner-book__read--icon ">
                <ImportContactsIcon className=".inner-book__read--icon svg" />
              </div>
              <Link href={`/player/${id}`}>
                <div className="inner-book__read--text">Read</div>
              </Link>
            </button>
            <button className="inner-book__read--btn">
              <div className="inner-book__read--icon ">
                <MicIcon className=".inner-book__read--icon svg" />
              </div>
              <Link href={`/player/${id}`}>
                <div className="inner-book__read--text">Listen</div>
              </Link>
            </button>
          </div>

          <div className="inner-book__bookmark">
            <div className="inner-book__bookmark--icon">
              <TurnedInNotIcon />
            </div>
            {/* Conditional rendering for bookmark text */}
            {isUserLoggedIn ? (
              isBookMarked ? (
                <div className="inner-book__bookmark--text">Book saved!</div>
              ) : (
                <div onClick={getBookById} className="inner-book__bookmark--text">
                  Add title to My Library
                </div>
              )
            ) : (
             
              <div onClick={() => console.log("Open modal for login")}>
                Log in to save this book
              </div>
            )}
          </div>

          <div className="inner-book__secondary--title">What's it about?</div>
          <div className="inner-book__tags--wrapper">
            <div className="inner-book__tag">Communication Skills</div>
            <div className="inner-book__tag">Technology & the Future</div>
          </div>
          <div className="inner-book__book--description">
            {posts.bookDescription}
          </div>
          <h2 className="inner-book__secondary--title">About the author</h2>
          <div className="inner-book__author--description">
            {posts.authorDescription}
          </div>
        </div>
        <div className="inner-book--img-wrapper">
          <figure className="book__image--wrapper">
            <img src={posts.imageLink} className="book__image" />
          </figure>
        </div>
      </div>
    </div>
  );
}
