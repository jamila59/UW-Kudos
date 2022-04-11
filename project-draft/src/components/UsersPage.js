import React from 'react';
import _ from 'lodash';
import { CardList } from './Cards';
import { useParams } from 'react-router';
export function UsersPage(props) {

  let {email} = useParams();
  let users = props.data.users;
  let data = props.data.posts;
  let user =  _.find(users, {email: email});
  
  console.log(user);
  if(!user) return (
    <div className="container">
      <div className="main-content">
          <h1>Unfortunately this user does not exist.</h1>
          <p> 
            As a reminder, the school values: Integrity, Diversity, Excellence, Collaboration, Innovation and Respect, should be encouraged and applauded.
            Every visitor and user our website is stepping stone in making that a possibility.</p>
      </div>
  </div>
  );
  
  data = _.filter(data, {email: email});

  let page = "";
  if(data.length > 0){
    page = CardList(data);
  } else {
    page = (
      <div className="container">
        <div className="main-content">
            <p> Unfortunately this user has made no posts just yet.
              As a reminder, the school values: Integrity, Diversity, Excellence, Collaboration, Innovation and Respect, should be encouraged and applauded.
              Every user our website is stepping stone in making that a possibility.</p>
        </div>
    </div>
    );
  }
  

let name = user.username;
  return (
    <div class="container">
      <h1>All Posts by {name}</h1>
      {page}
    </div>
  );
}