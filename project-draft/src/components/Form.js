import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push as firebasePush } from 'firebase/database'
import { getAuth } from "firebase/auth";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

export function Form(){
    const [state, setState] = useState({
        name: "",
        msg: "",
        trait: "",
        img: "",
        search: "",
        author: "Unknown",
        email: ""
    })
    const [open, setOpen] = React.useState(false);
    const [imgArray, setArray] = useState([]);
    //control form
    
    useEffect(() => {
        let uri = "https://pixabay.com/api/?key=24714207-e34811a253451cb55be3c1340&q={searchTerm}";
        if(state.search !== undefined){
             uri = uri.replace('{searchTerm}', state.search);
        }
        fetch(uri)
            .then((res) => res.json())
            .then((data) => {
            console.log(data.hits);
            setArray(data.hits)
            
            //data only exists here! no where else
            })
            .catch((error) => {
            console.log(error);
            })
    
        }, [state])

    const db = getDatabase();

    //adds to db
    const pushPost = (e) => {
        if(state.trait === "" || state.trait === "Select a trait" || 
            state.name === "" || state.img === "" || state.msg === ""){
            e.preventDefault();
            setOpen(true);
        } else {

            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                state.author = user.displayName;
                state.email = user.email;
            } 
            const newMessageObj = {
                name: state.name,
                msg: state.msg,
                trait: state.trait,
                img: state.img,
                author: state.author,
                email: state.email,
                timestamp: Date.now(), //posted now
            }
            const postsRef = ref(db, "allPosts");
            firebasePush(postsRef, newMessageObj)
                .catch((err) => { })

        }

    }
    let imgElements = imgArray.map((img) => {
        if(state.search !== ""){ 
            return(
                <div className="card" key={img.id}>
                    <label>
                        <input type="radio" name="image"  value={img.largeImageURL} onChange={(e) => setState({ ...state, img: e.target.value })}/>
                        <img class="card-img-top" src={img.largeImageURL} alt="profile choice" />
                    </label>
                </div>
            )
        }
        return "";
    })
    
  
    const handleToClose = (reason) => {
      if ("clickaway" === reason) return;
      setOpen(false);
    };
    

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                horizontal: "left",
                vertical: "bottom",
                }}
                open={open}
                autoHideDuration={5000}
                message="Please fill out all required fields"
                onClose={handleToClose}
                action={
                <React.Fragment>
                    <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleToClose}
                    >
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
 
        <form aria-label="Add a Kudos" >
            <div id="postform" className="container mb-5">
                <label for="postform">Who Do You Want To Recognize?</label>

                <select class="form-control col-3 " onChange={(e) => setState({ ...state, trait: e.target.value })}>
                    <option>Select a trait</option>
                    <option>Integrity</option>
                    <option>Diversity</option>
                    <option>Excellence</option>
                    <option>Collaboration</option>
                    <option>Innovation</option>
                    <option>Respect</option>
                </select>

                <input type="text" className="form-control col-3" placeholder="Full Name" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />

                <input placeholder="Enter your message" value={state.msg} className="form-control form-control-lg" onChange={(e) => setState({ ...state, msg: e.target.value })} />

                <input placeholder="Search for image" value={state.search} className="form-control form-control-lg" onChange={(e) => setState({ ...state, search: e.target.value })} />

                <div className="card-columns">
                    {imgElements}
                </div>
                <div class="btn-group">
                    <button aria-label="Submit" className="btn btn-outline-warning" onClick={pushPost}>Submit</button>
                </div>
            </div>
        </form>
    </div>
    );

}