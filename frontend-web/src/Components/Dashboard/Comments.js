import React, { useState } from "react";
import "../../styles/comments.css";
import "../../styles/graphics.css";
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'
import {FaShare} from 'react-icons/fa';


function Comment(props) {
  return (
    <div className="commentContainer">
      <div className="imageContainer">
        <img
          className="profileImage"
          alt="profile"
          src={props.profilePicture}
        />
      </div>
      <div className="textContainer">
        <span className="commentName"> {props.userName} </span>
        <div className="commentTextContainer">{props.comment}</div>
      </div>
    </div>
  );
}

function Comments(props) {
  let tempStatus = "";
  if (props.post) {
    if (props.post.likes.length === 1) {
      tempStatus = props.post.likes[0] + " liked this.";
    } else if (props.post.likes.length > 1) {
      tempStatus =
        props.post.likes[0] +
        " and " +
        (props.post.likes.length - 1) +
        " others liked this. ";
    }

    if (props.post.shares.length !== 0) {
      tempStatus += props.post.shares.length + " people shared this.";
    }
  }

  const status = tempStatus || "alexshihh20 and 12 others liked this. 2 shared";

  // either this should be passed in by parents or this could be an api call
  const tempComments = props.post.comments || [
    {
      profile: "https://cdn.frankerfacez.com/emoticon/336471/4",
      userName: "alex shih",
      comment: `Somebody once told me the world is gonna roll me I ain't the sharpest
      tool in the shed She was looking kind of dumb with her finger and her
      thumb In the shape of an "L" on her forehead`,
    },
  ];

  const user = props.user.name || "Alex Shih";

  const userProfile =
    props.user.profilePicture ||
    "https://www.allkpop.com/upload/2020/04/content/091439/1586457559-9490h64e069pk776ou0b.jpg";

  const [input, setInput] = useState("");

  const [comments, setComments] = useState(tempComments);

  return (
    <div className="mainContainer fadeIn">
      <div className="likesContainer">{status}</div>
      <div className="likesButtonContainer">
        <UseAnimations
          animation={heart}
          size={40}
          reverse={true}
          onClick={() => {
            console.log("send API register like")
            props.post.likes.push("ashih2018")
          }
          }

        />
        <button style={{background: "transparent", borderWidth: "0"}}>
        <FaShare className={"shareIcon"}/>
        </button>
      </div>
      <div className="commentsContainer">
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
      <div className="commentsInputContainer">
        <div className="imageContainer">
          <img className="profileImage" alt="profile" src={userProfile} />
        </div>
        <input
          placeholder="write your comment"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input !== "") {
              setInput("");
              setComments([
                ...comments,
                {
                  profilePicture: userProfile,
                  userName: user,
                  comment: input,
                },
              ]);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Comments;
